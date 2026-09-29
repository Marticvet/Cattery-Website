import { defineArrayMember, defineField, defineType } from 'sanity';
import {
  activeField,
  defaultOrderings,
  featuredField,
  galleryField,
  nameField,
  orderField,
  parentField,
  slugField,
} from './shared';
import { litterStatuses } from '../../lib/labels';
export const litter = defineType({
  name: 'litter',
  title: 'Litter',
  type: 'document',
  groups: [
    { name: 'litter', title: 'Litter details', default: true },
    { name: 'family', title: 'Parents & kittens' },
    { name: 'photos', title: 'Photographs' },
    { name: 'website', title: 'Website display' },
  ],
  fields: [
    { ...nameField, group: 'litter' },
    { ...slugField(), group: 'litter' },
    defineField({
      name: 'litterLetter',
      title: 'Litter letter',
      type: 'string',
      group: 'litter',
      description: 'For example A, B, or C. You can keep adding litters.',
      validation: (rule) => rule.max(10),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'litter',
      initialValue: 'planned',
      options: { list: Object.entries(litterStatuses).map(([value, title]) => ({ value, title })) },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover photograph',
      type: 'contentImage',
      group: 'photos',
      description:
        'This litter has its own cover. Choose a photograph that represents the whole litter.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'About this litter',
      type: 'richText',
      group: 'litter',
    }),
    defineField({ name: 'dateOfBirth', title: 'Date of birth', type: 'date', group: 'litter' }),
    defineField({ name: 'expectedDate', title: 'Expected date', type: 'date', group: 'litter' }),
    { ...parentField('mother'), group: 'family' },
    { ...parentField('father'), group: 'family' },
    defineField({
      name: 'kittens',
      title: 'Kittens',
      type: 'array',
      group: 'family',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'kitten' }],
          options: {
            filter: ({ document }) => ({
              filter: 'litter._ref == $litterId',
              params: { litterId: document._id.replace(/^drafts\./, '') },
            }),
          },
        }),
      ],
      description:
        'Publish this litter first. Then create kittens and choose this litter in each kitten’s Litter field. They appear automatically; you can also select them here.',
      validation: (rule) => rule.unique(),
    }),
    { ...galleryField, group: 'photos' },
    { ...featuredField, group: 'website' },
    { ...orderField, group: 'website' },
    { ...activeField, group: 'website' },
  ],
  orderings: defaultOrderings,
  preview: {
    select: { title: 'name', status: 'status', date: 'dateOfBirth', media: 'coverImage' },
    prepare({ title, status, date, media }) {
      return {
        title,
        subtitle: [litterStatuses[status as keyof typeof litterStatuses], date]
          .filter(Boolean)
          .join(' · '),
        media,
      };
    },
  },
});
