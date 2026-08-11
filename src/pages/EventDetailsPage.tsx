import { useParams } from "react-router-dom";

const EventDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-4">Event Details #{id}</h2>
      <p className="text-slate-400">Full event details go here (FR013)...</p>
    </div>
  );
};

export default EventDetailsPage;
