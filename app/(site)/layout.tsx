import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getSettings, isDemo } from '@/lib/sanity/data';
export const revalidate = 300;
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <div className="website">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header settings={settings} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer settings={settings} demo={isDemo} />
    </div>
  );
}
