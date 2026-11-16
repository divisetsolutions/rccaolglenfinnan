// Server-side reads from the parish database. Every function fails soft:
// a database problem shows an empty section, never a broken page.

import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { ScheduleItem } from '@/lib/schedule';

export interface Article {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  featuredImageUrl?: string;
  type?: 'news' | 'event' | 'homily' | string;
  status?: string;
  date: string | null;
  eventLocation?: string;
}

export interface Newsletter {
  id: string;
  title: string;
  fileUrl?: string;
  date: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toIso = (v: any): string | null => {
  if (!v) return null;
  if (typeof v === 'string') return v;
  if (typeof v.toDate === 'function') return v.toDate().toISOString();
  if (typeof v.seconds === 'number') return new Date(v.seconds * 1000).toISOString();
  return null;
};

const usableImage = (url?: string) => (url && !url.includes('via.placeholder.com') ? url : undefined);

export async function getSchedule(): Promise<ScheduleItem[]> {
  try {
    const snap = await getDocs(collection(db, 'schedule'));
    return snap.docs.map((d) => {
      const x = d.data();
      return {
        id: d.id,
        title: x.title ?? '',
        dayOfWeek: x.dayOfWeek ?? '',
        time: x.time ?? '',
        parishId: x.parishId ?? 'caol',
        type: x.type ?? '',
        notes: x.notes ?? '',
        specialDate: x.specialDate || null,
        replaces: x.replaces === true,
      };
    });
  } catch (error) {
    console.error('Could not load the schedule:', error);
    return [];
  }
}

export async function getArticles(kind: 'news' | 'homily'): Promise<Article[]> {
  try {
    const snap = await getDocs(query(collection(db, 'news'), orderBy('createdAt', 'desc')));
    return snap.docs
      .map((d) => {
        const x = d.data();
        return {
          id: d.id,
          title: x.title ?? 'Untitled',
          excerpt: x.excerpt ?? '',
          featuredImageUrl: usableImage(x.featuredImageUrl),
          type: x.type ?? 'news',
          status: x.status ?? 'published',
          date: toIso(x.createdAt),
          eventLocation: x.eventLocation ?? '',
        } as Article;
      })
      .filter((a) => a.status === 'published')
      .filter((a) => (kind === 'homily' ? a.type === 'homily' : a.type !== 'homily'));
  } catch (error) {
    console.error('Could not load articles:', error);
    return [];
  }
}

export async function getArticle(id: string): Promise<Article | null> {
  try {
    const snap = await getDoc(doc(db, 'news', id));
    if (!snap.exists()) return null;
    const x = snap.data();
    return {
      id: snap.id,
      title: x.title ?? 'Untitled',
      excerpt: x.excerpt ?? '',
      content: x.content ?? '',
      featuredImageUrl: usableImage(x.featuredImageUrl),
      type: x.type ?? 'news',
      status: x.status ?? 'published',
      date: toIso(x.createdAt),
      eventLocation: x.eventLocation ?? '',
    };
  } catch (error) {
    console.error('Could not load the article:', error);
    return null;
  }
}

export async function getNewsletters(): Promise<Newsletter[]> {
  try {
    const snap = await getDocs(query(collection(db, 'newsletters'), orderBy('issueDate', 'desc')));
    return snap.docs.map((d) => {
      const x = d.data();
      return { id: d.id, title: x.title ?? 'Parish newsletter', fileUrl: x.fileUrl, date: toIso(x.issueDate) };
    });
  } catch (error) {
    console.error('Could not load newsletters:', error);
    return [];
  }
}

export const longDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/London' }) : '';
