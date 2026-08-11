import type { EventItem, CreateEventPayload } from "../types/event";

const API_BASE_URL = "http://localhost:3000/api";

// 🔥 Valeriia's API methods
export const getEvents = async (): Promise<EventItem[]> => {
  // TODO: Implement GET /api/events
  return [];
};

export const getEventById = async (id: string): Promise<EventItem> => {
  // TODO: Implement GET /api/events/:id
  throw new Error(`Not implemented for id: ${id}`);
};

// 🚀 Anton's API methods
export const loginUser = async (credentials: unknown) => {
  // TODO: Implement POST /api/auth/login
  console.log("API Base:", API_BASE_URL, credentials);
};

export const registerUser = async (credentials: unknown) => {
  // TODO: Implement POST /api/users
  console.log("Register credentials:", credentials);
};

export const createEvent = async (payload: CreateEventPayload) => {
  // TODO: Implement POST /api/events
  console.log("Create event payload:", payload);
};
