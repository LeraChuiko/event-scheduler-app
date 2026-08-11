import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EventDetailsPage from "./pages/EventDetailsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CreateEventPage from "./pages/CreateEventPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
        <Navbar />

        {/* Main layout container with fixed max-width */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
          <Routes>
            {/* Public Routes (Valeriia & General) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />

            {/* Auth Routes (Anton) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected Routes (Anton) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/events/create" element={<CreateEventPage />} />
            </Route>

            {/* 404 Page */}
            <Route
              path="*"
              element={
                <div className="py-12 text-center text-xl">
                  404 — Page Not Found
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
