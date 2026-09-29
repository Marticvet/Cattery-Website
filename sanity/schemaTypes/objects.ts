import { defineArrayMember, defineField, defineType } from 'sanity';
export const contentImage = defineType({
  name: 'contentImage',
  title: 'Photograph',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Image description',
      type: 'string',
      description: 'Describe what is in the photograph. This helps visitors using screen readers.',
      validation: (rule) => rule.required().max(240),
    }),
    defineField({ name: 'caption', title: 'Caption (optional)', type: 'string' }),
  ],
});
export const callout = defineType({
  name: 'callout',
  title: 'Helpful note',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Heading', type: 'string' }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'text' } },
});
export const richText = defineType({
  name: 'richText',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Paragraph', value: 'normal' },
        { title: 'Heading', value: 'h2' },
        { title: 'Subheading', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet list', value: 'bullet' },
        { title: 'Numbered list', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'Address',
                type: 'url',
                validation: (rule) =>
                  rule
                    .required()
                    .uri({ scheme: ['https', 'http', 'mailto', 'tel'], allowRelative: true }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: 'contentImage' }),
    defineArrayMember({ type: 'callout' }),
  ],
});
export const cta = defineType({
  name: 'cta',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Button text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'Use a website path, for example /our-cattery or /litters.',
      validation: (rule) =>
        rule
          .required()
          .custom(
            (value) =>
              !value ||
              /^\/(?!\/|\\)[^\s\\]*$/.test(value) ||
              'Use an internal path starting with one /, such as /litters.',
          ),
    }),
  ],
});
