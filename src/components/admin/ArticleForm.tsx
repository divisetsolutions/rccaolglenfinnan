'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timestamp } from 'firebase/firestore';
import { generateSeoDescription } from '@/lib/gemini';
import { Sparkles } from 'lucide-react';

export interface ArticleFormProps {
  initialData?: Partial<ArticleData>;
  onSubmit: (data: ArticleData, imageFile: File | null) => Promise<void>;
  buttonText: string;
}

export interface ArticleData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: 'published' | 'draft';
  type: 'news' | 'event' | 'homily';
  featuredImageUrl?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  eventStartDate?: Timestamp;
  eventEndDate?: Timestamp;
  eventLocation?: string;
}

export function ArticleForm({ initialData, onSubmit, buttonText }: ArticleFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [type, setType] = useState<ArticleData['type']>(initialData?.type || 'news');
  const [status, setStatus] = useState<ArticleData['status']>(initialData?.status || 'draft');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Event specific fields
  const [eventStartDate, setEventStartDate] = useState(initialData?.eventStartDate?.toDate().toISOString().slice(0, 16) || '');
  const [eventEndDate, setEventEndDate] = useState(initialData?.eventEndDate?.toDate().toISOString().slice(0, 16) || '');
  const [eventLocation, setEventLocation] = useState(initialData?.eventLocation || '');

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialData?.content || '<p>Start writing your article here...</p>',
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert min-h-[300px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      },
    },
  });

  const handleGenerateExcerpt = async () => {
    if (!editor) return;
    setIsGenerating(true);
    try {
      const contentText = editor.getText();
      const generatedExcerpt = await generateSeoDescription(contentText);
      setExcerpt(generatedExcerpt);
    } catch (error) {
      console.error("Failed to generate excerpt:", error);
      alert("Failed to generate excerpt. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editor || !title) {
      alert('Title and content are required.');
      return;
    }
    setIsSubmitting(true);

    const slug = initialData?.slug || title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const content = editor.getHTML();

    const data: ArticleData = {
      title,
      slug,
      excerpt,
      content,
      type,
      status,
      ...(type === 'event' && {
        eventStartDate: Timestamp.fromDate(new Date(eventStartDate)),
        eventEndDate: Timestamp.fromDate(new Date(eventEndDate)),
        eventLocation,
      }),
    };

    try {
      await onSubmit(data, imageFile);
      router.push('/admin/news');
    } catch (error) {
      console.error("Failed to save article:", error);
      alert("An error occurred while saving the article. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your article title" required />
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Button type="button" variant="outline" size="sm" onClick={handleGenerateExcerpt} disabled={isGenerating}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                  </Button>
                </div>
                <Input id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="A short summary of the article" />
              </div>
              <div className="grid gap-2">
                <Label>Content</Label>
                <EditorContent editor={editor} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1 flex flex-col gap-6">
        <Card>
          <CardHeader><CardTitle>Publish</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value: ArticleData['status']) => setStatus(value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : buttonText}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Details</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={(value: ArticleData['type']) => setType(value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="homily">Homily</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Featured Image</Label>
              <Input id="image" type="file" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} />
              {initialData?.featuredImageUrl && !imageFile && (
                <p className="text-sm text-muted-foreground mt-2">Current image is set. Upload a new one to replace it.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {type === 'event' && (
          <Card>
            <CardHeader><CardTitle>Event Details</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="eventStartDate">Start Date & Time</Label>
                <Input id="eventStartDate" type="datetime-local" value={eventStartDate} onChange={(e) => setEventStartDate(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="eventEndDate">End Date & Time</Label>
                <Input id="eventEndDate" type="datetime-local" value={eventEndDate} onChange={(e) => setEventEndDate(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="eventLocation">Location</Label>
                <Input id="eventLocation" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} placeholder="e.g., St. John's Hall" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </form>
  );
}
