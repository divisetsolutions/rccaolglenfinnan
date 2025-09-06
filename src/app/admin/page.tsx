'use client';

import withAuth from '@/components/withAuth';

function AdminDashboard() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Admin Dashboard
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Welcome to the admin dashboard. Here you can manage the website content.
        </p>
      </div>
    </section>
  );
}

export default withAuth(AdminDashboard);
