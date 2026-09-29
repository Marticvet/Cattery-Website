import { getLegal } from '@/lib/sanity/data';
import { labels } from '@/lib/labels';
import { Container, PageIntro } from './ui';
import { PortableTextRenderer } from './PortableTextRenderer';
export async function LegalPage({ id }: { id: 'privacy' | 'imprint' }) {
  const page = await getLegal(id);
  return (
    <Container>
      <PageIntro
        eyebrow="Legal information"
        title={page?.title || (id === 'privacy' ? 'Privacy policy' : 'Imprint')}
      />
      <div className="legal-content">
        {page?.readyToPublish && page.content?.length ? (
          <PortableTextRenderer value={page.content} />
        ) : (
          <div className="legal-placeholder">
            <p className="eyebrow">Placeholder — owner review required</p>
            <p>{labels.legalPlaceholder}</p>
          </div>
        )}
      </div>
    </Container>
  );
}
