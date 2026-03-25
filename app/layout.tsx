import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ni Wallet',
  description:
    'Ni Wallet es una aplicación de billetera digital que permite a los usuarios gestionar sus finanzas personales de manera segura y eficiente.',
  applicationName: 'Ni Wallet',
  authors: [{ name: 'Gabriel Aviles', url: 'https://github.com/gabo592' }],
  generator: 'Next.js',
  keywords: [
    'billetera digital',
    'finanzas personales',
    'seguridad',
    'eficiencia',
  ],
  referrer: 'no-referrer-when-downgrade',
  creator: 'Gabriel Aviles',
  publisher: 'Vercel',
  icons: [
    {
      rel: 'apple-touch-icon',
      sizes: '57x57',
      url: '/images/apple-icon-57x57.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '60x60',
      url: '/images/apple-icon-60x60.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '72x72',
      url: '/images/apple-icon-72x72.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '76x76',
      url: '/images/apple-icon-76x76.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '114x114',
      url: '/images/apple-icon-114x114.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '120x120',
      url: '/images/apple-icon-120x120.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '144x144',
      url: '/images/apple-icon-144x144.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '152x152',
      url: '/images/apple-icon-152x152.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/images/apple-icon-180x180.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      url: '/images/android-icon-192x192.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/images/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      url: '/images/favicon-96x96.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/images/favicon-16x16.png',
    },
  ],
  manifest: '/docs/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
