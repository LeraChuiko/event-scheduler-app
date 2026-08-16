import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventById } from '@/services/api';
import type { EventItem } from '@/types/event';

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getEventById(id); //api.ts
        setEvent(data); //renew State "event"
      } catch (err) {
        console.error('Failed to load event details:', err);
        setError('Failed to load event');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <div className="py-12 text-center text-white">Loading event...</div>;
  }

  if (error) {
    return (
      <div className="py-12 text-center text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Event Not Found</h2>
        <Link to="/" className="text-blue-400 hover:underline">
          ← Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center text-sm text-blue-400 hover:underline mb-6"
      >
        &larr; Back to All Events
      </Link>

      {/* Main Content Card */}
      <article className="bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider bg-blue-950/60 border border-blue-800/50 px-3 py-1 rounded-full">
            {event.location}
          </span>
          <span className="text-sm text-slate-400 font-medium">
            {new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
          {event.title}
        </h1>

        <div className="border-t border-slate-700/60 pt-6 mt-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-2">
            About this event
          </h3>
          <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
            {event.description}
          </p>
        </div>
      </article>
    </div>
  );
};

export default EventDetailsPage;
