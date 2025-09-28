'use client';

import { useState, useEffect } from 'react';
import { getServicesForNextServiceDay } from '@/lib/firebase';
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
  const [services, setServices] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNextServices = async () => {
      try {
        const serviceList = await getServicesForNextServiceDay();
        setServices(serviceList);
      } catch (error) {
        console.error("Error fetching next services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNextServices();
  }, []);

  const formatDateHeader = (service: ScheduleItem) => {
    const date = service.specialDate
      ? new Date(service.specialDate + 'T00:00:00') // Adjust for timezone issues
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
    <section className="bg-blue-900 text-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Next Services</h2>
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-blue-800 rounded w-3/4 mx-auto"></div>
            <div className="h-6 bg-blue-800 rounded w-1/2 mx-auto mt-4"></div>
          </div>
        ) : services.length > 0 ? (
          <div className="bg-white/10 rounded-lg p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center text-2xl mb-6">
              <Calendar className="mr-3" />
              <h3 className="font-bold text-yellow-400">{formatDateHeader(services[0])}</h3>
            </div>
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="flex items-center justify-between text-xl bg-black/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="mr-3 text-yellow-400" />
                    <span>{service.time}</span>
                  </div>
                  <div className="font-semibold">{service.title}</div>
                  <div className="flex items-center">
                    <MapPin className="mr-2" />
                    <span>{service.parishId === 'caol' ? "St. John's, Caol" : "St. Mary & St. Finnan's, Glenfinnan"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-xl">Details of the next services will be available soon.</p>
        )}
      </div>
    </section>
  );
};

export default NextService;
