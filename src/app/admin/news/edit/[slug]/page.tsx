'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function EditNewsArticlePage({ params }: { params: { slug: string } }) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
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
    await updateDoc(docRef, {
      title,
      excerpt,
      content,
      updatedAt: new Date(),
    });

    // Redirect to the news list
    window.location.href = '/admin/news';
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
            <label htmlFor="excerpt" className="block text-sm font-bold mb-2">Excerpt</label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
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