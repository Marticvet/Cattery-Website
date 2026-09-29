import { contentImage, callout, richText, cta } from './objects';
import { cat } from './cat';
import { kitten } from './kitten';
import { litter } from './litter';
import { exhibition } from './exhibition';
import { galleryImage } from './galleryImage';
import { homepage } from './homepage';
import { siteSettings } from './siteSettings';
import { informationPage, legalPage } from './pages';
export const schemaTypes = [
  contentImage,
  callout,
  richText,
  cta,
  cat,
  kitten,
  litter,
  exhibition,
  galleryImage,
  homepage,
  siteSettings,
  informationPage,
  legalPage,
];
export const singletonTypes = new Set(['homepage', 'siteSettings', 'informationPage', 'legalPage']);
