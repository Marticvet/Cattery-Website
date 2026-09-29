import type { SiteSettings } from '@/types/content';
import { getContactMethods, preferredContactMethods, type ContactMethod } from '@/lib/contact';
import { labels } from '@/lib/labels';
import { Button, Container, Eyebrow } from './ui';
import { Icon } from './Icon';
export function ContactAnchor({
  method,
  children,
  className,
}: {
  method: ContactMethod;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={method.href}
      className={className}
      {...(method.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children || method.label}
    </a>
  );
}
export function SocialLinks({ settings }: { settings: SiteSettings }) {
  const methods = getContactMethods(settings).filter((method) =>
    ['instagram', 'facebook', 'tiktok'].includes(method.kind),
  );
  return methods.length ? (
    <ul className="social-links">
      {methods.map((method) => (
        <li key={method.kind}>
          <ContactAnchor method={method}>
            {method.label}
            <Icon name="external" />
          </ContactAnchor>
        </li>
      ))}
    </ul>
  ) : null;
}
export function ContactMethods({ settings }: { settings: SiteSettings }) {
  const methods = getContactMethods(settings);
  return methods.length ? (
    <div className="contact-methods">
      {methods.map((method) => (
        <ContactAnchor className="contact-method" key={method.kind} method={method}>
          <div className="contact-method-label">
            <span className="eyebrow">{method.label}</span>
            <Icon
              name={
                method.kind === 'email'
                  ? 'mail'
                  : method.kind === 'phone'
                    ? 'phone'
                    : method.kind === 'whatsapp'
                      ? 'message'
                      : 'external'
              }
            />
          </div>
          <h2>
            {method.kind === 'email' || method.kind === 'phone' ? method.value : method.label}
          </h2>
          {method.kind !== 'email' && method.kind !== 'phone' && <p>{method.value}</p>}
          <span className="text-link">
            {method.action}
            <Icon />
          </span>
        </ContactAnchor>
      ))}
    </div>
  ) : (
    <p className="contact-unavailable">{labels.contactFallback}</p>
  );
}
export function ContactCTA({
  settings,
  heading,
  description,
  message,
}: {
  settings: SiteSettings;
  heading?: string;
  description?: string;
  message?: string;
}) {
  const methods = preferredContactMethods(settings, message).slice(0, 2);
  if (!getContactMethods(settings).length) return null;
  return (
    <section className="contact-cta">
      <Container>
        <Eyebrow>Interested in a kitten?</Eyebrow>
        <h2>{heading || labels.contactCTA}</h2>
        <p>{description || labels.contactCTADescription}</p>
        <div className="button-row">
          {methods.length ? (
            methods.map((method, index) => (
              <Button href={method.href} key={method.kind} secondary={index > 0}>
                {method.action}
              </Button>
            ))
          ) : (
            <Button href="/contact">Get in touch</Button>
          )}
        </div>
      </Container>
    </section>
  );
}
