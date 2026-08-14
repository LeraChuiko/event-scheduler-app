import type { EventItem } from '../types/event';
import EventCard from '../components/EventCard';
import { getEvents } from '../services/api';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error('Failed to load events:', err);
        setError('Failed to load events from server');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">Upcoming Events</h1>
        <p className="text-slate-400 mt-1">
          Explore and join community meetups, workshops, and tech conferences.
        </p>
      </header>

      {/* Grid wrapper for responsive event cards */}

      {loading && <p className="text-white">Loading events...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
