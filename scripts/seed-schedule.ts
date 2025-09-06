import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// IMPORTANT: Replace with your service account key
const serviceAccount = require('../.serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const schedule = [
  {
    title: 'Sunday Mass',
    dayOfWeek: 'Sunday',
    time: '11:00',
    parishId: 'caol',
    type: 'mass',
    isActive: true,
    notes: 'All welcome.',
    specialDate: null
  },
  {
    title: 'Weekday Mass',
    dayOfWeek: 'Wednesday',
    time: '10:00',
    parishId: 'glenfinnan',
    type: 'mass',
    isActive: true,
    notes: '',
    specialDate: null
  }
];

async function seedSchedule() {
  for (const item of schedule) {
    await db.collection('schedule').add(item);
    console.log(`Seeded schedule item: ${item.title}`);
  }
}

seedSchedule().then(() => {
  console.log('Schedule seeding complete.');
  process.exit(0);
}).catch((error) => {
  console.error('Error seeding schedule:', error);
  process.exit(1);
});
