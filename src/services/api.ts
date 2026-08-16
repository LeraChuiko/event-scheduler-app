import type { EventItem, CreateEventPayload } from '@/types/event';

const API_BASE_URL = 'http://localhost:3001/api';

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
export const loginUser = async (credentials: unknown) => {
  // TODO: Implement POST /api/auth/login
  console.log('API Base:', API_BASE_URL, credentials);
};

export const registerUser = async (credentials: unknown) => {
  // TODO: Implement POST /api/users
  console.log('Register credentials:', credentials);
};

export const createEvent = async (payload: CreateEventPayload) => {
  // TODO: Implement POST /api/events with Auth Token
  console.log('Create event payload:', payload);
};
