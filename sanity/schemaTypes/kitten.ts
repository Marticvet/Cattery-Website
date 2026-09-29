import { defineField, defineType } from 'sanity';
import {
  activeField,
  defaultOrderings,
  galleryField,
  nameField,
  orderField,
  sexField,
  slugField,
} from './shared';
import { kittenStatuses } from '../../lib/labels';
export const kitten = defineType({
  name: 'kitten',
  title: 'Kitten',
  type: 'document',
  fields: [
    nameField,
    slugField(),
    defineField({
      name: 'litter',
      title: 'Litter',
      type: 'reference',
      to: [{ type: 'litter' }],
      description:
        'Choose the kitten’s litter. It will automatically appear on that litter’s page.',
      validation: (rule) => rule.required(),
    }),
    sexField,
    defineField({ name: 'color', title: 'Colour', type: 'string' }),
    defineField({
      name: 'status',
      title: 'Availability',
      type: 'string',
      initialValue: 'underEvaluation',
      options: { list: Object.entries(kittenStatuses).map(([value, title]) => ({ value, title })) },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'dateOfBirth', title: 'Date of birth', type: 'date' }),
    defineField({
      name: 'mainImage',
      title: 'Main photograph',
      type: 'contentImage',
      description: 'Choose this kitten’s own photograph.',
      validation: (rule) => rule.required(),
    }),
    galleryField,
    defineField({ name: 'description', title: 'About this kitten', type: 'richText' }),
    orderField,
    activeField,
  ],
  orderings: defaultOrderings,
  preview: {
    select: { title: 'name', litter: 'litter.name', status: 'status', media: 'mainImage' },
    prepare({ title, litter, status, media }) {
      return {
        title,
        subtitle: [litter, kittenStatuses[status as keyof typeof kittenStatuses]]
          .filter(Boolean)
          .join(' · '),
        media,
      };
    },
  },
});
