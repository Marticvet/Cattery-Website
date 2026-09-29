import { getInformation } from '@/lib/sanity/data';
import { pageMetadata } from '@/lib/metadata';
import { Container, EmptyState, PageIntro } from '@/components/ui';
import { PortableTextRenderer } from '@/components/PortableTextRenderer';
export const generateMetadata = () => pageMetadata('Additional Information', '/information');
export default async function InformationPage() {
  const page = await getInformation();
  const sections =
    page?.sections?.filter((section) => section.title && section.content?.length) || [];
  return (
    <Container className="page-content">
      <PageIntro
        eyebrow="Good to know"
        title={page?.title || 'A little knowledge. A lot of care.'}
        description={page?.introduction}
      />
      {sections.length ? (
        <div className="information-layout">
          <nav className="information-nav" aria-label="Information sections">
            {sections.map((section) => (
              <a key={section._key} href={`#section-${section._key}`}>
                {section.title}
              </a>
            ))}
          </nav>
          <div>
            {sections.map((section) => (
              <section
                className="information-section"
                id={`section-${section._key}`}
                key={section._key}
              >
                <h2>{section.title}</h2>
                <PortableTextRenderer value={section.content} />
              </section>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          title="Thoughtful advice, coming soon."
          description="Get in touch if there is anything you would like to know about our cattery."
          contact
        />
      )}
    </Container>
  );
}
