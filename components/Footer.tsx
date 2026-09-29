import Link from 'next/link';
import type { SiteSettings } from '@/types/content';
import { getContactMethods } from '@/lib/contact';
import { Brand } from './Header';
import { ContactAnchor, SocialLinks } from './Contact';
import { Container } from './ui';
export function Footer({ settings, demo = false }: { settings: SiteSettings; demo?: boolean }) {
  const contacts = getContactMethods(settings).filter((method) =>
    ['email', 'phone', 'whatsapp'].includes(method.kind),
  );
  const socials = getContactMethods(settings).some((method) =>
    ['instagram', 'facebook', 'tiktok'].includes(method.kind),
  );
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand settings={settings} />
            {settings.siteDescription && <p>{settings.siteDescription}</p>}
            {settings.location && <span className="footer-location">{settings.location}</span>}
          </div>
          <div>
            <h2 className="eyebrow">Explore</h2>
            <ul>
              {[
                ['Our Cattery', '/our-cattery'],
                ['Litters', '/litters'],
                ['Exhibitions', '/exhibitions'],
                ['Gallery', '/gallery'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow">Information</h2>
            <ul>
              {[
                ['Additional Information', '/information'],
                ['Contact', '/contact'],
                ['Privacy', '/privacy'],
                ['Imprint', '/imprint'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          {(contacts.length > 0 || socials) && (
            <div>
              {contacts.length > 0 && (
                <>
                  <h2 className="eyebrow">Contact</h2>
                  <ul>
                    {contacts.map((method) => (
                      <li key={method.kind}>
                        <ContactAnchor method={method}>
                          {method.kind === 'whatsapp' ? 'WhatsApp' : method.value}
                        </ContactAnchor>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {socials && (
                <>
                  <h2 className="eyebrow footer-follow">Follow along</h2>
                  <SocialLinks settings={settings} />
                </>
              )}
            </div>
          )}
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {settings.catteryName}
          </p>
          <span>With care, always.</span>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/imprint">Imprint</Link>
          </div>
        </div>
        {demo && (
          <p className="demo-notice">
            Design preview · Fictional cattery, animals, titles, and events. Photographs are
            illustrative. Contact uses an example address.
          </p>
        )}
      </Container>
    </footer>
  );
}
