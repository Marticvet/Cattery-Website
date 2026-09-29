// Shared projections keep references shallow and list payloads small.
export const imageProjection = `{_type, _key, alt, caption, crop, hotspot, asset{_ref, ...@->{url, metadata{dimensions, lqip}}}}`;
export const richTextProjection = `[]{..., _type == "contentImage" => ${imageProjection}}`;
const base = `_id, _updatedAt, "slug": slug.current`;
const active = `active != false && defined(slug.current) && !(_id in path("drafts.**"))`;
export const catSummaryProjection = `{${base}, name, sex, title, breed, color, shortDescription, "mainImage": mainImage${imageProjection}}`;
const parentProjection = `->{${base}, name, sex, title, breed, color, "mainImage": mainImage${imageProjection}, "slug": select(active != false => slug.current)}`;
export const kittenSummaryProjection = `{${base}, name, sex, color, status, "mainImage": mainImage${imageProjection}}`;
export const litterSummaryProjection = `{${base}, name, litterLetter, status, dateOfBirth, expectedDate, "coverImage": coverImage${imageProjection}, "mother": mother${parentProjection}, "father": father${parentProjection}}`;
export const exhibitionSummaryProjection = `{${base}, title, eventName, location, country, date, resultSummary, "coverImage": coverImage${imageProjection}}`;
export const galleryProjection = `{_id, category, caption, "image": image${imageProjection}}`;
export const settingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]{catteryName, siteDescription, location, contactEmail, phoneNumber, whatsappNumber, instagramUrl, facebookUrl, tiktokUrl, contactDescription, showEmail, showPhone, showWhatsApp, showInstagram, showFacebook, showTikTok, defaultTitle, defaultDescription, whatsappMessageTemplate, catteryHeading, catteryDescription, "logo": logo${imageProjection}, "defaultOpenGraphImage": defaultOpenGraphImage${imageProjection}, "maleImage": maleImage${imageProjection}, "femaleImage": femaleImage${imageProjection}}`;
export const homeQuery = `*[_type == "homepage" && _id == "homepage"][0]{heroImageCaption, featuredCatsHeading, featuredLittersHeading, galleryHeading, exhibitionHeading, heroTitle, heroSubtitle, heroDescription, primaryCTA, secondaryCTA, aboutHeading, philosophyHeading, contactCTAHeading, contactCTADescription,
 "heroImage": heroImage${imageProjection}, "secondaryHeroImage": secondaryHeroImage${imageProjection}, "aboutImage": aboutImage${imageProjection}, "philosophyImage": philosophyImage${imageProjection},
 "aboutContent": aboutContent${richTextProjection}, "philosophyContent": philosophyContent${richTextProjection},
 "featuredCats": select(count(featuredCats) > 0 => (featuredCats[]->)[${active}]${catSummaryProjection}, *[_type == "cat" && featured == true && ${active}] | order(displayOrder asc, name asc)[0...3]${catSummaryProjection}),
 "featuredLitters": select(count(featuredLitters) > 0 => (featuredLitters[]->)[${active}]${litterSummaryProjection}, *[_type == "litter" && featured == true && ${active}] | order(displayOrder asc, dateOfBirth desc)[0...2]${litterSummaryProjection}),
 "galleryPreview": (galleryPreview[]->)[defined(_id)]${galleryProjection}, "featuredExhibition": featuredExhibition->${exhibitionSummaryProjection}
}`;
export const catsQuery = `*[_type == "cat" && ${active} && (!defined($sex) || sex == $sex)] | order(displayOrder asc, name asc)${catSummaryProjection}`;
export const catQuery = `*[_type == "cat" && slug.current == $slug && ${active}][0]{...${catSummaryProjection}, dateOfBirth, emsCode, "gallery": gallery[]${imageProjection}, "fullDescription": fullDescription${richTextProjection}, "pedigree": pedigree${richTextProjection}, "healthInformation": healthInformation${richTextProjection}, "achievements": achievements${richTextProjection}, "mother": mother${parentProjection}, "father": father${parentProjection}}`;
export const littersQuery = `*[_type == "litter" && ${active}] | order(displayOrder asc, dateOfBirth desc, expectedDate desc)${litterSummaryProjection}`;
export const litterQuery = `*[_type == "litter" && slug.current == $slug && ${active}][0]{...${litterSummaryProjection}, "description": description${richTextProjection}, "gallery": gallery[]${imageProjection},
 "kittens": *[_type == "kitten" && ${active} && (litter._ref == ^._id || _id in ^.kittens[]._ref)] | order(displayOrder asc, name asc)${kittenSummaryProjection}
}`;
export const kittenQuery = `*[_type == "kitten" && slug.current == $slug && ${active}][0]{...${kittenSummaryProjection}, dateOfBirth, "description": description${richTextProjection}, "gallery": gallery[]${imageProjection}, "litter": select(litter->active != false && defined(litter->slug.current) => litter->${litterSummaryProjection})}`;
export const exhibitionsQuery = `*[_type == "exhibition" && defined(slug.current)] | order(date desc, displayOrder asc)${exhibitionSummaryProjection}`;
export const exhibitionQuery = `*[_type == "exhibition" && slug.current == $slug][0]{...${exhibitionSummaryProjection}, "description": description${richTextProjection}, "results": results${richTextProjection}, "participatingCats": (participatingCats[]->)[${active}]${catSummaryProjection}, "gallery": gallery[]${imageProjection}}`;
export const galleryQuery = `*[_type == "galleryImage" && defined(image.asset)] | order(displayOrder asc, _createdAt desc)${galleryProjection}`;
export const informationQuery = `*[_type == "informationPage" && _id == "informationPage"][0]{title, introduction, "sections": sections[]{_key, title, "content": content${richTextProjection}}}`;
export const legalQuery = `*[_type == "legalPage" && _id == $id][0]{title, readyToPublish, "content": content${richTextProjection}}`;
export const sitemapQuery = `*[_type in ["cat", "kitten", "litter", "exhibition"] && ${active}]{${base}, _type}`;
