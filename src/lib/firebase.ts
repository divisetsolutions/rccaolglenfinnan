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
  const newslettersRef = collection(db, 'newsletters');
  const q = query(newslettersRef, orderBy('issueDate', 'desc'), limit(1));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    const data = doc.data();

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
  return null;
}

export async function getLatestHomily() {
  const newsRef = collection(db, 'news');
  const q = query(newsRef, where('type', '==', 'homily'), orderBy('createdAt', 'desc'), limit(1));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    if (data.createdAt && data.createdAt.toDate) {
      data.createdAt = data.createdAt.toDate().toISOString();
    }
    return { slug: doc.id, ...data };
  }
  return null;
}

export async function getArticle(slug: string) {
  const docRef = doc(db, 'news', slug);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}

export { app, db, auth, storage };
