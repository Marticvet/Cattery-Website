export function formatDate(
  value?: string,
  options?: Intl.DateTimeFormatOptions,
): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
    ...options,
  }).format(date);
}
export function safeHref(value?: string, internalOnly = false): string | undefined {
  if (!value) return undefined;
  if (/^\/(?!\/|\\)/.test(value) && !/[\\\u0000-\u001f]/.test(value)) return value;
  if (internalOnly) return undefined;
  try {
    const url = new URL(value);
    return ['https:', 'http:', 'mailto:', 'tel:'].includes(url.protocol) ? value : undefined;
  } catch {
    return undefined;
  }
}
export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}
export function plainText(blocks?: import('@/types/content').RichText): string {
  return (blocks ?? [])
    .flatMap((block) =>
      block._type === 'block' && 'children' in block
        ? block.children.map((child) => child.text).join('')
        : [],
    )
    .join(' ')
    .trim();
}
