'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';

import { generateSeoDescription } from '@/lib/gemini';

export default function EditNewsArticlePage({ params }: { params: { slug: string } }) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [type, setType] = useState('news');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
  });

  useEffect(() => {
    const fetchArticle = async () => {
      const docRef = doc(db, 'news', params.slug);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setExcerpt(data.excerpt);
        setType(data.type || 'news');
        setExistingImageUrl(data.featuredImageUrl || '');
        if (data.type === 'event') {
          setEventStartDate(data.eventStartDate?.toDate().toISOString().slice(0, 16) || '');
          setEventEndDate(data.eventEndDate?.toDate().toISOString().slice(0, 16) || '');
          setEventLocation(data.eventLocation || '');
        }
        if (editor) {
          editor.commands.setContent(data.content);
        }
      }
    };

    fetchArticle();
  }, [params.slug, editor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editor) {
      return;
    }

    const content = editor.getHTML();

    const docRef = doc(db, 'news', params.slug);
    
    let featuredImageUrl = existingImageUrl;
    if (imageFile) {
      const imageRef = ref(storage, `news-images/${params.slug}/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      featuredImageUrl = await getDownloadURL(imageRef);
    }

    interface ArticleData {
      title: string;
      excerpt: string;
      content: string;
      updatedAt: Date;
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
      updatedAt: new Date(),
      type,
      featuredImageUrl,
    };

    if (type === 'event') {
      data.eventStartDate = new Date(eventStartDate);
      data.eventEndDate = new Date(eventEndDate);
      data.eventLocation = eventLocation;
    }

    await updateDoc(docRef, data);

    // Redirect to the news list
    window.location.href = '/admin/news';
  };

  const handleGenerateDescription = async () => {
    if (!editor) {
      return;
    }

    const content = editor.getText(); // Get text version of the content
    setIsGenerating(true);

    try {
      const description = await generateSeoDescription(content);
      setExcerpt(description);
    } catch (error) {
      console.error('Error generating SEO description:', error);
      // Handle error appropriately
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Edit Article
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
            />
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="excerpt" className="block text-sm font-bold">Excerpt</label>
              <button type="button" onClick={handleGenerateDescription} className="text-sm text-blue-500 hover:underline" disabled={isGenerating}>
                {isGenerating ? 'Generating...' : 'Generate SEO Description'}
              </button>
            </div>
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
            {existingImageUrl && (
              <div className="mb-2">
                <Image src={existingImageUrl} alt="Existing featured image" width={200} height={100} className="object-cover" />
              </div>
            )}
            <input
              type="file"
              id="image"
              onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-sm text-gray-600 mt-1">Select a new file to replace the existing image.</p>
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
            Update Article
          </button>
        </form>
      </div>
    </section>
  );
}
