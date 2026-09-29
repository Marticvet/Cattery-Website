'use client';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes, singletonTypes } from './sanity/schemaTypes';
import { structure } from './sanity/structure';
import { sanityDataset, sanityProjectId } from './lib/sanity/env';
export default defineConfig({
  name: 'cattery',
  title: 'Your Cattery',
  basePath: '/studio',
  projectId: sanityProjectId || 'unconfigured',
  dataset: sanityDataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    templates: (previous) => [
      ...previous.filter((template) => !singletonTypes.has(template.schemaType)),
      {
        id: 'cat-male',
        title: 'Male cat',
        schemaType: 'cat',
        value: { sex: 'male', active: true, displayOrder: 0 },
      },
      {
        id: 'cat-female',
        title: 'Female cat',
        schemaType: 'cat',
        value: { sex: 'female', active: true, displayOrder: 0 },
      },
      ...(['planned', 'current', 'previous'] as const).map((status) => ({
        id: `litter-${status}`,
        title: `${status[0].toUpperCase()}${status.slice(1)} litter`,
        schemaType: 'litter',
        value: { status, active: true, displayOrder: 0 },
      })),
    ],
  },
  document: {
    newDocumentOptions: (previous) =>
      previous.filter((item) => !singletonTypes.has(item.templateId)),
    actions: (previous, context) =>
      singletonTypes.has(context.schemaType)
        ? previous.filter(
            (action) => !['duplicate', 'delete', 'unpublish'].includes(action.action || ''),
          )
        : previous,
  },
});
