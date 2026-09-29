import type { SiteSettings } from '@/types/content';
import { labels } from './labels';
export type ContactKind = 'email' | 'phone' | 'whatsapp' | 'instagram' | 'facebook' | 'tiktok';
export interface ContactMethod {
  kind: ContactKind;
  label: string;
  value: string;
  action: string;
  href: string;
  external: boolean;
}
export function whatsappUrl(number?: string, message?: string): string | undefined {
  if (!number) return undefined;
  const digits = number.replace(/[^\d]/g, '').replace(/^00/, '');
  if (!/^[1-9]\d{6,14}$/.test(digits)) return undefined;
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}
function socialUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined;
  } catch {
    return undefined;
  }
}
export function kittenMessage(settings: SiteSettings, name: string, litter?: string) {
  const template = settings.whatsappMessageTemplate || labels.interestMessage;
  return template
    .replaceAll('{name}', name)
    .replaceAll('{litter}', litter ? ` from ${litter}` : '');
}
export function getContactMethods(settings: SiteSettings, message?: string): ContactMethod[] {
  const methods: ContactMethod[] = [];
  const email = settings.contactEmail?.trim();
  if (settings.showEmail !== false && email && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email))
    methods.push({
      kind: 'email',
      label: 'Email',
      value: email,
      action: 'Send an email',
      href: `mailto:${email}`,
      external: false,
    });
  const phone = settings.phoneNumber?.trim();
  const normalizedPhone = phone?.replace(/[^\d+]/g, '');
  if (
    settings.showPhone !== false &&
    phone &&
    normalizedPhone &&
    /^\+?\d{7,15}$/.test(normalizedPhone)
  )
    methods.push({
      kind: 'phone',
      label: 'Phone',
      value: phone,
      action: 'Call us',
      href: `tel:${normalizedPhone}`,
      external: false,
    });
  const whatsapp = whatsappUrl(settings.whatsappNumber, message);
  if (settings.showWhatsApp !== false && whatsapp)
    methods.push({
      kind: 'whatsapp',
      label: 'WhatsApp',
      value: 'A friendly conversation, just a message away.',
      action: 'Message on WhatsApp',
      href: whatsapp,
      external: true,
    });
  const socials = [
    ['instagram', 'Instagram', settings.instagramUrl, settings.showInstagram],
    ['facebook', 'Facebook', settings.facebookUrl, settings.showFacebook],
    ['tiktok', 'TikTok', settings.tiktokUrl, settings.showTikTok],
  ] as const;
  for (const [kind, label, value, visible] of socials) {
    const href = socialUrl(value);
    if (visible !== false && href)
      methods.push({
        kind,
        label,
        value: `A little more of our everyday life.`,
        action: `Follow on ${label}`,
        href,
        external: true,
      });
  }
  return methods;
}
export function preferredContactMethods(settings: SiteSettings, message?: string) {
  const methods = getContactMethods(settings, message);
  return (['whatsapp', 'email', 'instagram'] as const).flatMap((kind) =>
    methods.filter((method) => method.kind === kind),
  );
}
