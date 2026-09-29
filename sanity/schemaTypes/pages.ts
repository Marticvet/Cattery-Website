import { defineArrayMember, defineField, defineType } from 'sanity';
export const informationPage = defineType({
  name: 'informationPage',
  title: 'Additional information',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page heading', type: 'string' }),
    defineField({ name: 'introduction', title: 'Introduction', type: 'text', rows: 3 }),
    defineField({
      name: 'sections',
      title: 'Information sections',
      type: 'array',
      description: 'Add any sections you need. Drag them to change the order on your website.',
      of: [
        defineArrayMember({
          name: 'informationSection',
          title: 'Section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section heading',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'richText',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Additional information',
      subtitle: 'Your guides, advice, and frequently asked questions',
    }),
  },
});
export const legalPage = defineType({
  name: 'legalPage',
  title: 'Legal page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Legal content',
      type: 'richText',
      description:
        'Replace placeholders with accurate information for your cattery, hosting, and jurisdiction.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'readyToPublish',
      title: 'Reviewed and ready for public display',
      type: 'boolean',
      initialValue: false,
      description:
        'Enable only after the owner has reviewed and completed this legal page. Otherwise, the website displays a clearly marked placeholder.',
    }),
  ],
  preview: {
    select: { title: 'title', ready: 'readyToPublish' },
    prepare: ({ title, ready }) => ({
      title,
      subtitle: ready ? 'Reviewed for publication' : 'Owner review required',
    }),
  },
});
