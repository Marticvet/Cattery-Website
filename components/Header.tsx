import Link from 'next/link';
import type { SiteSettings } from '@/types/content';
import { Photo } from './Photo';
import { Navigation } from './Navigation';
import { Container } from './ui';
export function Brand({ settings }: { settings: SiteSettings }) {
  return (
    <Link href="/" className="brand" aria-label={`${settings.catteryName} — home`}>
      {settings.logo ? (
        <Photo image={settings.logo} className="brand-image" sizes="180px" width={400} />
      ) : (
        <>
          <span className="brand-name">{settings.catteryName}</span>
          <span className="brand-caption">A home. A family. A cattery.</span>
        </>
      )}
    </Link>
  );
}
export function Header({ settings }: { settings: SiteSettings }) {
  return (
    <header className="site-header">
      <Container className="header-inner">
        <Brand settings={settings} />
        <Navigation name={settings.catteryName} />
      </Container>
    </header>
  );
}
