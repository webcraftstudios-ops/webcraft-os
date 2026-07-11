import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Darts Live Camera Support',
  description: 'TV-readable darts scoreboard prototype.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="https://docs.opencv.org/4.8.0/opencv.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
