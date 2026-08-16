import type { EventItem, CreateEventPayload } from '../types/event';
import { AUTH_TOKEN_KEY } from '../context/auth';

const API_BASE_URL = 'http://localhost:3001/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationData extends LoginCredentials {
  name: string;
}

const getErrorMessage = async (response: Response, fallback: string) => {
  try {
    const data: unknown = await response.json();

    if (typeof data === 'object' && data !== null) {
      const message = 'message' in data ? data.message : undefined;
      const error = 'error' in data ? data.error : undefined;

      if (typeof message === 'string') return message;
      if (typeof error === 'string') return error;
    }
  } catch {
    // The response did not contain JSON, so use the friendly fallback below.
  }

  return fallback;
};

const sendJson = async (url: string, options: RequestInit) => {
  try {
    return await fetch(url, options);
  } catch {
    throw new Error('Unable to reach the server. Please try again.');
  }
};

// 🔥 Valeriia's API methods
export const getEvents = async (): Promise<EventItem[]> => {
  // Fetch all events from the server
  const response = await fetch(`${API_BASE_URL}/events`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  const data = await response.json();
  return data.results;
};

export const getEventById = async (id: string): Promise<EventItem> => {
  // Fetch a single event by ID from the server
  const response = await fetch(`${API_BASE_URL}/events/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch event with id: ${id}`);
  }
  return await response.json();
};

// 🚀 Anton's API methods
export const loginUser = async (credentials: LoginCredentials) => {
  const response = await sendJson(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, 'Sign in failed.'));
  }

  const data: unknown = await response.json();

  if (typeof data !== 'object' || data === null) {
    throw new Error('The server returned an invalid login response.');
  }

  const nestedData =
    'data' in data && typeof data.data === 'object' && data.data !== null
      ? data.data
      : undefined;
  const token =
    ('token' in data && typeof data.token === 'string' && data.token) ||
    ('accessToken' in data &&
      typeof data.accessToken === 'string' &&
      data.accessToken) ||
    (nestedData &&
      'token' in nestedData &&
      typeof nestedData.token === 'string' &&
      nestedData.token);

  if (!token) {
    throw new Error('The server did not return an authentication token.');
  }

  return token;
};

export const registerUser = async (credentials: RegistrationData) => {
  const response = await sendJson(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, 'Sign up failed.'));
  }
};

export const createEvent = async (
  payload: CreateEventPayload,
): Promise<EventItem> => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)?.trim();

  if (!token) {
    throw new Error('You must be signed in to create an event.');
  }

  const response = await sendJson(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, 'Failed to create event.'));
  }

  return await response.json();
};
