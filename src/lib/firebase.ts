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

// Define the schedule item interface
interface ScheduleItem {
  id: string;
  dayOfWeek: string;
  time: string;
  specialDate?: string;
  date?: Date; // Added for recurring events
  [key: string]: unknown; // Index signature for other properties
}

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

export async function getSchedule(): Promise<ScheduleItem[]> {
  const scheduleRef = collection(db, 'schedule');
  const q = query(scheduleRef, orderBy('time'));
  const querySnapshot = await getDocs(q);
  const schedule = querySnapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data(),
    } as ScheduleItem;
  });
  return schedule;
}

export async function getNextService(): Promise<ScheduleItem | null> {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  // 1. Find the next special event
  const specialEventsQuery = query(
    collection(db, 'schedule'),
    where('specialDate', '>=', todayStr),
    orderBy('specialDate'),
    orderBy('time'),
    limit(1)
  );
  const specialEventsSnapshot = await getDocs(specialEventsQuery);
  const nextSpecialEvent = specialEventsSnapshot.docs.length > 0
    ? { id: specialEventsSnapshot.docs[0].id, ...specialEventsSnapshot.docs[0].data() } as ScheduleItem
    : null;

  // 2. Find the next recurring event
  const schedule = await getSchedule();
  const daysOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = now.getDay();
  const currentTime = now.getHours() * 100 + now.getMinutes();

  let nextRecurringEvent: ScheduleItem | null = null;

  for (let i = 0; i < 7; i++) {
    const dayIndex = (currentDay + i) % 7;
    const dayName = daysOrder[dayIndex];

    const servicesForDay = schedule
      .filter(s => s.dayOfWeek === dayName && !s.specialDate)
      .sort((a, b) => parseInt(a.time.replace(':', '')) - parseInt(b.time.replace(':', '')));

    for (const service of servicesForDay) {
      const serviceTime = parseInt(service.time.replace(':', ''));
      if (i === 0) { // Today
        if (serviceTime > currentTime) {
          nextRecurringEvent = service;
          break;
        }
      } else { // Future day
        nextRecurringEvent = service;
        break;
      }
    }

    if (nextRecurringEvent) {
      const nextDate = new Date();
      nextDate.setDate(now.getDate() + i);
      nextRecurringEvent.date = nextDate;
      break;
    }
  }
  
  // 3. Compare and return the soonest event
  if (nextSpecialEvent && nextRecurringEvent && nextRecurringEvent.date) {
    const specialEventDate = new Date(`${nextSpecialEvent.specialDate}T${nextSpecialEvent.time}`);
    if (specialEventDate < nextRecurringEvent.date) {
      return nextSpecialEvent;
    } else {
      return nextRecurringEvent;
    }
  }

  return nextSpecialEvent || nextRecurringEvent;
}

const timeStringToMinutes = (timeStr: string): number => {
  if (!timeStr) return 0;
  const upperTime = timeStr.toUpperCase();
  const isPM = upperTime.includes('PM');
  
  const [hoursStr, minutesStr] = upperTime.replace('AM', '').replace('PM', '').trim().split(':');
  let hours = parseInt(hoursStr);
  let minutes = parseInt(minutesStr);

  if (isNaN(hours)) hours = 0;
  if (isNaN(minutes)) minutes = 0;

  if (isPM && hours < 12) {
    hours += 12;
  }
  if (!isPM && hours === 12) { // Handle 12 AM (midnight)
    hours = 0;
  }

  return hours * 60 + minutes;
};

export async function getServicesForNextServiceDay(): Promise<ScheduleItem[]> {
  const nextService = await getNextService();

  if (!nextService) {
    return [];
  }

  let servicesForDay: ScheduleItem[] = [];

  if (nextService.specialDate) {
    // It's a special event day
    const q = query(
      collection(db, 'schedule'),
      where('specialDate', '==', nextService.specialDate)
    );
    const querySnapshot = await getDocs(q);
    servicesForDay = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ScheduleItem));
  } else if (nextService.date) {
    // It's a recurring event day
    const daysOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = daysOrder[nextService.date.getDay()];
    
    const schedule = await getSchedule();
    servicesForDay = schedule.filter(s => s.dayOfWeek === dayName && !s.specialDate);
    
    // Add the correct date to each service for this day
    servicesForDay.forEach(s => s.date = nextService.date);
  }

  // Sort the services by time
  return servicesForDay.sort((a, b) => timeStringToMinutes(a.time) - timeStringToMinutes(b.time));
}


export { app, db, auth, storage };
