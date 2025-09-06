import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// IMPORTANT: Replace with your service account key
// You can generate this in the Firebase console
const serviceAccount = require('../.serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const news = [
  {
    title: 'Parish Summer Fete a Great Success',
    slug: 'parish-summer-fete-2025-success',
    content: '<p>The annual parish summer fete was a resounding success, raising over £2,000 for parish funds. A huge thank you to everyone who helped and attended.</p>',
    excerpt: 'A brief summary of the summer fete...',
    authorName: 'Parish Council',
    createdAt: new Date('2025-08-15T10:00:00Z'),
    updatedAt: new Date('2025-08-15T10:00:00Z'),
    status: 'published',
    featuredImageUrl: 'https://via.placeholder.com/800x400',
    parishTags: ['caol', 'glenfinnan']
  },
  {
    title: 'Christmas Mass Times',
    slug: 'christmas-mass-times-2025',
    content: '<p>Please find below the schedule for Christmas Masses...</p>',
    excerpt: 'A list of all the Christmas Mass times for both parishes.',
    authorName: 'Parish Office',
    createdAt: new Date('2025-12-01T14:00:00Z'),
    updatedAt: new Date('2025-12-01T14:00:00Z'),
    status: 'published',
    featuredImageUrl: 'https://via.placeholder.com/800x400',
    parishTags: ['caol', 'glenfinnan']
  }
];

async function seedNews() {
  for (const article of news) {
    await db.collection('news').doc(article.slug).set(article);
    console.log(`Seeded news article: ${article.title}`);
  }
}

seedNews().then(() => {
  console.log('News seeding complete.');
  process.exit(0);
}).catch((error) => {
  console.error('Error seeding news:', error);
  process.exit(1);
});
