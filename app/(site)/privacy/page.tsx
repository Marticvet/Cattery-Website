import { LegalPage } from '@/components/LegalPage';
import { pageMetadata } from '@/lib/metadata';
import { getLegal } from '@/lib/sanity/data';
export async function generateMetadata() {
  const [metadata, page] = await Promise.all([
    pageMetadata('Privacy', '/privacy'),
    getLegal('privacy'),
  ]);
  return {
    ...metadata,
    ...(!page?.readyToPublish ? { robots: { index: false, follow: true } } : {}),
  };
}
export default function PrivacyPage() {
  return <LegalPage id="privacy" />;
}
