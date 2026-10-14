import React from 'react';
import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond as CormorantGaramond, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cinzel',
});

const cormorant = CormorantGaramond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  title: "Samori Roberts's Resume Site",
  description: 'The career of Samori Roberts: software engineer, founder, and builder.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${cinzel.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  );
}
