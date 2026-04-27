import { createClient } from "next-sanity";
import { cache } from "react";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

/** Server-side write client. Only import in server contexts (route handlers, scripts). */
export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN, // server only
});

/** Cached server fetch. Wrap GROQ queries with this in RSC. */
export const sanityFetch = cache(
  async <T>({
    query,
    params = {},
    tags = [],
  }: {
    query: string;
    params?: Record<string, unknown>;
    tags?: string[];
  }): Promise<T> => {
    return sanityClient.fetch<T>(query, params, {
      next: { tags, revalidate: 60 }, // ISR 60s, plus tag-based on-demand
    });
  }
);
