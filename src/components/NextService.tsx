'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getServicesForNextServiceDay } from '@/lib/firebase';

interface ScheduleItem {
  id: string;
  title: string;
  dayOfWeek?: string;
  time: string;
  parishId: string;
  specialDate?: string;
  date?: Date;
}

const NextService = () => {
  const [services, setServices] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNextServices = async () => {
      try {
        const serviceList = await getServicesForNextServiceDay();
        setServices(serviceList);
      } catch (error) {
        console.error('Error fetching next services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNextServices();
  }, []);

  const formatDateHeader = (service: ScheduleItem) => {
    const date = service.specialDate
      ? new Date(service.specialDate + 'T00:00:00')
      : service.date;
    if (!date) return null;
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="relative bg-navy-deep py-[72px] md:py-[108px] overflow-hidden">
      {/* Decorative gold rules */}
      <div className="absolute inset-x-0 top-0 h-px bg-gold/30" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gold/30" />

      <div className="mx-auto max-w-[1100px] px-6">
        <div className="text-center mb-9">
          <h2 className="font-display text-ivory text-[clamp(2rem,4vw,3rem)] tracking-[-0.015em]">
            Next Services
          </h2>
        </div>

        {/* Ivory missal card */}
        <div className="bg-ivory shadow-editorial">
          <div className="p-8 md:p-14">
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-6 w-2/3 mx-auto bg-ivory-soft" />
                <div className="h-px bg-gold/30 my-6" />
                <div className="h-5 bg-ivory-soft" />
                <div className="h-5 bg-ivory-soft" />
                <div className="h-5 bg-ivory-soft" />
              </div>
            ) : services.length > 0 ? (
              <>
                <div className="text-center">
                  <p className="smallcaps text-stone">For the day of</p>
                  <h3 className="mt-2 font-display text-navy text-[clamp(1.5rem,3vw,2.2rem)] tracking-tight">
                    {formatDateHeader(services[0])}
                  </h3>
                </div>

                <div className="mt-10 hidden md:grid grid-cols-[120px_1fr_auto] gap-6 pb-3 border-b border-gold/40 smallcaps text-stone">
                  <span>Time</span>
                  <span>Service</span>
                  <span>Church</span>
                </div>

                <ul className="mt-2 divide-y divide-gold/25">
                  {services.map((service) => (
                    <li
                      key={service.id}
                      className="grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-2 md:gap-6 py-5 items-baseline"
                    >
                      <span className="font-sans tabular-nums text-navy text-[1.5rem] md:text-[1.6rem] tracking-tight">
                        {service.time}
                      </span>
                      <span className="font-display text-navy text-[1.25rem] md:text-[1.4rem] leading-snug">
                        {service.title}
                      </span>
                      <span className="smallcaps text-stone md:text-right">
                        {service.parishId === 'caol'
                          ? "St John's, Caol"
                          : 'St Mary & St Finnan, Glenfinnan'}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="text-center py-10">
                <p className="font-serif italic text-stone text-lg">
                  Details of the next services will be available soon.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/calendar"
            className="smallcaps text-gold hover:text-gold-soft inline-flex items-center gap-2"
          >
            View the full parish calendar
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NextService;
