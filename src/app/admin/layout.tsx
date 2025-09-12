'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/context/AuthContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/news', label: 'News' },
    { href: '/admin/newsletters', label: 'Newsletters' },
    { href: '/admin/gallery', label: 'Gallery' },
    { href: '/admin/schedule', label: 'Schedule' },
  ];

  return (
    <AuthProvider>
      <div className="flex h-screen bg-gray-100">
        <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
          <div className="p-4">
            <h1 className="text-2xl font-bold">Admin</h1>
          </div>
          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <p
                      className={`block p-4 hover:bg-gray-700 ${pathname === item.href ? 'bg-gray-900' : ''}`}>
                      {item.label}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
