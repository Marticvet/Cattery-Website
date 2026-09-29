import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { siteUrl } from '@/lib/metadata';
import './globals.css';
const serif = localFont({
  src: [
    {
      path: '../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-editorial',
  display: 'swap',
});
const sans = localFont({
  src: [
    {
      path: '../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-ui',
  display: 'swap',
});
export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: 'Our Cattery',
  icons: { icon: '/icon.svg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
