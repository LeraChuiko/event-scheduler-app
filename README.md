🔥 FR011 Home Page Event – List Fetch events (GET /api/events) and render them as cards sorted chronologically. (api.ts)

🔥 FR012 Event Card Navigation - Clicking an event card navigates to /events/:id with React Router. (App.tsx, Layout.tsx, ProtectedRoute.tsx)

🔥 FR013 Event Details Page Fetch and display full event data by ID (GET /api/events/:id).
(EventDetailsPage.tsx, api.ts, event.ts)

🚀 FR014 Sign-Up Page Render registration form; send POST /api/users; on success redirect to Sign-In.

🚀 FR015 Sign-In Page Render login form; send POST /api/auth/login; on success store API token and redirect to Home.

🚀 FR016 Protected Route Layout Wrap routes that require authentication (e.g., Create Event) in a guard that redirects unauthenticated users to Sign-In.

🔥 FR017 Create Event Page Provide a form that sends POST /api/events with the token; block access and submission if no valid token.

🚀 🔥FR018 Token Injection in Requests Automatically attach the stored token to request headers.
