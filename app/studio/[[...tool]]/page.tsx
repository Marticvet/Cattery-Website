import type { Metadata } from 'next';
import Link from 'next/link';
import { sanityConfigured } from '@/lib/sanity/env';
import { Studio } from './Studio';
export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Cattery Studio',
  robots: { index: false, follow: false },
};
export default function StudioPage() {
  return sanityConfigured ? (
    <Studio />
  ) : (
    <main className="studio-setup">
      <p>YOUR CATTERY · CONTENT STUDIO</p>
      <h1>A home for your stories.</h1>
      <p>
        To activate your editor, add your Sanity project ID and dataset to <code>.env.local</code>,
        then restart the website. The README includes a step-by-step setup and owner’s guide.
      </p>
      <p>
        Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code>.
        Sanity provides the secure editor sign-in.
      </p>
      <Link className="button" href="/">
        Return to the website
      </Link>
    </main>
  );
}
