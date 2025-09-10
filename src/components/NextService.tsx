'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface ScheduleItem {
  id: string;
  title: string;
  dayOfWeek: string;
  time: string;
  parishId: string;
}

const NextService = () => {
  const [nextService, setNextService] = useState<ScheduleItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const scheduleCollection = collection(db, 'schedule');
        const q = query(scheduleCollection, orderBy('dayOfWeek'), orderBy('time'));
        const scheduleSnapshot = await getDocs(q);
        const scheduleList = scheduleSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as ScheduleItem[];

        // Logic to determine the next service
        const now = new Date();
        const currentDay = now.getDay(); // Sunday = 0, Monday = 1, etc.
        const currentTime = now.getHours() * 60 + now.getMinutes(); // Time in minutes

        const daysOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let upcomingService: ScheduleItem | null = null;

        // Find next service for the current day
        for (const item of scheduleList) {
          const itemDay = daysOrder.indexOf(item.dayOfWeek);
          const itemTime = parseInt(item.time.split(':')[0]) * 60 + parseInt(item.time.split(':')[1]);

          if (itemDay === currentDay && itemTime > currentTime) {
            upcomingService = item;
            break;
          }
        }

        // If no service today, find for the next day
        if (!upcomingService) {
          for (let i = 1; i < 7; i++) {
            const nextDay = (currentDay + i) % 7;
            for (const item of scheduleList) {
              const itemDay = daysOrder.indexOf(item.dayOfWeek);
              if (itemDay === nextDay) {
                upcomingService = item;
                break;
              }
            }
            if (upcomingService) break;
          }
        }
        
        // If still no service, take the first one of the week
        if (!upcomingService && scheduleList.length > 0) {
            upcomingService = scheduleList[0];
        }

        setNextService(upcomingService);

      } catch (error) {
        console.error("Error fetching schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <section className="bg-blue-900 text-white py-8">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Next Service</h2>
        {loading ? (
          <p>Loading...</p>
        ) : nextService ? (
          <div>
            <p className="text-xl">{nextService.title} at {nextService.parishId}</p>
            <p className="text-lg">{nextService.dayOfWeek} at {nextService.time}</p>
          </div>
        ) : (
          <p>No upcoming services found.</p>
        )}
      </div>
    </section>
  );
};

export default NextService;
