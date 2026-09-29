import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from './Icon';
import { isExternal, safeHref } from '@/lib/utils';
export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`container ${className}`}>{children}</div>;
}
export function Section({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`section ${className}`}>
      {children}
    </section>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  link,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {link && <TextLink href={link.href}>{link.label}</TextLink>}
    </div>
  );
}
export function Button({
  children,
  href,
  secondary = false,
  className = '',
}: {
  children: ReactNode;
  href: string;
  secondary?: boolean;
  className?: string;
}) {
  const safe = safeHref(href);
  if (!safe) return null;
  return (
    <Link
      className={`button ${secondary ? 'button-secondary' : ''} ${className}`}
      href={safe}
      {...(isExternal(safe) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      <Icon />
    </Link>
  );
}
export function TextLink({
  children,
  href,
  className = '',
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  const safe = safeHref(href);
  if (!safe) return null;
  return (
    <Link
      className={`text-link ${className}`}
      href={safe}
      {...(isExternal(safe) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      <Icon />
    </Link>
  );
}
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <span aria-hidden="true">/</span>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="page-intro">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  );
}
export function EmptyState({
  title,
  description,
  contact = false,
  headingLevel = 2,
}: {
  title: string;
  description?: string;
  contact?: boolean;
  headingLevel?: 1 | 2;
}) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2';
  return (
    <div className="empty-state">
      <span className="empty-rule" />
      <Heading>{title}</Heading>
      {description && <p>{description}</p>}
      {contact && <TextLink href="/contact">Get in touch</TextLink>}
    </div>
  );
}
export function Facts({ items }: { items: { label: string; value?: ReactNode }[] }) {
  const visible = items.filter(
    (item) => item.value !== undefined && item.value !== null && item.value !== '',
  );
  return visible.length ? (
    <dl className="facts">
      {visible.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  ) : null;
}
