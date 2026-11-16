import type { Metadata } from 'next';
import { Fraunces, Inter_Tight } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['opsz'],
  style: ['normal', 'italic'],
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'St John the Evangelist, Caol & St Mary & St Finnan, Glenfinnan',
  description:
    'The parishes of St John the Evangelist, Caol and St Mary and St Finnan, Glenfinnan, in the Diocese of Argyll and the Isles, Scottish Highlands.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${interTight.variable}`}>
      <body className="font-sans bg-ivory text-ink antialiased">
        <AuthProvider>
          <div className="flex flex-col min-h-screen relative">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
