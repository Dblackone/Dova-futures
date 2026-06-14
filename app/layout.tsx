import type { Metadata, Viewport } from 'next';
// Self-hosted variable fonts (npm). Wired behind --font-display / --font-body
// in globals.css so the real brand fonts can be swapped in later. See the
// FONT ARCHITECTURE comment in app/globals.css.
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/manrope';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { COMPANY } from '@/lib/brand';

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: `${COMPANY.name} — Design · Build · Digital`,
    template: `%s — ${COMPANY.shortName}`,
  },
  description:
    'Dova Futures Limited — architecture, BIM, interior design, landscape, construction, and visualization in Lagos. Built with precision.',
  keywords: [
    'architecture Lagos',
    'BIM Revit Nigeria',
    'interior design Lagos',
    'construction',
    'architectural visualization',
    'Dova Futures',
  ],
  authors: [{ name: COMPANY.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: COMPANY.name,
    title: `${COMPANY.name} — Design · Build · Digital`,
    description:
      'Architecture, BIM, interiors, landscape, construction and visualization in Lagos. Built with precision.',
    url: COMPANY.url,
    locale: 'en_NG',
    images: [
      {
        url: '/images/ado-finished.jpg',
        width: 1600,
        height: 900,
        alt: 'A finished Dova Futures building render.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${COMPANY.name} — Design · Build · Digital`,
    description:
      'Architecture, BIM, interiors, landscape, construction and visualization in Lagos.',
    images: ['/images/ado-finished.jpg'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#F5EFEB',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-charcoal focus:px-5 focus:py-2.5 focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
