'use client';

import { useState, useEffect } from 'react';
import { getNextService } from '@/lib/firebase';
import { Calendar, Clock, MapPin } from 'lucide-react';

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
  const [nextService, setNextService] = useState<ScheduleItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNextService = async () => {
      try {
        const service = await getNextService();
        setNextService(service as ScheduleItem | null);
      } catch (error) {
        console.error("Error fetching next service:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNextService();
  }, []);

  const formatDate = (service: ScheduleItem) => {
    if (service.specialDate) {
      const [year, month, day] = service.specialDate.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    if (service.date) {
        return service.date.toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
    return service.dayOfWeek;
  };

  return (
    <section className="bg-blue-900 text-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Next Service</h2>
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-blue-800 rounded w-3/4 mx-auto"></div>
            <div className="h-6 bg-blue-800 rounded w-1/2 mx-auto mt-4"></div>
          </div>
        ) : nextService ? (
          <div className="bg-white/10 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-4xl font-bold text-yellow-400 mb-4">{nextService.title}</h3>
            <div className="flex items-center justify-center space-x-6 text-xl">
              <div className="flex items-center">
                <MapPin className="mr-2" />
                <span>{nextService.parishId === 'caol' ? "St. John's, Caol" : "St. Mary & St. Finnan's, Glenfinnan"}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2" />
                <span>{formatDate(nextService)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2" />
                <span>{nextService.time}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xl">Details of the next service will be available soon.</p>
        )}
      </div>
    </section>
  );
};

export default NextService;
