/** Bilingual string field used by every localized text in the schema. */
export type LocaleString = { en?: string; id?: string };
export type LocaleText = { en?: string; id?: string };
export type LocaleBlocks = { en?: unknown[]; id?: unknown[] };

export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: LocaleString;
  hotspot?: { x: number; y: number; height: number; width: number };
};

export type SeoFields = {
  title?: LocaleString;
  description?: LocaleString;
  image?: SanityImage;
};

export type SiteSettings = {
  title: string;
  tagline?: LocaleString;
  logo?: SanityImage;
  contactEmail?: string;
  contactPhone?: string;
  address?: LocaleString;
  socials?: { platform: string; url: string }[];
  menu?: { label: LocaleString; href: string }[];
};

export type Member = {
  _id: string;
  name: string;
  slug: { current: string };
  logo?: SanityImage;
  website?: string;
  category?: LocaleString;
  summary?: LocaleString;
};

export type NewsArticle = {
  _id: string;
  title: LocaleString;
  slug: { current: string };
  publishedAt: string;
  excerpt?: LocaleString;
  coverImage?: SanityImage;
  body?: LocaleBlocks;
};

export type Event = {
  _id: string;
  title: LocaleString;
  slug: { current: string };
  startDate: string;
  endDate?: string;
  location?: LocaleString;
  coverImage?: SanityImage;
};

export type Job = {
  _id: string;
  title: LocaleString;
  slug: { current: string };
  company: string;
  location?: LocaleString;
  employmentType?: "full-time" | "part-time" | "contract" | "internship";
  deadline?: string;
  summary?: LocaleString;
};

export type Sponsor = {
  _id: string;
  name: string;
  slug: { current: string };
  logo?: SanityImage;
  website?: string;
  tier?: { title: string; level: string; priority: number };
};

export type CommitteeMember = {
  _id: string;
  name: string;
  role: LocaleString;
  photo?: SanityImage;
  bio?: LocaleString;
  group?: "board" | "committee" | "advisor";
};

export type Speaker = {
  _id: string;
  name: string;
  title: LocaleString;
  organization?: string;
  photo?: SanityImage;
  bio?: LocaleString;
};
