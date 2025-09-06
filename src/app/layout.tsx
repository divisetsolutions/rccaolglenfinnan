import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { MainNav } from '@/components/MainNav';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <header className="bg-gray-100 p-4">
              <div className="container mx-auto flex justify-between items-center">
                <p className="font-bold">RCCAOL Glenfinnan</p>
                <MainNav />
              </div>
            </header>
            <main className="flex-grow p-4">
              {children}
            </main>
            <footer className="bg-gray-100 p-4 text-center">
              <p>&copy; {new Date().getFullYear()} RCCAOL Glenfinnan</p>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
