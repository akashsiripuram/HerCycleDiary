// CalendarPage.tsx
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';

export default function CalendarPage() {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchPeriods = async () => {
      const res = await axios.get('/api/period', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const markedDates = res.data.periods.map(p => new Date(p.startDate));
      if (res.data.nextPredicted) markedDates.push(new Date(res.data.nextPredicted));
      setDates(markedDates);
    };
    fetchPeriods();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your Cycle Calendar</h1>
      <Calendar
        tileClassName={({ date }) =>
          dates.find(d => d.toDateString() === date.toDateString()) ? "bg-pink-200" : ""
        }
      />
    </div>
  );
}
