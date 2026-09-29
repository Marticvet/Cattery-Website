import { defineField, defineType } from 'sanity';
import { galleryCategories } from '../../lib/labels';
import { orderField } from './shared';
export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery photograph',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Photograph',
      type: 'contentImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Collection',
      type: 'string',
      initialValue: 'cats',
      options: {
        list: Object.entries(galleryCategories).map(([value, title]) => ({ value, title })),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    orderField,
  ],
  preview: {
    select: { title: 'caption', alt: 'image.alt', category: 'category', media: 'image' },
    prepare({ title, alt, category, media }) {
      return {
        title: title || alt || 'Photograph',
        subtitle: galleryCategories[category as keyof typeof galleryCategories],
        media,
      };
    },
  },
});
