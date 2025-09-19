import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prayer Requests',
  description: 'Submit a prayer request to our parish community.',
};

export default function PrayerRequestsPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Prayer Requests
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Our parish community is here to pray for you. Please submit your prayer requests below. All requests are confidential.
        </p>
      </div>
      <div className="max-w-[700px]">
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name (optional)</label>
            <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (optional)</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border--gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="request" className="block text-sm font-medium text-gray-700">Prayer Request</label>
            <textarea id="request" name="request" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required></textarea>
          </div>
          <div>
            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Submit Request
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">
          Please note: This form is for submitting prayer requests only. At this time, the form is a placeholder and does not send emails or store requests. This functionality will be added in the future.
        </p>
      </div>
    </section>
  );
}