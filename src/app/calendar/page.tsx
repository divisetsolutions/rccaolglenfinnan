'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

export default function CalendarPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Parish Calendar
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Upcoming events and activities in our parishes.
        </p>
        <div className="w-full">
          <FullCalendar
            plugins={[dayGridPlugin, googleCalendarPlugin]}
            initialView="dayGridMonth"
            googleCalendarApiKey={process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}
            events={{
              googleCalendarId: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID,
            }}
          />
        </div>
      </div>
    </section>
  );
}
