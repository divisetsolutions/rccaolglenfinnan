import { getSchedule } from '@/lib/firebase';
import ScheduleCalendar from '@/components/ScheduleCalendar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Parish Calendar',
  description: 'Upcoming events and activities in our parishes.',
};

// Helper to get the next date for a given weekday
const getNextDay = (dayOfWeek: number) => {
  const today = new Date();
  const resultDate = new Date(today.getTime());
  resultDate.setDate(today.getDate() + (dayOfWeek + 7 - today.getDay()) % 7);
  return resultDate;
};

const dayNameToNumber = (dayName: string) => {
  const days: { [key: string]: number } = {
    'Sunday': 0,
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6,
  };
  return days[dayName];
}

const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface ScheduleItem {
  id: string;
  title: string;
  parishId: string;
  dayOfWeek: string;
  time: string;
  notes?: string;
  specialDate?: string;
}

const sortSchedule = (a: ScheduleItem, b: ScheduleItem) => {
  const dayIndexA = dayOrder.indexOf(a.dayOfWeek);
  const dayIndexB = dayOrder.indexOf(b.dayOfWeek);

  if (dayIndexA !== dayIndexB) {
    return dayIndexA - dayIndexB;
  }

  // If days are the same, sort by time
  const timeA = parseInt(a.time.replace(':', ''));
  const timeB = parseInt(b.time.replace(':', ''));
  return timeA - timeB;
};

export default async function CalendarPage() {
  const schedule = await getSchedule();

  const specialEvents = schedule.filter(item => item.specialDate);
  const recurringEvents = schedule.filter(item => !item.specialDate);

  interface CalendarEvent {
  title: string;
  start: string;
  allDay: boolean;
  extendedProps: {
    special?: boolean;
    notes?: string;
  };
}

// ... (keep the existing code until the events array)

  const events: CalendarEvent[] = [
    ...specialEvents.map(item => {
      const [year, month, day] = (item.specialDate as string).split('-');
      const [hours, minutes] = item.time.split(':');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
      return {
        title: `${item.title} (${item.parishId})`,
        start: date.toISOString(),
        allDay: false,
        extendedProps: {
          special: true,
          notes: item.notes,
        }
      };
    }),
    ...recurringEvents.map(item => {
      if (!item.dayOfWeek || !item.time) {
        return null;
      }
      const dayOfWeek = dayNameToNumber(item.dayOfWeek);
      if (dayOfWeek === undefined) {
        return null;
      }

      const nextDate = getNextDay(dayOfWeek);
      const [hours, minutes] = item.time.split(':');
      if (!hours || !minutes) {
        return null;
      }
      nextDate.setHours(parseInt(hours), parseInt(minutes));

      // Check if there is a special event on the same day and parish
      const hasSpecialEvent = specialEvents.some(se => {
        const [year, month, day] = (se.specialDate as string).split('-');
        const specialDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return specialDate.getFullYear() === nextDate.getFullYear() &&
               specialDate.getMonth() === nextDate.getMonth() &&
               specialDate.getDate() === nextDate.getDate() &&
               se.parishId === item.parishId;
      });

      if (hasSpecialEvent) {
        return null;
      }

      return {
        title: `${item.title} (${item.parishId})`,
        start: nextDate.toISOString(),
        allDay: false,
        extendedProps: {
          notes: item.notes,
        }
      };
    }).filter(Boolean) as CalendarEvent[]
  ];

  const renderScheduleList = (parishId: string) => {
    const parishSpecialEvents = specialEvents.filter(item => item.parishId === parishId);
    const parishRecurringEvents = recurringEvents.filter(item => item.parishId === parishId);

    const filteredRecurringEvents = parishRecurringEvents.filter(re => {
      return !parishSpecialEvents.some(se => {
        const dayOfWeek = dayNameToNumber(re.dayOfWeek);
        const nextDate = getNextDay(dayOfWeek);
        const [year, month, day] = (se.specialDate as string).split('-');
        const specialDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return specialDate.getFullYear() === nextDate.getFullYear() &&
               specialDate.getMonth() === nextDate.getMonth() &&
               specialDate.getDate() === nextDate.getDate();
      });
    });

    return (
      <ul className="space-y-2">
        {parishSpecialEvents.map(item => (
          <li key={item.id} className="p-4 bg-blue-100 rounded-lg">
            <p className="font-bold">{item.title}</p>
            <p>{item.specialDate} at {item.time}</p>
            {item.notes && <p className="text-sm text-gray-600">{item.notes}</p>}
          </li>
        ))}
        {filteredRecurringEvents.sort(sortSchedule).map(item => (
          <li key={item.id} className="p-4 bg-gray-100 rounded-lg">
            <p className="font-bold">{item.title}</p>
            <p>{item.dayOfWeek} at {item.time}</p>
            {item.notes && <p className="text-sm text-gray-600">{item.notes}</p>}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Parish Calendar
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Upcoming events and activities in our parishes.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold mb-4">St. John&apos;s, Caol</h2>
          {renderScheduleList('caol')}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">St. Mary & St. Finnan&apos;s, Glenfinnan</h2>
          {renderScheduleList('glenfinnan')}
        </div>
      </div>
      <div className="w-full mt-8">
        <ScheduleCalendar events={events} />
      </div>
    </section>
  );
}
