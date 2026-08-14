import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/api';

const CreateEventPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      await createEvent(formData);
      navigate('/');
    } catch (err) {
      console.error('Failed to create event:', err);
      alert('Error creating event. Check console for details.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">Create New Event</h1>
        <p className="text-slate-400 mt-1">
          Fill in the details below to host a new meetup or workshop.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl"
      >
        {/* Event Title */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Event Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. React & TypeScript Workshop"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Location *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Tech Park, Room 402"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Event Date */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Date & Time *
          </label>
          <input
            type="datetime-local"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Description *
          </label>
          <textarea
            required
            rows={4}
            placeholder="Provide details about agenda, speakers, or key topics..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-lg text-slate-400 hover:text-white transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-lg transition-colors text-sm shadow-md"
          >
            Publish Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;
