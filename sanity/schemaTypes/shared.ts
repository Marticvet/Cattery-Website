import { defineArrayMember, defineField } from 'sanity';
export const nameField = defineField({
  name: 'name',
  title: 'Name',
  type: 'string',
  validation: (rule) => rule.required().max(120),
});
export const slugField = (source = 'name') =>
  defineField({
    name: 'slug',
    title: 'Page address',
    type: 'slug',
    options: { source, maxLength: 96 },
    description:
      'Click Generate once. Keep this address stable after publishing so shared links continue to work.',
    validation: (rule) => rule.required(),
  });
export const sexField = defineField({
  name: 'sex',
  title: 'Sex',
  type: 'string',
  options: {
    list: [
      { title: 'Male', value: 'male' },
      { title: 'Female', value: 'female' },
    ],
    layout: 'radio',
    direction: 'horizontal',
  },
  validation: (rule) => rule.required(),
});
export const galleryField = defineField({
  name: 'gallery',
  title: 'Photo gallery',
  type: 'array',
  of: [defineArrayMember({ type: 'contentImage' })],
  options: { layout: 'grid' },
  description: 'Upload photographs, add descriptions, and drag to change their order.',
});
export const orderField = defineField({
  name: 'displayOrder',
  title: 'Display order',
  type: 'number',
  description: 'Lower numbers appear first.',
  initialValue: 0,
  validation: (rule) => rule.integer().min(0),
});
export const activeField = defineField({
  name: 'active',
  title: 'Visible on the website',
  type: 'boolean',
  initialValue: true,
  description:
    'Turn off to hide this profile and its listing. Your document and photographs are kept.',
});
export const featuredField = defineField({
  name: 'featured',
  title: 'Feature on the homepage',
  type: 'boolean',
  initialValue: false,
});
export const parentField = (name: 'mother' | 'father') =>
  defineField({
    name,
    title: name === 'mother' ? 'Mother' : 'Father',
    type: 'reference',
    to: [{ type: 'cat' }],
    options: {
      filter: ({ document }) => ({
        filter: 'sex == $sex && !(_id in [$id, $draftId])',
        params: {
          sex: name === 'mother' ? 'female' : 'male',
          id: document._id.replace(/^drafts\./, ''),
          draftId: `drafts.${document._id.replace(/^drafts\./, '')}`,
        },
      }),
    },
  });
export const defaultOrderings = [
  {
    title: 'Display order',
    name: 'displayOrderAsc',
    by: [
      { field: 'displayOrder', direction: 'asc' as const },
      { field: 'name', direction: 'asc' as const },
    ],
  },
];
