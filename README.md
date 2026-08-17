event.ts - Typisierung: Stellt den EventItem-Typ bereit, um die Struktur jedes Ereignisobjekts (ID, Titel, Datum, Ort usw.) genau zu beschreiben. Die Datentypen und Schlüssel wurden aus der Swagger-API-Dokumentation übernommen.

main.tsx – Einstiegspunkt der Anwendung:
ReactDOM.createRoot: Injiziert die Anwendung in das root-Element im HTML.
AuthProvider: Stellt den Authentifizierungszustand (Token, Login-Status) global bereit.
BrowserRouter: Aktiviert das clientseitige Routing ohne Seitenneuladen.

App.tsx – Routing-Konfiguration:
Layout: Dient als zentrales Grundgerüst für alle Seiten.
Routing-Struktur: Über <Routes> und <Route> wird die Navigation der Anwendung definiert (inklusive öffentlicher, geschützter und Fallback-Routen).

Layout.tsx – Nested Routing:
Navbar & footer: Bleiben beim Navigieren auf allen Seiten unverändert sichtbar.
<Outlet/> (React Router) - dynamischer Platzhalter. Hier wird der Inhalt der jeweils aktiven Unterroute (HomePage, EventDetailsPage etc.) gerendert.
Layout-Vorteil: Verhindert Code-Duplizierung und sorgt für ein einheitliches Design im gesamten Projekt.

🔥 FR011 Home Page Event – List Fetch events (GET /api/events) and render them as cards sorted chronologically.

HomePage.tsx - Die Startseite, die Karten mit allen verfügbaren Veranstaltungen lädt,
diese nach Datum sortiert und in einem Grid anzeigt.

Beim ersten Rendern der Seite wird useEffect ausgelöst, wodurch die interne asynchrone Funktion getEvents (api.ts) aufgerufen wird. Der Endpunkt /events und die HTTP-Methode (GET) sind aus der Swagger-API-Dokumentation übernommen: '${API_BASE_URL}/events'.
Für GET-Anfragen nutzen wir die Standardfunktion fetch(). Wenn keine spezielle HTTP-Methode angegeben wird, führt fetch() automatisch einen GET-Request aus.

EventCard.tsx ist eine Komponente, die ein einzelnes Ereignis empfängt und eine Event auf dem Bildschirm zeichnet: events.map((...) => (<.../>)).

🔥 FR012 Event Card Navigation - Clicking an event card navigates to /events/:id with React Router. (App.tsx, Layout.tsx, EventCard.tsx)

App.tsx: Definiert die öffentliche Route <Route element="{<EventDetailsPage" path="/events/:id"/>} />.

EventCard.tsx: Nutzt die <Link to="{/events/${event.id}}">-Komponente, um den Benutzer beim Klick auf die Karte dynamisch weiterzuleiten.

Layout.tsx: Liefert das gemeinsame Layout mit Navigation und <Outlet/> für die Seitenanzeige.

🔥 FR013 Event Details Page Fetch and display full event data by ID (GET /api/events/:id).
(EventDetailsPage.tsx, api.ts, event.ts)

EventDetailsPage.tsx - Diese page ist für die Anzeige der vollständigen Informationen zu einem einzelnen Event zuständig.

Mit dem Hook useParams aus 'react-router-dom' lesen wir die dynamische Event-ID direkt aus der URL-Adresse aus (z. B. /events/123).
const { id } = useParams<{ id: string }>();

Über die Funktion getEventById(id) in api.ts wird ein GET-Request an ${API_BASE_URL}/events/${id} gesendet. Sowohl der Pfad als auch die HTTP-Methode sind exakt aus der Swagger-Dokumentation übernommen.

Wenn die Daten erfolgreich geladen werden, werden Titel, Datum, Ort und Beschreibung der Veranstaltung gerendert.

Die Komponente <Link to="/"> ermöglicht dem Benutzer die einfache Navigation zurück zur Hauptseite.

🚀 FR014 Sign-Up Page Render registration form; send POST /api/users; on success redirect to Sign-In.

🚀 FR015 Sign-In Page Render login form; send POST /api/auth/login; on success store API token and redirect to Home.

🚀 FR016 Protected Route Layout Wrap routes that require authentication (e.g., Create Event) in a guard that redirects unauthenticated users to Sign-In.

🔥 FR017 Create Event Page Provide a form that sends POST /api/events with the token; block access and submission if no valid token.

Stellt ein Forma bereit, das ein neues Event per POST /api/events mit einem Auth-Token erstellt. Der Zugriff sowie das Absenden werden blockiert, wenn kein gültiges Token vorhanden ist.

CreateEventPage.tsx: Enthält das Formular und ruft die Funktion createEvent beim Absenden auf.

ProtectedRoute.tsx: Blockiert den Zugriff für nicht angemeldete Benutzer und leitet sie direkt auf /login weiter.

api.ts (createEvent): Prüft vor dem Senden der Anfrage das Vorhandensein des Tokens im localStorage und wirft einen Fehler, falls kein Token existiert.

🚀 🔥FR018 Token Injection in Requests Automatically attach the stored token to request headers.(api.ts->createEvent, Token Injection

Fügt das gespeicherte Auth-Token automatisch in die Request-Header bei Anfragen an geschützte Backend-Endpunkte ein.

Das Token dient als «digitaler Pass» des Benutzers für den Server.

Das Token wird aus dem localStorage ausgelesen und im Header mitgeschickt:Authorization: Bearer <token>

Ohne diesen Header weist der Server die Anfrage mit einem Fehler (z. B. 401 Unauthorized) ab.
