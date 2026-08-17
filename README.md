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

🚀 FR014 Sign-Up Page - Registrierung eines neuen Benutzers (POST /api/users).

SignupPage.tsx enthält das Registrierungsformular mit Name, E-Mail und Passwort.

Beim Absenden wird registerUser() aus api.ts aufgerufen. Die eingegebenen Daten werden als JSON mit einem POST-Request an ${API_BASE_URL}/users gesendet.

Wenn die Registrierung erfolgreich ist, wird der Benutzer automatisch angemeldet und kann die geschützten Bereiche der Anwendung nutzen.

Fehler vom Server oder Netzwerk werden abgefangen und direkt im Formular angezeigt.


🚀 FR015 Sign-In Page - Anmeldung eines bestehenden Benutzers (POST /api/auth/login).

LoginPage.tsx enthält das Login-Formular mit E-Mail und Passwort.

Beim Absenden wird loginUser() aus api.ts aufgerufen. Der Server prüft die Zugangsdaten und sendet bei erfolgreicher Anmeldung ein Authentifizierungs-Token zurück.

Dieses Token wird im localStorage gespeichert und dient danach als Nachweis, dass der Benutzer angemeldet ist.

Der AuthProvider stellt den Login-Status für die gesamte React-Anwendung bereit.

Beim Logout wird das gespeicherte Token entfernt und der Benutzer gilt wieder als nicht angemeldet.


🚀 FR016 Protected Route - Schutz von Seiten, die nur für angemeldete Benutzer zugänglich sind.

ProtectedRoute.tsx prüft über useAuth(), ob ein Benutzer authentifiziert ist.

Ist kein Benutzer angemeldet, wird der Zugriff auf /events/create blockiert und der Benutzer zur Login-Seite weitergeleitet.

Nach einer erfolgreichen Anmeldung kann der Benutzer anschließend zur gewünschten geschützten Seite zurückkehren.

Damit können öffentliche Seiten wie die Event-Liste und Event-Details von allen Benutzern angesehen werden, während das Erstellen neuer Events eine Anmeldung erfordert.

🔥 FR017 Create Event Page - Erstellung eines neuen Events mit Authentifizierung (POST /api/events).

CreateEventPage.tsx enthält das Formular zum Erstellen eines neuen Events.

Beim Absenden wird createEvent() aus api.ts aufgerufen. Die Formulardaten werden als JSON mit einem POST-Request an ${API_BASE_URL}/events gesendet.

Vor dem Senden prüft createEvent(), ob ein Auth-Token im localStorage vorhanden ist.

Ohne gültiges Token wird die Anfrage blockiert und eine Fehlermeldung ausgegeben.

Nach erfolgreicher Erstellung wird der Benutzer zurück zur Event-Liste weitergeleitet und das neue Event erscheint dort.


🚀 FR018 Token Injection in Requests - Automatisches Einfügen des gespeicherten Tokens in geschützte API-Anfragen.

Das Auth-Token wird aus dem localStorage ausgelesen und automatisch im Authorization-Header mitgesendet:

Authorization: Bearer <token>

Dadurch kann der Server erkennen, dass die Anfrage von einem angemeldeten Benutzer kommt.

Ohne diesen Header wird der Zugriff auf geschützte Endpunkte vom Server abgelehnt.