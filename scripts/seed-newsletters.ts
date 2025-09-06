import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// IMPORTANT: Replace with your service account key
const serviceAccount = require('../.serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const newsletters = [
  {
    title: 'Newsletter - 5th Sunday of Lent',
    issueDate: new Date('2025-03-30T10:00:00Z'),
    fileUrl: 'gs://rccaolglenfinnan-prod.appspot.com/newsletters/sample-newsletter-1.pdf',
    parishTags: ['caol', 'glenfinnan']
  },
  {
    title: 'Newsletter - Palm Sunday',
    issueDate: new Date('2025-04-06T10:00:00Z'),
    fileUrl: 'gs://rccaolglenfinnan-prod.appspot.com/newsletters/sample-newsletter-2.pdf',
    parishTags: ['caol', 'glenfinnan']
  }
];

async function seedNewsletters() {
  for (const newsletter of newsletters) {
    await db.collection('newsletters').add(newsletter);
    console.log(`Seeded newsletter: ${newsletter.title}`);
  }
}

seedNewsletters().then(() => {
  console.log('Newsletter seeding complete.');
  process.exit(0);
}).catch((error) => {
  console.error('Error seeding newsletters:', error);
  process.exit(1);
});
