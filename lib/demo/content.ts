import type {
  Cat,
  ContentImage,
  Exhibition,
  GalleryItem,
  Home,
  InformationPage,
  Kitten,
  Litter,
  RichText,
  SiteSettings,
} from '@/types/content';

// Fictional preview data. Only imported when CONTENT_MODE=demo; never a CMS fallback.
const photo = (name: string, alt: string): ContentImage => ({ src: `/images/${name}.jpg`, alt });
const paragraph = (text: string, key = 'p'): RichText => [
  {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}-text`, text, marks: [] }],
  },
];
const hero = photo('hero', 'Golden British Shorthair sitting in soft natural light');
const golden = photo('golden', 'Golden British Shorthair resting on a woven rug');
const portrait = photo('portrait', 'A curious cat looking toward the camera');
const auroraPhoto = photo('aurora', 'Blue British Shorthair kitten looking up from a tabletop');
const athenaPhoto = photo('athena', 'Blue British Shorthair kitten relaxing beside a window');
const kittenPhoto = photo('apollo', 'Blue British Shorthair kitten with an inquisitive expression');
const sleeping = photo('sleeping', 'A cat enjoying a quiet moment at home');
export const demoSettings: SiteSettings = {
  catteryName: 'Maison Aurelia',
  siteDescription:
    'A small cattery. A whole lot of heart. British Shorthairs raised as part of the family.',
  location: 'Germany',
  contactEmail: 'hello@example.com',
  showEmail: true,
  contactDescription:
    'Whether you are ready to welcome a kitten or simply curious about our little family, we would love to hear from you.',
  defaultTitle: 'Maison Aurelia — British Shorthair Cattery',
  defaultDescription: 'Meet the cats, little beginnings, and everyday moments of Maison Aurelia.',
  catteryHeading: 'The heart of our home.',
  catteryDescription:
    'Each one a personality. Each one a member of the family. Meet the cats who make our little world complete.',
  maleImage: hero,
  femaleImage: golden,
};
export const demoCats: Cat[] = [
  {
    _id: 'leonardo',
    slug: 'leonardo',
    name: 'Leonardo',
    sex: 'male',
    title: 'International Champion',
    breed: 'British Shorthair',
    color: 'Golden shaded',
    dateOfBirth: '2022-04-12',
    emsCode: 'BRI ny 11',
    mainImage: hero,
    featured: true,
    shortDescription: 'Our gentle soul with a golden heart.',
    fullDescription: paragraph(
      'Leonardo is the quiet heart of our home. You will usually find him in a sunny spot, keeping a watchful eye on the room. Affectionate and wonderfully unhurried, he reminds us to enjoy the little things.',
    ),
    gallery: [hero, golden],
    pedigree: paragraph(
      'Pedigree documents and verified parent information can be added here by the owner.',
    ),
    healthInformation: paragraph(
      'The owner can publish verified screening results and veterinary information here. This demonstration does not represent a real animal’s health record.',
    ),
    achievements: paragraph('International Champion — fictional title shown for demonstration.'),
  },
  {
    _id: 'bella',
    slug: 'bella',
    name: 'Bella',
    sex: 'female',
    title: 'International Champion',
    breed: 'British Shorthair',
    color: 'Golden shaded',
    dateOfBirth: '2023-02-08',
    emsCode: 'BRI ny 11',
    mainImage: golden,
    featured: true,
    shortDescription: 'A little elegance, a little mischief.',
    fullDescription: paragraph(
      'Bella brings warmth to every room. Curious, affectionate, and always close by, she is happiest sharing a quiet afternoon with her people.',
    ),
    gallery: [golden, hero],
  },
  {
    _id: 'cleo',
    slug: 'cleo',
    name: 'Cleo',
    sex: 'female',
    title: 'Our little daydreamer',
    breed: 'British Shorthair',
    color: 'Golden',
    dateOfBirth: '2024-03-21',
    mainImage: portrait,
    featured: true,
    fullDescription: paragraph(
      'Cleo approaches the world with wide-eyed curiosity. She has a soft spot for crinkly paper, warm blankets, and being exactly where you are.',
    ),
    gallery: [portrait, sleeping],
  },
];
const litterBase = {
  _id: 'litter-a',
  slug: 'litter-a',
  name: 'Litter A',
  litterLetter: 'A',
  status: 'available' as const,
  dateOfBirth: '2026-05-15',
  coverImage: auroraPhoto,
  mother: demoCats[1],
  father: demoCats[0],
};
export const demoKittens: Kitten[] = [
  {
    _id: 'apollo',
    slug: 'apollo',
    name: 'Apollo',
    sex: 'male',
    color: 'Blue',
    status: 'available',
    dateOfBirth: '2026-05-15',
    mainImage: kittenPhoto,
    litter: litterBase,
    description: paragraph(
      'A bright little explorer with a gentle side. Apollo is the first to investigate a new toy and the first to curl up beside you afterwards.',
    ),
    gallery: [kittenPhoto],
  },
  {
    _id: 'aurora',
    slug: 'aurora',
    name: 'Aurora',
    sex: 'female',
    color: 'Blue',
    status: 'reserved',
    dateOfBirth: '2026-05-15',
    mainImage: auroraPhoto,
    litter: litterBase,
    description: paragraph(
      'Sweet, curious, and full of personality. Aurora finds wonder in the everyday and brings a little sunshine wherever she goes.',
    ),
    gallery: [auroraPhoto],
  },
  {
    _id: 'athena',
    slug: 'athena',
    name: 'Athena',
    sex: 'female',
    color: 'Blue',
    status: 'stayingWithUs',
    dateOfBirth: '2026-05-15',
    mainImage: athenaPhoto,
    litter: litterBase,
    description: paragraph(
      'Our thoughtful little companion. Athena is staying with the family, and we look forward to watching her grow.',
    ),
    gallery: [athenaPhoto],
  },
];
export const demoLitters: Litter[] = [
  {
    ...litterBase,
    description: paragraph(
      'Three little personalities. One beautiful beginning. Bella and Leonardo’s kittens are growing up right at the heart of our home, surrounded by the familiar sounds and gentle rhythm of family life.',
    ),
    kittens: demoKittens,
    gallery: [kittenPhoto, auroraPhoto, athenaPhoto],
    featured: true,
  },
];
export const demoExhibitions: Exhibition[] = [
  {
    _id: 'frankfurt',
    slug: 'international-cat-show-frankfurt',
    title: 'A lovely day in Frankfurt.',
    eventName: 'International Cat Show Frankfurt',
    location: 'Frankfurt',
    country: 'Germany',
    date: '2026-09-12',
    resultSummary: 'Bella — Best in Show',
    coverImage: golden,
    description: paragraph(
      'A day spent among fellow cat lovers, beautiful cats, and familiar faces. This fictional exhibition demonstrates how the owner can share show memories and results.',
    ),
    participatingCats: [demoCats[1], demoCats[0]],
    results: paragraph(
      'Bella — Best in Show. Leonardo — Excellent. These are fictional results for demonstration only.',
    ),
    gallery: [golden, hero],
  },
];
export const demoGallery: GalleryItem[] = [
  { _id: 'g1', image: golden, category: 'cats', caption: 'A little golden hour.' },
  {
    _id: 'g2',
    image: kittenPhoto,
    category: 'kittens',
    caption: 'The world is full of little wonders.',
  },
  { _id: 'g3', image: sleeping, category: 'catteryLife', caption: 'The art of doing nothing.' },
  { _id: 'g4', image: hero, category: 'cats', caption: 'Leonardo, in his favourite light.' },
  { _id: 'g5', image: auroraPhoto, category: 'kittens', caption: 'Always curious.' },
  { _id: 'g6', image: portrait, category: 'exhibitions', caption: 'A face to remember.' },
];
export const demoHome: Home = {
  heroTitle: 'Maison\nAurelia',
  heroSubtitle: 'Raised with love, care and dedication.',
  heroDescription:
    'British Shorthairs with gentle souls and golden hearts. A small, family cattery where every cat belongs.',
  heroImage: hero,
  primaryCTA: { label: 'Meet our cats', href: '/our-cattery' },
  secondaryCTA: { label: 'Our litters', href: '/litters' },
  aboutHeading: 'A cattery built\naround care.',
  aboutContent: paragraph(
    'To us, a cattery is first and foremost a home. A place of warm laps, sunlit windows, and little everyday moments shared together.\n\nOur love for British Shorthairs started with their gentle nature and quietly wonderful personalities. Today, that same love shapes everything we do — giving every cat the time, attention, and care they deserve.',
  ),
  aboutImage: golden,
  featuredCats: demoCats,
  featuredLitters: demoLitters,
  philosophyHeading: 'Small by choice.\nThoughtful by nature.',
  philosophyContent: paragraph(
    'We believe the best beginnings are unhurried. Our cats are part of our everyday lives, and our kittens grow up with the space to explore, the comfort to feel safe, and the attention to flourish.\n\nFrom our home to yours, care is the thread that connects it all.',
  ),
  philosophyImage: sleeping,
  galleryPreview: demoGallery.slice(0, 4),
  featuredExhibition: demoExhibitions[0],
  contactCTAHeading: 'Your next chapter, together.',
  contactCTADescription:
    'A question, a hello, or the beginning of a lifelong friendship. We would love to hear from you.',
};
export const demoInformation: InformationPage = {
  title: 'A little knowledge.\nA lot of care.',
  introduction:
    'Thoughtful beginnings, happy companions. A few things to know about our cats and welcoming a kitten into your home.',
  sections: [
    {
      _key: 'breed',
      title: 'About the breed',
      content: paragraph(
        'This is the place to introduce your breed, its character, and what life with these cats is like. The owner can replace this demonstration text with their own experience and photographs.',
      ),
    },
    { _key: 'philosophy', title: 'Our breeding philosophy', content: demoHome.philosophyContent! },
    {
      _key: 'health',
      title: 'Health & wellbeing',
      content: paragraph(
        'Use this section to explain your verified screening programme, veterinary care, and the documents provided with each kitten. Add only information that applies to your cattery.',
      ),
    },
    {
      _key: 'reservation',
      title: 'Kitten reservations',
      content: paragraph(
        'Every new beginning starts with a conversation. Contact us to learn about available kittens and upcoming litters. The owner can explain the actual reservation process and terms here.',
      ),
    },
    {
      _key: 'home',
      title: 'Bringing your kitten home',
      content: paragraph(
        'A familiar blanket, a quiet room, and a little patience can make a new home feel welcoming. This section can contain your own preparation guide, feeding routine, and handover details.',
      ),
    },
    {
      _key: 'faq',
      title: 'Frequently asked questions',
      content: [
        {
          _type: 'block',
          _key: 'q',
          style: 'h3',
          markDefs: [],
          children: [{ _type: 'span', _key: 'q1', text: 'How can we meet your cats?', marks: [] }],
        },
        ...paragraph(
          'Please get in touch to introduce yourself and talk about the next steps.',
          'a',
        ),
      ],
    },
  ],
};
