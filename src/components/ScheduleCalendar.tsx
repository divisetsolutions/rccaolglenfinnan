'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { EventClickArg } from '@fullcalendar/core';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from 'react';

interface Event {
  title: string;
  start: string;
  end?: string;
  allDay: boolean;
  extendedProps?: {
    [key: string]: string | boolean | undefined;
  };
}

interface ScheduleCalendarProps {
  events: Event[];
}

export default function ScheduleCalendar({ events }: ScheduleCalendarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

// ... (keep the existing code until the selectedEvent state)

  const [selectedEvent, setSelectedEvent] = useState<EventClickArg['event'] | null>(null);

  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent(clickInfo.event);
    setIsModalOpen(true);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,listWeek'
        }}
        events={events}
        eventClick={handleEventClick}
      />
      {selectedEvent && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <DialogDescription>
                {new Date(selectedEvent.start).toLocaleString()}
              </DialogDescription>
            </DialogHeader>
            {selectedEvent.extendedProps?.notes && (
              <p>{selectedEvent.extendedProps.notes}</p>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}