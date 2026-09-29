import type { GalleryCategory, KittenStatus, LitterStatus } from '@/types/content';
// Shared UI language lives here; document content can later gain locale fields.
export const labels = {
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/our-cattery', label: 'Our Cattery' },
    { href: '/litters', label: 'Litters' },
    { href: '/exhibitions', label: 'Exhibitions' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/information', label: 'Information' },
    { href: '/contact', label: 'Contact' },
  ],
  welcome: 'Welcome to',
  about: 'Our story',
  cats: 'Meet the family',
  litters: 'Little beginnings',
  philosophy: 'Our philosophy',
  gallery: 'Life at the cattery',
  exhibitions: 'In the show ring',
  viewProfile: 'View profile',
  discoverLitter: 'Discover litter',
  viewExhibition: 'View exhibition',
  allCats: 'Meet all our cats',
  allLitters: 'Explore our litters',
  allPhotos: 'Visit the gallery',
  male: 'Male',
  female: 'Female',
  close: 'Close',
  previous: 'Previous photograph',
  next: 'Next photograph',
  emptyCats: 'Our family is growing.',
  emptyCatsDescription: 'Meet our cats here soon. In the meantime, we would love to hear from you.',
  emptyLitters: 'We currently have no available litters.',
  emptyLittersDescription:
    'Every little beginning takes time. Get in touch to learn about our future plans.',
  emptyGallery: 'A little glimpse into our world, coming soon.',
  emptyExhibitions: 'New memories from the show ring will appear here.',
  contactEyebrow: 'A conversation starts here',
  contactTitle: 'Let’s keep in touch.',
  contactFallback: 'Our contact details will be available here soon.',
  contactCTA: 'Your next chapter, together.',
  contactCTADescription:
    'We would love to help you find your new companion. Get in touch to learn more about our cats and upcoming litters.',
  interestTitle: 'Interested in {name}?',
  interestMessage: 'Hello, I would like to ask about {name}{litter}.',
  legalPlaceholder:
    'This page is awaiting the owner’s legal information. It must be reviewed and replaced before the website is published.',
};
export const kittenStatuses: Record<KittenStatus, string> = {
  available: 'Available',
  underEvaluation: 'Under evaluation',
  reserved: 'Reserved',
  sold: 'Found a home',
  stayingWithUs: 'Staying with us',
};
export const litterStatuses: Record<LitterStatus, string> = {
  planned: 'Planned',
  expected: 'Expected',
  current: 'Current litter',
  available: 'Available',
  reserved: 'Reserved',
  previous: 'Previous litter',
};
export const galleryCategories: Record<GalleryCategory, string> = {
  cats: 'Cats',
  kittens: 'Kittens',
  exhibitions: 'Exhibitions',
  catteryLife: 'Cattery life',
};
export const litterGroups: { title: string; statuses: LitterStatus[] }[] = [
  { title: 'Current litters', statuses: ['current', 'available', 'reserved'] },
  { title: 'Planned litters', statuses: ['planned', 'expected'] },
  { title: 'Previous litters', statuses: ['previous'] },
];
