import { MetadataRoute } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rccaolglenfinnan.org.uk';

  // Get all news articles
  const newsSnapshot = await getDocs(collection(db, 'news'));
  const newsUrls = newsSnapshot.docs.map((doc) => ({
    url: `${baseUrl}/news/${doc.data().slug}`,
    lastModified: new Date(),
  }));

  // Get all parishes
  const parishes = ['caol', 'glenfinnan'];
  const parishUrls = parishes.map((parish) => ({
    url: `${baseUrl}/${parish}`,
    lastModified: new Date(),
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/newsletters`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sacraments`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
  ];

  return [...staticUrls, ...newsUrls, ...parishUrls];
}
