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

//Bei realen Teamprojekten wählt das Team einfach eine Konvention (Style Guide):
//zum Beispiel: „Alle Datenstrukturen und Objekte werden mithilfe von interface
//beschrieben, und Vereinigungen und primitive Datentypen werden mithilfe
// von Typen beschrieben.
