import type { Metadata } from 'next';
import { Lora, Lato } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: 'RCCAOL Glenfinnan',
  description: 'The official website of the Roman Catholic parishes of St John the Evangelist, Caol and St Mary & St Finnan, Glenfinnan.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${lato.variable}`}>
      <body>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <header className="bg-gray-100 p-4">
              <div className="mx-auto flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">Welcome to the Parishes of Caol and Glenfinnan</p>
                  <p className="text-base text-muted-foreground">Serving St John the Evangelist Church, Caol & St Mary & St Finnan Church, Glenfinnan</p>
                </div>
                <MainNav />
              </div>
            </header>
            <main className="flex-grow p-4">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
