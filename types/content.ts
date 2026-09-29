import type { PortableTextBlock } from '@portabletext/types';

export type RichText = Array<PortableTextBlock | ContentImage | Callout>;
export interface Callout {
  _type: 'callout';
  _key: string;
  title?: string;
  text: string;
}
export interface ContentImage {
  _type?: 'contentImage';
  _key?: string;
  alt?: string;
  caption?: string;
  asset?: {
    _ref?: string;
    url?: string;
    metadata?: { dimensions?: { width: number; height: number }; lqip?: string };
  };
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; width: number; height: number };
  src?: string;
}
export interface Document {
  _id: string;
  _updatedAt?: string;
  slug: string;
}
export interface CatSummary extends Document {
  name: string;
  sex: 'male' | 'female';
  title?: string;
  breed?: string;
  color?: string;
  mainImage?: ContentImage;
  shortDescription?: string;
}
export interface Cat extends CatSummary {
  dateOfBirth?: string;
  emsCode?: string;
  gallery?: ContentImage[];
  fullDescription?: RichText;
  father?: CatSummary;
  mother?: CatSummary;
  pedigree?: RichText;
  healthInformation?: RichText;
  achievements?: RichText;
  featured?: boolean;
}
export type LitterStatus =
  'planned' | 'expected' | 'current' | 'available' | 'reserved' | 'previous';
export type KittenStatus = 'available' | 'underEvaluation' | 'reserved' | 'sold' | 'stayingWithUs';
export interface LitterSummary extends Document {
  name: string;
  litterLetter?: string;
  status: LitterStatus;
  coverImage?: ContentImage;
  dateOfBirth?: string;
  expectedDate?: string;
  mother?: CatSummary;
  father?: CatSummary;
}
export interface Litter extends LitterSummary {
  description?: RichText;
  kittens?: KittenSummary[];
  gallery?: ContentImage[];
  featured?: boolean;
}
export interface KittenSummary extends Document {
  name: string;
  sex: 'male' | 'female';
  color?: string;
  status: KittenStatus;
  mainImage?: ContentImage;
}
export interface Kitten extends KittenSummary {
  litter?: LitterSummary;
  dateOfBirth?: string;
  gallery?: ContentImage[];
  description?: RichText;
}
export interface ExhibitionSummary extends Document {
  title: string;
  eventName?: string;
  location?: string;
  country?: string;
  date?: string;
  coverImage?: ContentImage;
  resultSummary?: string;
}
export interface Exhibition extends ExhibitionSummary {
  description?: RichText;
  participatingCats?: CatSummary[];
  results?: RichText;
  gallery?: ContentImage[];
}
export type GalleryCategory = 'cats' | 'kittens' | 'exhibitions' | 'catteryLife';
export interface GalleryItem {
  _id: string;
  image: ContentImage;
  category: GalleryCategory;
  caption?: string;
}
export interface CTA {
  label?: string;
  href?: string;
}
export interface Home {
  heroImageCaption?: string;
  featuredCatsHeading?: string;
  featuredLittersHeading?: string;
  galleryHeading?: string;
  exhibitionHeading?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImage?: ContentImage;
  secondaryHeroImage?: ContentImage;
  primaryCTA?: CTA;
  secondaryCTA?: CTA;
  aboutHeading?: string;
  aboutContent?: RichText;
  aboutImage?: ContentImage;
  featuredCats?: CatSummary[];
  featuredLitters?: LitterSummary[];
  philosophyHeading?: string;
  philosophyContent?: RichText;
  philosophyImage?: ContentImage;
  galleryPreview?: GalleryItem[];
  featuredExhibition?: ExhibitionSummary;
  contactCTAHeading?: string;
  contactCTADescription?: string;
}
export interface SiteSettings {
  catteryName: string;
  logo?: ContentImage;
  siteDescription?: string;
  location?: string;
  contactEmail?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  contactDescription?: string;
  showEmail?: boolean;
  showPhone?: boolean;
  showWhatsApp?: boolean;
  showInstagram?: boolean;
  showFacebook?: boolean;
  showTikTok?: boolean;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultOpenGraphImage?: ContentImage;
  whatsappMessageTemplate?: string;
  catteryHeading?: string;
  catteryDescription?: string;
  maleImage?: ContentImage;
  femaleImage?: ContentImage;
}
export interface InformationSection {
  _key: string;
  title: string;
  content: RichText;
}
export interface InformationPage {
  title?: string;
  introduction?: string;
  sections?: InformationSection[];
}
export interface LegalPage {
  title?: string;
  content?: RichText;
  readyToPublish?: boolean;
}
