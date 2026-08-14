import { Link } from 'react-router-dom';
import type { EventItem } from '../types/event';

interface EventCardProps {
  event: EventItem;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-slate-500 transition-colors flex flex-col justify-between">
      <div>
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          {event.location}
        </span>
        <h3 className="text-xl font-bold text-white mt-1 mb-2">
          {event.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-3 mb-4">
          {event.description}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between mt-auto">
        <span className="text-xs text-slate-400">
          {new Date(event.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
        <Link
          to={`/events/${event.id}`}
          className="text-sm text-blue-400 font-medium hover:underline"
        >
          Details &rarr;
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
