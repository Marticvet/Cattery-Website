import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { ContentImage, RichText } from '@/types/content';
import { safeHref, isExternal } from '@/lib/utils';
import { Photo } from './Photo';
const components: PortableTextComponents = {
  types: {
    contentImage: ({ value }: { value: ContentImage }) => (
      <figure>
        <Photo image={value} className="rich-image" sizes="(max-width: 768px) 100vw, 800px" />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
    callout: ({ value }: { value: { title?: string; text?: string } }) => (
      <aside className="callout">
        {value.title && <strong>{value.title}</strong>}
        {value.text && <p>{value.text}</p>}
      </aside>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = safeHref(value?.href);
      return href ? (
        <a
          href={href}
          {...(isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      ) : (
        <>{children}</>
      );
    },
  },
};
export function PortableTextRenderer({ value }: { value?: RichText }) {
  return value?.length ? (
    <div className="prose">
      <PortableText value={value} components={components} />
    </div>
  ) : null;
}
