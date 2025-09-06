'use client';

import { db, storage } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useEffect, useState } from 'react';

interface Newsletter {
  id: string;
  title: string;
  fileUrl: string;
}

export default function AdminNewslettersPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const fetchNewsletters = async () => {
    const newslettersCollection = collection(db, 'newsletters');
    const q = query(newslettersCollection, orderBy('issueDate', 'desc'));
    const newslettersSnapshot = await getDocs(q);
    const newslettersList = newslettersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Newsletter[];
    setNewsletters(newslettersList);
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const storageRef = ref(storage, `newsletters/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    await addDoc(collection(db, 'newsletters'), {
      title,
      fileUrl: downloadURL,
      issueDate: new Date(),
      parishTags: ['caol', 'glenfinnan'],
    });

    setTitle('');
    setFile(null);
    fetchNewsletters();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this newsletter?')) {
      await deleteDoc(doc(db, 'newsletters', id));
      fetchNewsletters();
    }
  };

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Manage Newsletters
        </h1>
        <form onSubmit={handleUpload} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-bold mb-2">File</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upload Newsletter
          </button>
        </form>
      </div>
      <div className="grid gap-4">
        {newsletters.map(newsletter => (
          <div key={newsletter.id} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{newsletter.title}</h3>
            </div>
            <div>
              <a href={newsletter.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mr-4">View</a>
              <button onClick={() => handleDelete(newsletter.id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
