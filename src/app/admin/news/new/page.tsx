'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';
import { db, storage } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function NewNewsArticlePage() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [type, setType] = useState('news');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    immediatelyRender: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editor || !title) {
      alert('Title is required.');
      return;
    }

    const content = editor.getHTML();

    const slug = title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    let featuredImageUrl = '';
    if (imageFile) {
      const imageRef = ref(storage, `news-images/${slug}/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      featuredImageUrl = await getDownloadURL(imageRef);
    }

    interface ArticleData {
      title: string;
      excerpt: string;
      content: string;
      createdAt: Date;
      updatedAt: Date;
      status: string;
      parishTags: string[];
      type: string;
      featuredImageUrl: string;
      eventStartDate?: Date;
      eventEndDate?: Date;
      eventLocation?: string;
    }

    const data: ArticleData = {
      title,
      excerpt,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'published', // Or 'draft'
      parishTags: ['caol'], // Or based on user selection
      type,
      featuredImageUrl,
    };

    if (type === 'event') {
      data.eventStartDate = new Date(eventStartDate);
      data.eventEndDate = new Date(eventEndDate);
      data.eventLocation = eventLocation;
    }

    await setDoc(doc(db, 'news', slug), data);

    // Redirect to the news list
    window.location.href = '/admin/news';
  };

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Create New Article
        </h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="excerpt" className="block text-sm font-bold mb-2">Excerpt</label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-bold mb-2">Type</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="news">News</option>
              <option value="event">Event</option>
              <option value="homily">Homily</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-bold mb-2">Featured Image</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {type === 'event' && (
            <>
              <div className="mb-4">
                <label htmlFor="eventStartDate" className="block text-sm font-bold mb-2">Event Start Date</label>
                <input
                  type="datetime-local"
                  id="eventStartDate"
                  value={eventStartDate}
                  onChange={(e) => setEventStartDate(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="eventEndDate" className="block text-sm font-bold mb-2">Event End Date</label>
                <input
                  type="datetime-local"
                  id="eventEndDate"
                  value={eventEndDate}
                  onChange={(e) => setEventEndDate(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="eventLocation" className="block text-sm font-bold mb-2">Event Location</label>
                <input
                  type="text"
                  id="eventLocation"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Content</label>
            <EditorContent editor={editor} />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Article
          </button>
        </form>
      </div>
    </section>
  );
}
