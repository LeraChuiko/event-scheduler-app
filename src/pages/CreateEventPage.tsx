import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '@/services/api';
import type { CreateEventPayload } from '@/types/event';

const CreateEventPage = () => {
  const navigate = useNavigate();
   const [error, setError] = useState('');

  const [formData, setFormData] = useState<CreateEventPayload>({
    title: '',
    description: '',
    date: '',
    location: '',
  });

  // State to manage button pending state during form submission
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Calculate current local date-time string (YYYY-MM-DDTHH:mm) to disable past dates
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const minDateTime = now.toISOString().slice(0, 16);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError('');
   

    try {
// Enable submitting state before starting the API request
      setIsSubmitting(true);

      // Pass ISO-formatted date for backend validation
      await createEvent({
        ...formData,
        date: new Date(formData.date).toISOString(),
      });
      navigate('/');
    } catch (err) {
      console.error('Failed to create event:', err);
      setError(err instanceof Error ? err.message : 'Failed to create event.');
    } finally {
      // Reset submitting state regardless of request success or failure
      setIsSubmitting(false);
    
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
            min={minDateTime} // Restrict selecting past dates
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

        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}

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
disabled={isSubmitting} // Prevent double clicks during active request
            className={`bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-lg transition-colors text-sm shadow-md ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Event'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;
