/**
 * Sanity Studio mounted at /studio
 * Editors visit https://bvrma.org/studio to log in and manage content.
 *
 * This file stays a Server Component so it can re-export `metadata`
 * and `viewport` from `next-sanity/studio`. The actual <NextStudio>
 * runtime is rendered inside a Client Component wrapper.
 */
import { Studio } from "./Studio";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
    return <Studio />;
}
