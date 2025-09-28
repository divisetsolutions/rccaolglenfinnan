'use client';

import Link from 'next/link';
import withAuth from '@/components/withAuth';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Newspaper, Calendar, ImageIcon, Mail } from 'lucide-react';

const adminSections = [
  {
    href: '/admin/news',
    icon: Newspaper,
    title: 'Manage News & Events',
    description: 'Create, edit, and delete news articles, events, and homilies.',
  },
  {
    href: '/admin/schedule',
    icon: Calendar,
    title: 'Manage Schedule',
    description: 'Update Mass times, confessions, and other scheduled events.',
  },
  {
    href: '/admin/gallery',
    icon: ImageIcon,
    title: 'Manage Gallery',
    description: 'Upload and organize photos in the parish galleries.',
  },
  {
    href: '/admin/newsletters',
    icon: Mail,
    title: 'Manage Newsletters',
    description: 'Upload and manage the weekly parish newsletters.',
  },
];

function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.displayName || 'Admin'}!</h1>
        <p className="text-muted-foreground">
          Select a section below to manage the website content.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {adminSections.map((section) => (
          <Link href={section.href} key={section.href}>
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <section.icon className="h-8 w-8 text-muted-foreground" />
                  <CardTitle>{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{section.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default withAuth(AdminDashboard);
