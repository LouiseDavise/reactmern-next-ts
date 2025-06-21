import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ReactMERN App',
  description: 'Full-stack app using Next.js + MongoDB',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
