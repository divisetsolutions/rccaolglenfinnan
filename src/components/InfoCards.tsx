'use client';

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Church, Newspaper, Mail, BookMarked } from "lucide-react";

// Updated and more accurate interfaces
interface Newsletter {
  id: string;
  downloadUrl?: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
}

interface Homily {
  id: string;
  slug?: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
}

interface InfoCardsProps {
  latestNewsletter: Newsletter | null;
  latestHomily: Homily | null;
}

export function InfoCards({ latestNewsletter, latestHomily }: InfoCardsProps) {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/calendar" className="group">
          <Card className="flex flex-col items-center text-center h-full bg-secondary border shadow-md hover:shadow-lg hover:-translate-y-1 transition-all p-6">
            <CardHeader className="p-0 mb-4">
              <div className="bg-primary text-primary-foreground rounded-full p-3">
                <Church className="h-8 w-8" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <CardTitle className="text-xl font-bold mb-2">Mass & Service Times</CardTitle>
              <p className="text-foreground">View the weekly schedule for both parishes.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/news" className="group">
          <Card className="flex flex-col items-center text-center h-full bg-secondary border shadow-md hover:shadow-lg hover:-translate-y-1 transition-all p-6">
            <CardHeader className="p-0 mb-4">
              <div className="bg-primary text-primary-foreground rounded-full p-3">
                <Newspaper className="h-8 w-8" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <CardTitle className="text-xl font-bold mb-2">News & Events</CardTitle>
              <p className="text-foreground">Read the latest announcements and upcoming events.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/newsletters" className="group">
          <Card className="flex flex-col items-center text-center h-full bg-secondary border shadow-md hover:shadow-lg hover:-translate-y-1 transition-all p-6">
            <CardHeader className="p-0 mb-4">
              <div className="bg-primary text-primary-foreground rounded-full p-3">
                <Mail className="h-8 w-8" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <CardTitle className="text-xl font-bold mb-2">Weekly Newsletters</CardTitle>
              <p className="text-foreground underline">Download and read the Parish Newsletters.</p>
              {latestNewsletter && latestNewsletter.downloadUrl && (
                <p className="text-sm text-muted-foreground mt-4">
                  Latest: <a href={latestNewsletter.downloadUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary" onClick={(e) => e.stopPropagation()}>{latestNewsletter.title}</a>
                </p>
              )}
            </CardContent>
          </Card>
        </Link>
        <Link href="/homilies" className="group">
          <Card className="flex flex-col items-center text-center h-full bg-secondary border shadow-md hover:shadow-lg hover:-translate-y-1 transition-all p-6">
            <CardHeader className="p-0 mb-4">
              <div className="bg-primary text-primary-foreground rounded-full p-3">
                <BookMarked className="h-8 w-8" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <CardTitle className="text-xl font-bold mb-2">Sunday Homily</CardTitle>
              <p className="text-foreground underline">Read the Sunday Homilies.</p>
              {latestHomily && (
                <p className="text-sm text-muted-foreground mt-4">
                  Latest: <Link href={`/homilies/${latestHomily.slug}`} className="underline hover:text-primary" onClick={(e) => e.stopPropagation()}>{latestHomily.title}</Link>
                </p>
              )}
            </CardContent>
          </Card>
        </Link>
      </div>
    </section>
  );
}