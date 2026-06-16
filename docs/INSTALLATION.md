# Installation Guide

This project contains two apps:

- Backend API: `eventmgnt-api/eventplatform` (Django + DRF)
- Frontend UI: `eventplatform-ui` (React)

## Prerequisites

- Python 3.10 or later
- Node.js 18 or later
- npm (comes with Node.js)
- Git

## 1) Backend Setup (Django API)

From the repository root:

```powershell
cd eventmgnt-api
python -m venv .venv
.\.venv\Scripts\Activate
pip install -r requirements.txt
cd eventplatform
python manage.py migrate
python manage.py createsuperuser # create a super user for manually adding events
python manage.py runserver
```

API runs at `http://127.0.0.1:8000`.

## 2) Frontend Setup (React UI)

Open a second terminal from the repository root:

```powershell
cd eventplatform-ui
npm install
npm start
```

UI runs at `http://localhost:3000`.

## 3) Useful Frontend Scripts

From `eventplatform-ui`:

- `npm start` - Start development server
- `npm run build` - Build production assets in `build/`
- `npm test` - Run tests

## 4) Running the Full App

Start services in this order:

1. Start backend API (`http://127.0.0.1:8000`)
2. Start frontend UI (`http://localhost:3000`)
3. Register a user or log in with an existing account

## 5) Troubleshooting

- CORS errors:
  - Ensure the backend is running and reachable on port 8000.
  - CORS middleware is enabled in `eventmgnt-api/eventplatform/eventplatform/settings.py`.
- 401 Unauthorized responses:
  - Login first from the UI.
  - The app stores `Bearer <access_token>` in `localStorage` under `token`.
- API connection errors:
  - Confirm `baseURL` in `eventplatform-ui/src/services/api.js` matches your backend URL.
- No events visible:
  - Create events from Django Admin after creating a superuser.

