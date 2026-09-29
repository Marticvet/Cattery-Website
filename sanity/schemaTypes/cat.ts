import { defineField, defineType } from 'sanity';
import {
  activeField,
  defaultOrderings,
  featuredField,
  galleryField,
  nameField,
  orderField,
  parentField,
  sexField,
  slugField,
} from './shared';
export const cat = defineType({
  name: 'cat',
  title: 'Cat',
  type: 'document',
  groups: [
    { name: 'profile', title: 'Profile', default: true },
    { name: 'details', title: 'Story & records' },
    { name: 'photos', title: 'Photographs' },
    { name: 'website', title: 'Website display' },
  ],
  fields: [
    { ...nameField, group: 'profile' },
    { ...slugField(), group: 'profile' },
    { ...sexField, group: 'profile' },
    defineField({
      name: 'title',
      title: 'Official title',
      type: 'string',
      group: 'profile',
      description: 'For example, International Champion. Leave blank if not applicable.',
    }),
    defineField({ name: 'breed', title: 'Breed', type: 'string', group: 'profile' }),
    defineField({ name: 'color', title: 'Colour', type: 'string', group: 'profile' }),
    defineField({ name: 'dateOfBirth', title: 'Date of birth', type: 'date', group: 'profile' }),
    defineField({ name: 'emsCode', title: 'EMS code', type: 'string', group: 'profile' }),
    defineField({
      name: 'mainImage',
      title: 'Main photograph',
      type: 'contentImage',
      group: 'photos',
      validation: (rule) => rule.required(),
    }),
    { ...galleryField, group: 'photos' },
    defineField({
      name: 'shortDescription',
      title: 'Short introduction',
      type: 'text',
      rows: 3,
      group: 'profile',
      validation: (rule) => rule.max(250),
    }),
    defineField({
      name: 'fullDescription',
      title: 'About this cat',
      type: 'richText',
      group: 'details',
    }),
    { ...parentField('father'), group: 'details' },
    { ...parentField('mother'), group: 'details' },
    defineField({ name: 'pedigree', title: 'Pedigree', type: 'richText', group: 'details' }),
    defineField({
      name: 'healthInformation',
      title: 'Health information',
      type: 'richText',
      group: 'details',
      description:
        'Add verified screening results or veterinary information. Empty sections stay hidden.',
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'richText',
      group: 'details',
    }),
    { ...featuredField, group: 'website' },
    { ...orderField, group: 'website' },
    { ...activeField, group: 'website' },
  ],
  orderings: defaultOrderings,
  preview: {
    select: {
      title: 'name',
      sex: 'sex',
      officialTitle: 'title',
      media: 'mainImage',
      active: 'active',
    },
    prepare({ title, sex, officialTitle, media, active }) {
      return {
        title,
        subtitle: [
          sex === 'male' ? 'Male' : 'Female',
          officialTitle,
          active === false ? 'Hidden' : undefined,
        ]
          .filter(Boolean)
          .join(' · '),
        media,
      };
    },
  },
});
