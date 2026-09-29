import { getSettings } from '@/lib/sanity/data';
import { pageMetadata } from '@/lib/metadata';
import { labels } from '@/lib/labels';
import { Container, PageIntro } from '@/components/ui';
import { ContactMethods } from '@/components/Contact';
export const generateMetadata = () => pageMetadata('Contact', '/contact');
export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <Container className="page-content">
      <PageIntro
        eyebrow="Contact"
        title={labels.contactTitle}
        description={settings.contactDescription}
      />
      <ContactMethods settings={settings} />
      {settings.location && <p className="contact-location">At home in {settings.location}.</p>}
    </Container>
  );
}
