import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/useAuth';
import { loginUser } from '@/services/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const redirectedFromProtected = location.state?.fromProtected;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Extract intended destination route or fallback to home page
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const token = await loginUser({ email, password });
      login(token);
      // Redirect user to the original destination route after successful login
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
      {redirectedFromProtected && (
        <div className="mb-6 p-3.5 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-300 text-sm text-center space-y-1">
          <span className="block font-medium">
            Creating events requires an account.
          </span>
          <span className="block opacity-90">
            Please sign in or register to continue.
          </span>
        </div>
      )}
      <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="login-email" className="block text-sm mb-2">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            required
            /* Disable browser autofill for email */
            autoComplete="off"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="login-password" className="block text-sm mb-2">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
          />
        </div>
        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 rounded-lg transition-colors"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p className="text-sm text-slate-400 text-center mt-5">
        Need an account?{' '}
        {/* Pass state to SignUp page so redirect location is preserved */}
        <Link
          to="/signup"
          state={location.state}
          className="text-blue-400 hover:text-blue-300"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
