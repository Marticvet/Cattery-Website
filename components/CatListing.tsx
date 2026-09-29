import Link from 'next/link';
import { getCats, getSettings } from '@/lib/sanity/data';
import { labels } from '@/lib/labels';
import { CatCard } from './Cards';
import { ContactCTA } from './Contact';
import { Breadcrumbs, Container, EmptyState, PageIntro } from './ui';
export async function CatListing({ sex }: { sex: 'male' | 'female' }) {
  const [cats, settings] = await Promise.all([getCats(sex), getSettings()]);
  return (
    <>
      <Container className="page-content">
        <Breadcrumbs
          items={[
            { label: 'Our Cattery', href: '/our-cattery' },
            { label: sex === 'male' ? 'Males' : 'Females' },
          ]}
        />
        <PageIntro
          eyebrow="Meet the family"
          title={sex === 'male' ? 'Our gentlemen.' : 'Our queens.'}
        />
        <nav className="page-tabs" aria-label="Our cats">
          <Link href="/our-cattery/males" aria-current={sex === 'male' ? 'page' : undefined}>
            Our males
          </Link>
          <Link href="/our-cattery/females" aria-current={sex === 'female' ? 'page' : undefined}>
            Our females
          </Link>
        </nav>
        {cats.length ? (
          <div className="cat-grid">
            {cats.map((cat) => (
              <CatCard cat={cat} key={cat._id} />
            ))}
          </div>
        ) : (
          <EmptyState title={labels.emptyCats} description={labels.emptyCatsDescription} contact />
        )}
      </Container>
      <ContactCTA settings={settings} />
    </>
  );
}
