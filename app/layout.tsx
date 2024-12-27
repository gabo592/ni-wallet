import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import React from 'react';

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
  description: 'App web dedicada a la administración de finanzas personales.',
  applicationName: 'Ni Wallet',
  generator: 'Next.js',
  keywords: ['finanzas', 'personales', 'app', 'web', 'administración'],
  referrer: 'no-referrer-when-downgrade',
  creator: 'Ni Wallet',
  publisher: 'Vercel',
  icons: [
    { rel: 'apple-touch-icon', sizes: '57x57', url: '/images/apple-icon-57x57.png' },
    { rel: 'apple-touch-icon', sizes: '60x60', url: '/images/apple-icon-60x60.png' },
    { rel: 'apple-touch-icon', sizes: '72x72', url: '/images/apple-icon-72x72.png' },
    { rel: 'apple-touch-icon', sizes: '76x76', url: '/images/apple-icon-76x76.png' },
    { rel: 'apple-touch-icon', sizes: '114x114', url: '/images/apple-icon-114x114.png' },
    { rel: 'apple-touch-icon', sizes: '120x120', url: '/images/apple-icon-120x120.png' },
    { rel: 'apple-touch-icon', sizes: '144x144', url: '/images/apple-icon-144x144.png' },
    { rel: 'apple-touch-icon', sizes: '152x152', url: '/images/apple-icon-57x57.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/images/apple-icon-180x180.png' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', url: '/images/android-icon-192x192.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/images/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '96x96', url: '/images/favicon-96x96.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/images/favicon-16x16.png' },
  ],
  manifest: '/docs/manifest.json',
  formatDetection: {
    telephone: true,
    address: true,
    date: true,
    email: true,
    url: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
