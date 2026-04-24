# Food Waste Tracker

A fast, tablet-friendly tool for restaurant kitchen staff to log and review food waste in real time. Staff can record waste events by station and reason in two taps, then review history and analytics to spot patterns and reduce costs.

## Target Users

Restaurant kitchen staff — line cooks, prep cooks, and kitchen managers — who need a friction-free way to track food waste during a busy service.

## Key Features

- **Waste Logging** — Select a kitchen station and a waste reason, then tap "Log Waste" to record an event instantly.
- **Event History** — Browse a chronological list of all logged waste events.
- **Analytics** — View aggregate breakdowns by station, by reason, and by day to identify where waste is coming from.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS v4, shadcn/ui |
| Backend | Node.js, Express |
| Database | PostgreSQL, Drizzle ORM |
| API contract | OpenAPI 3.1 (code-generated client + Zod validators) |
| Monorepo | pnpm workspaces |
| Language | TypeScript throughout |

## Monorepo Structure

```
/
├── artifacts/
│   ├── food-waste-tracker/   # React + Vite frontend (preview path: /)
│   ├── api-server/           # Express REST API (preview path: /api)
│   └── mockup-sandbox/       # Design canvas (internal)
│
└── lib/
    ├── api-spec/             # OpenAPI spec (openapi.yaml)
    ├── api-zod/              # Zod validators generated from the spec
    ├── api-client-react/     # React Query hooks generated from the spec
    └── db/                   # Drizzle ORM schema and database client
```

## Local Setup

### Prerequisites

- **Node.js** 20+
- **pnpm** 9+ (`npm install -g pnpm`)
- **PostgreSQL** running locally (or a connection string to a remote instance)

### 1. Install dependencies

```bash
pnpm install
```

### 2. Push the database schema

The project uses Drizzle Kit's `push` workflow to sync the schema directly to your database:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/food_waste_tracker \
  pnpm --filter @workspace/db run push
```

### 3. Start the development servers

The app is built for Replit's path-based routing where the frontend and API share the same origin (frontend at `/`, API at `/api`). For local development, you need to run both servers and route requests accordingly.

**API server** — requires `PORT` and `DATABASE_URL`:

```bash
PORT=3001 \
DATABASE_URL=postgresql://user:password@localhost:5432/food_waste_tracker \
  pnpm --filter @workspace/api-server run dev
```

**Frontend** — requires `PORT` and `BASE_PATH`:

```bash
PORT=5173 \
BASE_PATH=/ \
  pnpm --filter @workspace/food-waste-tracker run dev
```

> **Note:** Because the frontend makes API calls to `/api/...` (relative to its own origin), you will need a local reverse proxy (e.g. nginx or a Vite proxy plugin) to forward `/api` requests from port 5173 to port 3001. On Replit, the platform handles this routing automatically.

## Stations & Waste Reasons

The app ships with these fixed values (defined in `lib/db/src/schema/wasteEvents.ts`):

- **Stations:** Sauté, Salad, Prep, Fry, Flat
- **Waste reasons:** Burnt food, Dropped, Prep mistake, Expired
