**Project**: The Flying Panda — Visa Slot Alerts (mini internal tool)

**Overview**
- Small full-stack app (Node.js + Express backend, React frontend) to track visa slot alerts.

**Setup**
1. Backend
   - Copy `.env.example` to `.env` and set `MONGO_URI` and `PORT`.
   - Install and run:
     - `cd server`
     - `npm install`
     - `npm start`
2. Frontend
   - `cd client`
   - `npm install`
   - `npm run dev`

API endpoints (server default port 4000):
- `GET /alerts` — list alerts; supports `?country=...&status=...&page=...&limit=...`
- `POST /alerts` — create alert
- `PUT /alerts/:id` — update alert
- `DELETE /alerts/:id` — delete alert

**Design decisions**
- Used MongoDB with Mongoose for simple persistence and schema validation.
- Centralized error handler and a small request logger middleware.
- React (Vite) frontend with minimal components; uses fetch to call backend.
- Supports query filters and basic pagination on GET.

**What I'd improve for production**
- Add authentication/authorization.
- Add comprehensive input validation and sanitization.
- Add tests (unit + integration), logging to a service, and monitoring.
- Use CI/CD, Docker, and deploy to a managed platform.

**Where AI helped vs where I had to think**
- AI helped scaffold files and boilerplate. Custom business logic, API design choices, small UI UX decisions, and production trade-offs were decided by me.
