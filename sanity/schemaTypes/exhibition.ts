import { defineArrayMember, defineField, defineType } from 'sanity';
import { galleryField, orderField, slugField } from './shared';
export const exhibition = defineType({
  name: 'exhibition',
  title: 'Exhibition',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Story title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    slugField('title'),
    defineField({
      name: 'eventName',
      title: 'Event name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'location', title: 'City / venue', type: 'string' }),
    defineField({ name: 'country', title: 'Country', type: 'string' }),
    defineField({
      name: 'date',
      title: 'Event date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover photograph',
      type: 'contentImage',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'description', title: 'Story', type: 'richText' }),
    defineField({
      name: 'participatingCats',
      title: 'Participating cats',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'cat' }] })],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'resultSummary',
      title: 'Result highlight',
      type: 'string',
      description: 'A short highlight for the listing, for example Bella — Best in Show.',
    }),
    defineField({ name: 'results', title: 'Full results', type: 'richText' }),
    galleryField,
    orderField,
  ],
  orderings: [
    { title: 'Newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
  preview: { select: { title: 'eventName', subtitle: 'date', media: 'coverImage' } },
});
