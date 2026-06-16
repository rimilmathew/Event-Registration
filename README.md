# Event Registration Platform

Event Registration is a full-stack web application where users can register, log in, browse events, search events, register for events, and view their own registrations.

## Tech Stack

- Backend: Django 6 + Django REST Framework + SimpleJWT
- Frontend: React (Create React App) + Axios + React Router + Bootstrap
- Database: SQLite (local development)

## Repository Layout

```
eventregistration/
├── eventmgnt-api/
│   ├── requirements.txt
│   └── eventplatform/         # Django project
├── eventplatform-ui/          # React project
└── docs/
    ├── INSTALLATION.md
    ├── DATABASE.md
    └── API.md
```

## Features

- User registration and login with JWT authentication
- Event listing and event search
- Event detail view with registration status
- One-click event registration
- My Registrations page for authenticated users
- Admin panel for managing users, events, and registrations

## UI Routes

- `/` - Landing page
- `/register` - Create account
- `/login` - Log in
- `/events` - View all events
- `/eventdetails?id={id}` - View a specific event and register
- `/myregistrations` - View current user's registrations

## Quick Start

1. Set up and run the backend API (port 8000) using `docs/INSTALLATION.md`.
2. Set up and run the frontend UI (port 3000) using `docs/INSTALLATION.md`.
3. Register a user from the UI or create a superuser for admin access.
4. Create events from `/admin/` if the database is empty.
5. Test the full flow: login -> browse/search events -> register -> view my registrations.

## Documentation

- Installation: `docs/INSTALLATION.md`
- Database setup: `docs/DATABASE.md`
- API reference: `docs/API.md`

## Development Notes

- Frontend API base URL is currently hardcoded in `eventplatform-ui/src/services/api.js` as `http://127.0.0.1:8000`.
- CORS is open for all origins in development (`CORS_ALLOW_ALL_ORIGINS = True`).
- Backend settings are development-oriented (`DEBUG=True`, local SQLite).
