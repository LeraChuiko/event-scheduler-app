import { MOCK_EVENTS } from '../data/mockEvents';
import EventCard from '../components/EventCard';

const HomePage = () => {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">Upcoming Events</h1>
        <p className="text-slate-400 mt-1">
          Explore and join community meetups, workshops, and tech conferences.
        </p>
      </header>

      {/* Grid wrapper for responsive event cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_EVENTS.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
