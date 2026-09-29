'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { labels } from '@/lib/labels';
import { Icon } from './Icon';
function MobileMenu({ onClose, name }: { onClose: () => void; name: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const dialog = ref.current;
    const trigger = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="mobile-menu"
      aria-label="Main navigation"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mobile-menu-top">
        <span className="brand-name">{name}</span>
        <button autoFocus className="icon-button" aria-label="Close navigation" onClick={onClose}>
          <Icon name="close" />
        </button>
      </div>
      <nav aria-label="Mobile navigation">
        <ul>
          {labels.navigation.map((item, index) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                <span className="nav-number">0{index + 1}</span>
                {item.label}
                <Icon />
              </Link>
              {item.href === '/our-cattery' && (
                <div className="mobile-subnav">
                  <Link onClick={onClose} href="/our-cattery/males">
                    Our males
                  </Link>
                  <Link onClick={onClose} href="/our-cattery/females">
                    Our females
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <p className="mobile-menu-note">A little world, built around care.</p>
    </dialog>
  );
}
export function Navigation({ name }: { name: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="desktop-navigation" aria-label="Main navigation">
        <ul>
          {labels.navigation.map((item) => (
            <li
              key={item.href}
              className={item.href === '/our-cattery' ? 'nav-with-children' : undefined}
            >
              <Link
                className="nav-link"
                href={item.href}
                aria-current={
                  (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href))
                    ? 'page'
                    : undefined
                }
              >
                {item.label}
                {item.href === '/our-cattery' && <Icon name="chevron" className="down-chevron" />}
              </Link>
              {item.href === '/our-cattery' && (
                <ul className="desktop-subnav">
                  <li>
                    <Link href="/our-cattery/males">Our males</Link>
                  </li>
                  <li>
                    <Link href="/our-cattery/females">Our females</Link>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <button
        className="icon-button menu-toggle"
        aria-label="Open navigation"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <Icon name="menu" />
      </button>
      {open && <MobileMenu name={name} onClose={() => setOpen(false)} />}
    </>
  );
}
