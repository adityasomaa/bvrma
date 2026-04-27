/**
 * Migrate WordPress content (BVRMA) → Sanity.
 *
 * Usage:
 *   1. Set SANITY_API_WRITE_TOKEN in .env.local (Editor permission token).
 *   2. npm run migrate:wp-to-sanity -- --dry          # preview
 *   3. npm run migrate:wp-to-sanity -- --types=member,news,job,sponsor,committee,update
 *   4. npm run migrate:wp-to-sanity -- --media-only   # just images
 *
 * Source: https://bvrma.org/wp-json/wp/v2/<type>
 * CPTs in WP: our-member, news, job, our-sponsor, commitee (sic), update
 */

import "dotenv/config";
import { createClient } from "@sanity/client";

const WP_BASE = "https://bvrma.org/wp-json/wp/v2";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-10-01",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has("--dry");
const MEDIA_ONLY = args.has("--media-only");
const TYPE_ARG = process.argv.find((a) => a.startsWith("--types="));
const TYPES = TYPE_ARG
  ? TYPE_ARG.replace("--types=", "").split(",")
  : ["member", "news", "job", "sponsor", "committee", "update"];

type WPItem = {
  id: number;
  slug: string;
  title: { rendered: string };
  content?: { rendered: string };
  excerpt?: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  status: string;
  acf?: Record<string, unknown>;
};

async function wpFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${WP_BASE}/${path}`);
  if (!res.ok) throw new Error(`WP fetch failed: ${res.status} ${path}`);
  return res.json() as Promise<T>;
}

async function fetchAll(type: string): Promise<WPItem[]> {
  const all: WPItem[] = [];
  let page = 1;
  while (true) {
    const items = await wpFetch<WPItem[]>(`${type}?per_page=100&page=${page}&_embed=1`);
    if (!items.length) break;
    all.push(...items);
    if (items.length < 100) break;
    page += 1;
  }
  return all;
}

async function uploadImage(wpUrl: string): Promise<{ _type: "image"; asset: { _ref: string } } | null> {
  if (!wpUrl) return null;
  try {
    const res = await fetch(wpUrl);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const filename = wpUrl.split("/").pop() || "image.jpg";
    if (DRY_RUN) {
      console.log(`  [dry] would upload ${filename}`);
      return null;
    }
    const asset = await sanity.assets.upload("image", buf, { filename });
    return { _type: "image", asset: { _ref: asset._id } };
  } catch (e) {
    console.warn(`  image upload failed: ${wpUrl}`, e);
    return null;
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function asLocaleString(text: string) {
  return { _type: "localeString", en: text, id: text }; // initial: same value, translate in Studio
}

function asLocaleText(text: string) {
  return { _type: "localeText", en: text, id: text };
}

const MAPPERS: Record<string, (item: WPItem) => Promise<Record<string, unknown>>> = {
  member: async (it) => {
    const wpFeatured = (it as any)._embedded?.["wp:featuredmedia"]?.[0]?.source_url as string | undefined;
    const logo = wpFeatured ? await uploadImage(wpFeatured) : null;
    return {
      _id: `member.${it.slug}`,
      _type: "member",
      name: stripHtml(it.title.rendered),
      slug: { current: it.slug, _type: "slug" },
      logo,
      summary: it.excerpt?.rendered ? asLocaleText(stripHtml(it.excerpt.rendered)) : undefined,
    };
  },

  news: async (it) => {
    const wpFeatured = (it as any)._embedded?.["wp:featuredmedia"]?.[0]?.source_url as string | undefined;
    const cover = wpFeatured ? await uploadImage(wpFeatured) : null;
    return {
      _id: `news.${it.slug}`,
      _type: "news",
      title: asLocaleString(stripHtml(it.title.rendered)),
      slug: { current: it.slug, _type: "slug" },
      excerpt: it.excerpt?.rendered ? asLocaleText(stripHtml(it.excerpt.rendered)) : undefined,
      coverImage: cover,
      publishedAt: it.date,
      // body intentionally left for editor pass — Elementor HTML is too messy to auto-import
    };
  },

  job: async (it) => ({
    _id: `job.${it.slug}`,
    _type: "job",
    title: asLocaleString(stripHtml(it.title.rendered)),
    slug: { current: it.slug, _type: "slug" },
    company: ((it.acf as any)?.company as string) || "BVRMA",
    summary: it.excerpt?.rendered ? asLocaleText(stripHtml(it.excerpt.rendered)) : undefined,
    postedAt: it.date,
  }),

  sponsor: async (it) => {
    const wpFeatured = (it as any)._embedded?.["wp:featuredmedia"]?.[0]?.source_url as string | undefined;
    const logo = wpFeatured ? await uploadImage(wpFeatured) : null;
    return {
      _id: `sponsor.${it.slug}`,
      _type: "sponsor",
      name: stripHtml(it.title.rendered),
      slug: { current: it.slug, _type: "slug" },
      logo,
      kind: "sponsor",
    };
  },

  committee: async (it) => {
    const wpFeatured = (it as any)._embedded?.["wp:featuredmedia"]?.[0]?.source_url as string | undefined;
    const photo = wpFeatured ? await uploadImage(wpFeatured) : null;
    return {
      _id: `committee.${it.slug}`,
      _type: "committeeMember",
      name: stripHtml(it.title.rendered),
      role: it.excerpt?.rendered ? asLocaleString(stripHtml(it.excerpt.rendered)) : undefined,
      photo,
      group: "committee",
    };
  },

  update: async (it) => ({
    _id: `update.${it.slug}`,
    _type: "update",
    title: asLocaleString(stripHtml(it.title.rendered)),
    slug: { current: it.slug, _type: "slug" },
    summary: it.excerpt?.rendered ? asLocaleText(stripHtml(it.excerpt.rendered)) : undefined,
    publishedAt: it.date,
  }),
};

const WP_TYPE_MAP: Record<string, string> = {
  member: "our-member",
  news: "news",
  job: "job",
  sponsor: "our-sponsor",
  committee: "commitee", // sic — typo in WP
  update: "update",
};

async function migrateType(type: string) {
  const wpType = WP_TYPE_MAP[type];
  if (!wpType) {
    console.warn(`Unknown type: ${type}`);
    return;
  }
  console.log(`\n→ Migrating ${type} (WP CPT: ${wpType})`);
  const items = await fetchAll(wpType);
  console.log(`  fetched ${items.length} items from WP`);

  for (const item of items) {
    if (item.status !== "publish") continue;
    try {
      const doc = await MAPPERS[type](item);
      console.log(`  · ${item.slug}`);
      if (!DRY_RUN) {
        await sanity.createOrReplace(doc as any);
      }
    } catch (e) {
      console.error(`  ✗ failed ${item.slug}:`, e);
    }
  }
}

(async () => {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
    process.exit(1);
  }
  console.log(`Migration ${DRY_RUN ? "(DRY RUN)" : ""} · types: ${TYPES.join(", ")}`);

  if (MEDIA_ONLY) {
    console.log("--media-only not yet implemented — please use individual type migration.");
    return;
  }

  for (const t of TYPES) {
    await migrateType(t);
  }
  console.log("\n✓ Done.");
})();
