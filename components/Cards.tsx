import Link from 'next/link';
import type { CatSummary, KittenSummary, LitterSummary, ExhibitionSummary } from '@/types/content';
import { kittenStatuses, labels, litterStatuses } from '@/lib/labels';
import { formatDate } from '@/lib/utils';
import { Photo } from './Photo';
import { Icon } from './Icon';
export function Status({ value, children }: { value: string; children: React.ReactNode }) {
  return <span className={`status status-${value}`}>{children}</span>;
}
export function CatCard({ cat }: { cat: CatSummary }) {
  return (
    <article className="cat-card">
      <Link
        className="image-link"
        href={`/our-cattery/cats/${cat.slug}`}
        aria-label={`Meet ${cat.name}`}
      >
        <Photo image={cat.mainImage} className="cat-card-photo" height={1500} />
      </Link>
      <div className="card-content">
        <p className="eyebrow">{labels[cat.sex]}</p>
        <h3>
          <Link href={`/our-cattery/cats/${cat.slug}`}>{cat.name}</Link>
        </h3>
        {cat.title && <p className="card-title">{cat.title}</p>}
        {(cat.breed || cat.color) && (
          <p className="card-meta">{[cat.breed, cat.color].filter(Boolean).join(' · ')}</p>
        )}
        <Link className="text-link" href={`/our-cattery/cats/${cat.slug}`}>
          {labels.viewProfile}
          <Icon />
        </Link>
      </div>
    </article>
  );
}
export function KittenCard({ kitten }: { kitten: KittenSummary }) {
  return (
    <article className="kitten-card">
      <Link
        className="image-link"
        href={`/kittens/${kitten.slug}`}
        aria-label={`Meet ${kitten.name}`}
      >
        <Photo image={kitten.mainImage} className="cat-card-photo" height={1500} />
        <Status value={kitten.status}>{kittenStatuses[kitten.status]}</Status>
      </Link>
      <div className="card-content">
        <h3>
          <Link href={`/kittens/${kitten.slug}`}>{kitten.name}</Link>
        </h3>
        <p className="card-meta">
          {[labels[kitten.sex], kitten.color].filter(Boolean).join(' · ')}
        </p>
        <Link className="text-link" href={`/kittens/${kitten.slug}`}>
          {labels.viewProfile}
          <Icon />
        </Link>
      </div>
    </article>
  );
}
export function LitterCard({ litter, wide = false }: { litter: LitterSummary; wide?: boolean }) {
  const date = formatDate(litter.dateOfBirth || litter.expectedDate);
  return (
    <article className={`litter-card ${wide ? 'litter-card-wide' : ''}`}>
      <Link
        className="image-link"
        href={`/litters/${litter.slug}`}
        aria-label={`Discover ${litter.name}`}
      >
        <Photo
          image={litter.coverImage}
          className="litter-card-photo"
          sizes="(max-width: 768px) 100vw, 60vw"
          width={1400}
          height={1050}
        />
      </Link>
      <div className="card-content">
        <p className="eyebrow">{litter.name}</p>
        <h3>
          <Link href={`/litters/${litter.slug}`}>
            {[litter.mother?.name, litter.father?.name].filter(Boolean).join(' × ') || litter.name}
          </Link>
        </h3>
        {date && (
          <p className="card-meta">
            {litter.dateOfBirth ? 'Born' : 'Expected'} {date}
          </p>
        )}
        <Status value={litter.status}>{litterStatuses[litter.status]}</Status>
        <Link className="text-link" href={`/litters/${litter.slug}`}>
          {labels.discoverLitter}
          <Icon />
        </Link>
      </div>
    </article>
  );
}
export function ExhibitionCard({ exhibition }: { exhibition: ExhibitionSummary }) {
  return (
    <article className="exhibition-card">
      <Link
        className="image-link"
        href={`/exhibitions/${exhibition.slug}`}
        aria-label={`View ${exhibition.eventName || exhibition.title}`}
      >
        <Photo
          image={exhibition.coverImage}
          className="exhibition-photo"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </Link>
      <div className="card-content">
        <p className="eyebrow">{formatDate(exhibition.date)}</p>
        <h3>
          <Link href={`/exhibitions/${exhibition.slug}`}>
            {exhibition.eventName || exhibition.title}
          </Link>
        </h3>
        {(exhibition.location || exhibition.country) && (
          <p className="card-meta">
            {[exhibition.location, exhibition.country].filter(Boolean).join(', ')}
          </p>
        )}
        {exhibition.resultSummary && (
          <p className="exhibition-result">{exhibition.resultSummary}</p>
        )}
        <Link className="text-link" href={`/exhibitions/${exhibition.slug}`}>
          {labels.viewExhibition}
          <Icon />
        </Link>
      </div>
    </article>
  );
}
