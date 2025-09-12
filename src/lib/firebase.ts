import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, getDocs, where, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export async function getLatestNewsletter() {
  console.log('Fetching latest newsletter...');
  try {
    const newslettersRef = collection(db, 'newsletters');
    const q = query(newslettersRef, orderBy('issueDate', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      console.log('Latest newsletter data:', data);

      if (data.issueDate && data.issueDate.toDate) {
        data.issueDate = data.issueDate.toDate().toISOString();
      }

      if (data.fileUrl) {
        try {
          const downloadUrl = await getDownloadURL(ref(storage, data.fileUrl));
          data.downloadUrl = downloadUrl;
        } catch (error) {
          console.error("Error getting download URL:", error);
          data.downloadUrl = null;
        }
      }

      return data;
    }
    console.log('No newsletters found.');
    return null;
  } catch (error) {
    console.error('Error fetching latest newsletter:', error);
    return null;
  }
}

export async function getLatestHomily() {
  console.log('Fetching latest homily...');
  try {
    const newsRef = collection(db, 'news');
    const q = query(newsRef, where('type', '==', 'homily'), orderBy('createdAt', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      console.log('Latest homily data:', data);
      if (data.createdAt && data.createdAt.toDate) {
        data.createdAt = data.createdAt.toDate().toISOString();
      }
      return { slug: doc.id, ...data };
    }
    console.log('No homilies found.');
    return null;
  } catch (error) {
    console.error('Error fetching latest homily:', error);
    return null;
  }
}

export async function getArticle(slug: string) {
  const docRef = doc(db, 'news', slug);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}

export async function getSchedule() {
  const scheduleRef = collection(db, 'schedule');
  const q = query(scheduleRef, orderBy('time'));
  const querySnapshot = await getDocs(q);
  const schedule = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data
    };
  });
  return schedule;
}

export { app, db, auth, storage };
