# Food Waste Tracker

A full-stack food waste tracking app for restaurant kitchen staff.

## Architecture

- **`client/`** — React + Vite frontend (pnpm workspace member `@workspace/food-waste-tracker`)
- **`server/`** — Express API backend (pnpm workspace member `@workspace/api-server`)
- **`lib/api-client-react/`** — Generated API client library shared into `client/` via pnpm workspace link
- **`staticwebapp/`** — Self-contained npm copy of the frontend for Azure Static Web Apps deployment (no pnpm workspace dependency)

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, TanStack Query, Wouter, shadcn/ui
- **Backend**: Express, Drizzle ORM, PostgreSQL (Supabase)
- **API client**: Orval-generated hooks from OpenAPI spec

## Deployment

- **Backend**: Azure App Service via `.github/workflows/azure-deploy.yml`
- **Frontend**: Azure Static Web Apps via `.github/workflows/azure-static-web-apps.yml`
  - `app_location`: `/staticwebapp`
  - `output_location`: `dist/public`
  - `app_build_command`: `npm install && npm run build`
  - Reads `VITE_API_BASE_URL` from GitHub repository variables to point at the live backend

### Before going live — required manual steps

1. **Create the Azure SWA resource** in the Azure Portal and link it to this repository
2. **Add `AZURE_STATIC_WEB_APPS_API_TOKEN`** as a GitHub Actions secret (copied from the Azure SWA resource)
3. **Add `VITE_API_BASE_URL`** as a GitHub Actions repository variable (e.g. `https://your-api.azurewebsites.net`) — this is the primary way the frontend reaches the backend
4. **Update `staticwebapp/staticwebapp.config.json`** — replace `REPLACE_WITH_BACKEND_URL` in the `/api/*` redirect route with the real backend origin (same value as `VITE_API_BASE_URL`, without a trailing slash)

> The frontend always uses `VITE_API_BASE_URL` (set at build time) for all API calls, so the redirect rule in `staticwebapp.config.json` is a secondary safety net. Skipping step 4 does not break the app as long as `VITE_API_BASE_URL` is configured correctly.

## Local Development

```bash
# Install dependencies (monorepo)
pnpm install

# Start both servers
pnpm --filter @workspace/api-server run dev   # PORT=3000
pnpm --filter @workspace/food-waste-tracker run dev  # PORT=5173
```

## Key Design Decisions

- `staticwebapp/` is intentionally NOT added to `pnpm-workspace.yaml` — it uses plain npm and must stay standalone for Azure Oryx build compatibility
- `lib/api-client-react/src/` is inlined into `staticwebapp/src/lib/api-client-react/` — no workspace link needed
- All `catalog:` and `workspace:*` version markers are resolved to concrete version strings in `staticwebapp/package.json`
- The API base URL defaults to `""` (same origin) so the local dev proxy in `vite.config.ts` handles `/api/*` calls during development
- Production API calls use an absolute URL via `VITE_API_BASE_URL`, baked in at build time by Vite
