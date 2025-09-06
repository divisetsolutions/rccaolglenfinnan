'use client';

import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface ScheduleItem {
  id: string;
  title: string;
  dayOfWeek: string;
  time: string;
  parishId: string;
}

export default function AdminSchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [title, setTitle] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('Sunday');
  const [time, setTime] = useState('');
  const [parishId, setParishId] = useState('caol');

  const fetchSchedule = async () => {
    const scheduleCollection = collection(db, 'schedule');
    const q = query(scheduleCollection, orderBy('dayOfWeek'));
    const scheduleSnapshot = await getDocs(q);
    const scheduleList = scheduleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ScheduleItem[];
    setSchedule(scheduleList);
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addDoc(collection(db, 'schedule'), {
      title,
      dayOfWeek,
      time,
      parishId,
      isActive: true,
      type: 'mass',
    });

    setTitle('');
    setTime('');
    fetchSchedule();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteDoc(doc(db, 'schedule', id));
      fetchSchedule();
    }
  };

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Manage Schedule
        </h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          {/* Form for adding new schedule items */}
        </form>
      </div>
      <div className="grid gap-4">
        {schedule.map(item => (
          <div key={item.id} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.dayOfWeek} at {item.time} in {item.parishId}</p>
            </div>
            <div>
              <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
