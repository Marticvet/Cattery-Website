import { defineField, defineType } from 'sanity';
const phoneValidation = (value: string | undefined) =>
  !value ||
  /^\+?[\d\s().-]{7,24}$/.test(value) ||
  'Use a phone number with country code, for example +49 123 456789.';
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'cattery', title: 'Our cattery page' },
    { name: 'contact', title: 'Contact' },
    { name: 'social', title: 'Social media' },
    { name: 'visibility', title: 'Contact visibility' },
    { name: 'seo', title: 'Search & sharing' },
  ],
  fields: [
    defineField({
      name: 'catteryName',
      title: 'Cattery name',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'contentImage',
      group: 'general',
      description: 'Optional. Your cattery name is shown beautifully when no logo is uploaded.',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Short description',
      type: 'text',
      rows: 3,
      group: 'general',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'general',
      description: 'Only the location you want to make public, such as a city and country.',
    }),
    defineField({
      name: 'catteryHeading',
      title: 'Page heading',
      type: 'string',
      group: 'cattery',
    }),
    defineField({
      name: 'catteryDescription',
      title: 'Introduction',
      type: 'text',
      rows: 3,
      group: 'cattery',
    }),
    defineField({
      name: 'maleImage',
      title: 'Our males photograph',
      type: 'contentImage',
      group: 'cattery',
      description: 'Optional; the first male’s photograph is used if empty.',
    }),
    defineField({
      name: 'femaleImage',
      title: 'Our females photograph',
      type: 'contentImage',
      group: 'cattery',
      description: 'Optional; the first female’s photograph is used if empty.',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email address',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone number',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.custom(phoneValidation),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp number',
      type: 'string',
      group: 'contact',
      description:
        'Include the international country code. Only a number is needed, not a wa.me link.',
      validation: (rule) =>
        rule.custom(
          (value) =>
            !value ||
            /^[1-9]\d{6,14}$/.test(value.replace(/[^\d]/g, '').replace(/^00/, '')) ||
            'Enter an international number including the country code.',
        ),
    }),
    defineField({
      name: 'contactDescription',
      title: 'Contact page introduction',
      type: 'text',
      rows: 4,
      group: 'contact',
    }),
    defineField({
      name: 'whatsappMessageTemplate',
      title: 'Kitten enquiry message',
      type: 'text',
      rows: 3,
      group: 'contact',
      initialValue: 'Hello, I would like to ask about {name}{litter}.',
      description:
        '{name} becomes the kitten’s name; {litter} becomes “ from Litter A” when a litter is linked.',
    }),
    ...(['instagram', 'facebook', 'tiktok'] as const).map((platform) =>
      defineField({
        name: `${platform}Url`,
        title: `${platform === 'tiktok' ? 'TikTok' : platform[0].toUpperCase() + platform.slice(1)} profile URL`,
        type: 'url',
        group: 'social',
        validation: (rule) => rule.uri({ scheme: ['https'] }),
      }),
    ),
    ...(['Email', 'Phone', 'WhatsApp', 'Instagram', 'Facebook', 'TikTok'] as const).map((method) =>
      defineField({
        name: `show${method}`,
        title: `Show ${method}`,
        type: 'boolean',
        group: 'visibility',
        initialValue: true,
        description: 'Only shown when an address or number is also configured.',
      }),
    ),
    defineField({
      name: 'defaultTitle',
      title: 'Default page title',
      type: 'string',
      group: 'seo',
      validation: (rule) =>
        rule.max(80).warning('Short titles are easier to read in search results.'),
    }),
    defineField({
      name: 'defaultDescription',
      title: 'Search description',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (rule) => rule.max(180).warning('Aim for about 150–160 characters.'),
    }),
    defineField({
      name: 'defaultOpenGraphImage',
      title: 'Default sharing image',
      type: 'contentImage',
      group: 'seo',
      description:
        'Used when a page does not have its own main photograph. Landscape photographs work best.',
    }),
  ],
  preview: {
    select: { title: 'catteryName', media: 'logo' },
    prepare: ({ title, media }) => ({
      title: title || 'Site settings',
      subtitle: 'Name, contact details, social links, and search settings',
      media,
    }),
  },
});
