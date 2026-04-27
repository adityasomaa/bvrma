import { localeString, localeText, localeBlocks } from "./locale-fields";
import { seo } from "./seo";
import { siteSettings } from "./siteSettings";
import { page } from "./page";
import { news } from "./news";
import { update } from "./update";
import { event } from "./event";
import { speaker } from "./speaker";
import { member } from "./member";
import { memberCategory } from "./memberCategory";
import { sponsor } from "./sponsor";
import { sponsorTier } from "./sponsorTier";
import { job } from "./job";
import { committeeMember } from "./committeeMember";
import { author } from "./author";

export const schemaTypes = [
  // Reusable types
  localeString,
  localeText,
  localeBlocks,
  seo,

  // Singletons
  siteSettings,

  // Editorial
  page,
  news,
  update,
  event,
  author,

  // BVC Event content
  speaker,
  sponsor,
  sponsorTier,
  committeeMember,

  // Membership
  member,
  memberCategory,

  // Jobs
  job,
];
