/**
 * Sanity Studio mounted at /studio
 * Editors visit https://bvrma.org/studio to log in and manage content.
 */
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
