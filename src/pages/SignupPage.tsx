import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { loginUser, registerUser } from '../services/api';

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  // Get current location state to check for redirect path
  const location = useLocation();
  // Access auth context to perform immediate login
  const { login } = useAuth();

  // Extract intended destination route or fallback to home page
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 1. Register new user
      await registerUser({ name, email, password });

      // 2. Automatically log in user to acquire auth token
      const token = await loginUser({ email, password });
      login(token);

      // 3. Redirect directly to target route or fallback home page
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="signup-name" className="block text-sm mb-2">
            Name
          </label>
          <input
            id="signup-name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="signup-email" className="block text-sm mb-2">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="signup-password" className="block text-sm mb-2">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
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
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
      <p className="text-sm text-slate-400 text-center mt-5">
        Already have an account?{' '}
        {/* Pass location state to preserve redirect destination */}
        <Link
          to="/login"
          state={location.state}
          className="text-blue-400 hover:text-blue-300"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
