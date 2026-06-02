import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Run Rate Tracker | Legal Ops Demand Planning',
  description: 'Immigration case demand planning dashboard for the Google account',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
