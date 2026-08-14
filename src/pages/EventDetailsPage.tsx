import { useParams, Link } from 'react-router-dom';
import { MOCK_EVENTS } from '../data/mockEvents';

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const event = MOCK_EVENTS.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Event Not Found</h2>
        <p className="text-slate-400 mb-6">
          The event you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          &larr; Back to Events
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
