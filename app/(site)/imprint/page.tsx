import { LegalPage } from '@/components/LegalPage';
import { pageMetadata } from '@/lib/metadata';
import { getLegal } from '@/lib/sanity/data';
export async function generateMetadata() {
  const [metadata, page] = await Promise.all([
    pageMetadata('Imprint', '/imprint'),
    getLegal('imprint'),
  ]);
  return {
    ...metadata,
    ...(!page?.readyToPublish ? { robots: { index: false, follow: true } } : {}),
  };
}
export default function ImprintPage() {
  return <LegalPage id="imprint" />;
}
