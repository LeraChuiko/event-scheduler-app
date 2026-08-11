import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-400">
          EventScheduler
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/events/create" className="text-sm hover:text-blue-400">
            + Create Event
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 text-sm bg-slate-700 rounded-lg"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm bg-blue-600 rounded-lg"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
