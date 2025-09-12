'use client';

import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import withAuth from '@/components/withAuth';

interface ScheduleItem {
  id: string;
  title: string;
  dayOfWeek: string;
  time: string;
  parishId: string;
  specialDate?: string;
  notes?: string;
  type?: string;
}

function AdminSchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [title, setTitle] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('Sunday');
  const [time, setTime] = useState('');
  const [parishId, setParishId] = useState('caol');
  const [specialDate, setSpecialDate] = useState('');
  const [notes, setNotes] = useState('');
  const [type, setType] = useState('mass');
  const [editingId, setEditingId] = useState<string | null>(null);

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

  const handleEdit = (item: ScheduleItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDayOfWeek(item.dayOfWeek);
    setTime(item.time);
    setParishId(item.parishId);
    setSpecialDate(item.specialDate || '');
    setNotes(item.notes || '');
    setType(item.type || 'mass');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setDayOfWeek('Sunday');
    setTime('');
    setParishId('caol');
    setSpecialDate('');
    setNotes('');
    setType('mass');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      title,
      dayOfWeek,
      time,
      parishId,
      specialDate,
      notes,
      type,
      isActive: true,
    };

    if (editingId) {
      await updateDoc(doc(db, 'schedule', editingId), data);
    } else {
      await addDoc(collection(db, 'schedule'), data);
    }

    cancelEdit();
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
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-bold mb-2">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label htmlFor="dayOfWeek" className="block text-sm font-bold mb-2">Day of the Week</label>
            <select id="dayOfWeek" value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-bold mb-2">Time</label>
            <input type="text" id="time" value={time} onChange={(e) => setTime(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="e.g., 10:00" required />
          </div>
          <div className="mb-4">
            <label htmlFor="parishId" className="block text-sm font-bold mb-2">Parish</label>
            <select id="parishId" value={parishId} onChange={(e) => setParishId(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="caol">Caol</option>
              <option value="glenfinnan">Glenfinnan</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="specialDate" className="block text-sm font-bold mb-2">Special Date (optional)</label>
            <input type="date" id="specialDate" value={specialDate} onChange={(e) => setSpecialDate(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="notes" className="block text-sm font-bold mb-2">Notes (optional)</label>
            <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-bold mb-2">Type</label>
            <select id="type" value={type} onChange={(e) => setType(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="mass">Mass</option>
              <option value="adoration">Adoration</option>
              <option value="rosary">Rosary</option>
              <option value="confession">Confession</option>
              <option value="devotion">Devotion</option>
              <option value="service">Service</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {editingId ? 'Update Schedule Item' : 'Add Schedule Item'}
          </button>
          {editingId && <button type="button" onClick={cancelEdit} className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel Edit</button>}
        </form>
      </div>
      <div className="grid gap-4">
        {schedule.map(item => (
          <div key={item.id} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.dayOfWeek} at {item.time} in {item.parishId}</p>
              {item.specialDate && <p className="text-sm text-blue-500">Special Date: {item.specialDate}</p>}
              {item.notes && <p className="text-sm text-gray-600">Notes: {item.notes}</p>}
            </div>
            <div>
              <button onClick={() => handleEdit(item)} className="text-blue-500 hover:underline mr-4">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default withAuth(AdminSchedulePage);