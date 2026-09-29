import { getLitters, getSettings } from '@/lib/sanity/data';
import { pageMetadata } from '@/lib/metadata';
import { labels, litterGroups } from '@/lib/labels';
import { Container, EmptyState, PageIntro } from '@/components/ui';
import { LitterCard } from '@/components/Cards';
import { ContactCTA } from '@/components/Contact';
export const generateMetadata = () => pageMetadata('Litters', '/litters');
export default async function LittersPage() {
  const [litters, settings] = await Promise.all([getLitters(), getSettings()]);
  return (
    <>
      <Container className="page-content">
        <PageIntro
          eyebrow="Little beginnings"
          title={'Small paws.\nBeautiful possibilities.'}
          description="Meet our newest little personalities, discover our future plans, and look back on the families that began here."
        />
        {litters.length ? (
          litterGroups.map((group) => {
            const members = litters.filter((litter) => group.statuses.includes(litter.status));
            return members.length ? (
              <section className="litter-category" key={group.title}>
                <h2>{group.title}</h2>
                <div className="litter-grid">
                  {members.map((litter) => (
                    <LitterCard key={litter._id} litter={litter} />
                  ))}
                </div>
              </section>
            ) : null;
          })
        ) : (
          <EmptyState
            title={labels.emptyLitters}
            description={labels.emptyLittersDescription}
            contact
          />
        )}
      </Container>
      <ContactCTA settings={settings} />
    </>
  );
}
