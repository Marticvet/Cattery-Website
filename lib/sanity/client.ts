import 'server-only';
import { createClient } from '@sanity/client';
import { sanityApiVersion, sanityConfigured, sanityDataset, sanityProjectId } from './env';
export const sanityClient = sanityConfigured
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: false,
      perspective: 'published',
      token: process.env.SANITY_API_READ_TOKEN,
    })
  : undefined;
