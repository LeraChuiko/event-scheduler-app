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

//В реальных командных проектах команда просто выбирает
// соглашение (Style Guide): например, "Все структуры данных
// и объектов описываем через interface, а союзы (Union) и примитивы — через type".
