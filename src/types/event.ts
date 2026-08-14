export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

export interface CreateEventPayload {
  title: string;
  description: string;
  date: string;
  location: string;
}
