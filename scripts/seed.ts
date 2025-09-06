import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// IMPORTANT: Replace with your service account key
// You can generate this in the Firebase console
const serviceAccount = require('../.serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const parishes = [
  {
    id: 'caol',
    name: 'St. John the Evangelist',
    shortName: 'Caol',
    address: 'St. John\'s Road, Caol, PH33 7PR',
    contactInfo: {
      email: 'stjohnscaol@rcdai.org.uk',
      phone: '01397 123456'
    },
    aboutContent: '<p>Welcome to the parish of St. John the Evangelist in Caol.</p>',
    clergyInfo: '<p>Our parish priest is Fr. John Smith.</p>'
  },
  {
    id: 'glenfinnan',
    name: 'St. Mary & St. Finnan',
    shortName: 'Glenfinnan',
    address: 'Glenfinnan, PH37 4LT',
    contactInfo: {
      email: 'stmarystfinnan@rcdai.org.uk',
      phone: '01397 123456'
    },
    aboutContent: '<p>Welcome to the parish of St. Mary & St. Finnan in Glenfinnan.</p>',
    clergyInfo: '<p>Our parish priest is Fr. John Smith.</p>'
  }
];

async function seedDatabase() {
  for (const parish of parishes) {
    await db.collection('parishes').doc(parish.id).set(parish);
    console.log(`Seeded parish: ${parish.name}`);
  }
}

seedDatabase().then(() => {
  console.log('Database seeding complete.');
  process.exit(0);
}).catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
