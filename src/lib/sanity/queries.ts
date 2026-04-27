import { groq } from "next-sanity";

/* Reusable projections */
const localeStringProj = `{ en, id }`;
const seoProj = `{ title${localeStringProj}, description${localeStringProj}, image }`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title,
    tagline${localeStringProj},
    logo,
    contactEmail,
    contactPhone,
    address${localeStringProj},
    socials,
    "menu": mainMenu[]{ label${localeStringProj}, href }
  }
`;

export const homePageQuery = groq`
  *[_type == "page" && slug.current == "home"][0]{
    _id,
    title${localeStringProj},
    seo${seoProj},
    "sections": sections[]{
      _key,
      _type,
      ...
    }
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title${localeStringProj},
    seo${seoProj},
    sections
  }
`;

export const allMembersQuery = groq`
  *[_type == "member"] | order(name asc){
    _id, name, slug, logo, website, "category": category->title${localeStringProj}, summary${localeStringProj}
  }
`;

export const memberBySlugQuery = groq`
  *[_type == "member" && slug.current == $slug][0]{
    _id, name, slug, logo, website, instagram, summary${localeStringProj}, body${localeStringProj}
  }
`;

export const allNewsQuery = groq`
  *[_type == "news"] | order(publishedAt desc)[0...$limit]{
    _id, title${localeStringProj}, slug, publishedAt, excerpt${localeStringProj}, coverImage,
    "author": author->{name, photo}
  }
`;

export const newsBySlugQuery = groq`
  *[_type == "news" && slug.current == $slug][0]{
    _id, title${localeStringProj}, slug, publishedAt, excerpt${localeStringProj}, coverImage,
    body${localeStringProj}, "author": author->{name, photo, bio${localeStringProj}}, seo${seoProj}
  }
`;

export const allUpdatesQuery = groq`
  *[_type == "update"] | order(publishedAt desc){
    _id, title${localeStringProj}, slug, publishedAt, summary${localeStringProj}
  }
`;

export const allEventsQuery = groq`
  *[_type == "event"] | order(startDate desc){
    _id, title${localeStringProj}, slug, startDate, endDate, location${localeStringProj}, coverImage
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0]{
    _id, title${localeStringProj}, slug, startDate, endDate, location${localeStringProj},
    description${localeStringProj}, coverImage, sections, seo${seoProj}
  }
`;

export const allJobsQuery = groq`
  *[_type == "job" && (deadline == null || deadline >= now())] | order(postedAt desc){
    _id, title${localeStringProj}, slug, company, location${localeStringProj}, employmentType,
    deadline, summary${localeStringProj}
  }
`;

export const jobBySlugQuery = groq`
  *[_type == "job" && slug.current == $slug][0]{
    _id, title${localeStringProj}, slug, company, location${localeStringProj}, employmentType,
    deadline, summary${localeStringProj}, body${localeStringProj}, applyUrl, applyEmail
  }
`;

export const allSponsorsQuery = groq`
  *[_type == "sponsor"] | order(tier->priority asc, name asc){
    _id, name, slug, logo, website, "tier": tier->{title, level, priority}
  }
`;

export const allCommitteeQuery = groq`
  *[_type == "committeeMember"] | order(orderRank asc, name asc){
    _id, name, role${localeStringProj}, photo, bio${localeStringProj}, group
  }
`;

export const allSpeakersQuery = groq`
  *[_type == "speaker"] | order(orderRank asc, name asc){
    _id, name, title${localeStringProj}, organization, photo, bio${localeStringProj}
  }
`;
