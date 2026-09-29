import { getExhibitions } from '@/lib/sanity/data';
import { pageMetadata } from '@/lib/metadata';
import { labels } from '@/lib/labels';
import { Container, EmptyState, PageIntro } from '@/components/ui';
import { ExhibitionCard } from '@/components/Cards';
export const generateMetadata = () => pageMetadata('Exhibitions', '/exhibitions');
export default async function ExhibitionsPage() {
  const exhibitions = await getExhibitions();
  return (
    <Container className="page-content">
      <PageIntro
        eyebrow="In the show ring"
        title={'Proud moments.\nShared memories.'}
        description="Our days among fellow cat lovers — the people we meet, the places we visit, and the cats who make us proud."
      />
      {exhibitions.length ? (
        <div className="exhibitions-list">
          {exhibitions.map((exhibition) => (
            <ExhibitionCard exhibition={exhibition} key={exhibition._id} />
          ))}
        </div>
      ) : (
        <EmptyState title={labels.emptyExhibitions} />
      )}
    </Container>
  );
}
