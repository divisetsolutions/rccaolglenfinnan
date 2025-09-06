'use client';

import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface ScheduleItem {
  id: string;
  title: string;
  dayOfWeek: string;
  time: string;
  parishId: string;
}

export function Schedule({ parishId }: { parishId: string }) {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const scheduleCollection = collection(db, 'schedule');
      const q = query(
        scheduleCollection,
        where('isActive', '==', true),
        where('parishId', '==', parishId),
        orderBy('dayOfWeek')
      );
      const scheduleSnapshot = await getDocs(q);
      const scheduleList = scheduleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ScheduleItem[];
      setSchedule(scheduleList);
    };

    fetchSchedule();
  }, [parishId]);

  return (
    <div className="grid gap-4">
      {schedule.map(item => (
        <div key={item.id} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="text-muted-foreground">{item.dayOfWeek} at {item.time}</p>
        </div>
      ))}
    </div>
  );
}
