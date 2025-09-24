# Boilerplate: Next.js + Strapi (Monorepo)

A modern starter that pairs a Next.js 15 frontend with a Strapi 5 backend in a single repository. It is optimized for local development with Docker or Yarn, and comes with a clear separation between the web app (`web/`) and the CMS API (`content/`).

## Repository Structure

```
boilerplate-nextjs-strapi/
├─ content/   # Strapi v5 app (API & Admin)
│  ├─ config/           # Strapi configs (db, server, plugins, etc.)
│  ├─ src/              # Strapi code (content-types, controllers, routes, etc.)
│  ├─ public/uploads/   # Media uploads (persisted via Docker volume)
│  ├─ Dockerfile.dev    # Dev Dockerfile (Yarn Classic, node_modules linker)
│  ├─ package.json
│  └─ README.md
├─ web/       # Next.js 15 app (React 19)
│  ├─ src/
│  ├─ next.config.ts
│  ├─ Dockerfile.dev
│  ├─ package.json
│  └─ README.md
├─ docker-compose.yml   # Compose for local development (web + content)
├─ DOCKER.md            # Detailed Docker instructions
└─ README.md            # You are here
```

## Tech Stack

- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS 4
- CMS/API: Strapi 5 (SQLite by default), `better-sqlite3`, `sharp`
- Runtime: Node 20+ (containers use Alpine images)
- Package manager: Yarn (Corepack)
- Dev Containers: Docker Compose (two services: `web`, `content`)

## Requirements

- Node 20+ (for local non-Docker work)
- Yarn via Corepack (`corepack enable`)
- Docker Desktop (if using containers)

## Quick Start (with Docker)

For most users, Docker is the fastest path to a working setup.

```bash
# From repository root
docker compose up --build
```

- Web (Next.js): http://localhost:3000
- CMS (Strapi): http://localhost:1337
- Strapi Admin: http://localhost:1337/admin (create the first admin user on first visit)

Details and common commands are in `DOCKER.md`.

## Quick Start (without Docker)

Two terminals required (one for `web/`, one for `content/`).

1) Strapi (content/)
```bash
cd content
corepack enable
# If you have a yarn.lock, prefer frozen
yarn install --frozen-lockfile || yarn install
# Development server
yarn develop
# Strapi defaults to http://localhost:1337
```

2) Next.js (web/)
```bash
cd web
corepack enable
yarn install --frozen-lockfile || yarn install
# Development server
yarn dev
# Next.js defaults to http://localhost:3000
```

Ensure the frontend knows where the API is by setting `NEXT_PUBLIC_API_URL` to the Strapi URL (defaults to `http://localhost:1337`). When using Docker Compose, this is already provided.

## Environment Variables

- `web/`
  - `NEXT_PUBLIC_API_URL` (public): URL of the Strapi API.

- `content/` (Strapi)
  - `APP_KEYS`: CSV of app keys (required by Strapi)
  - `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`
  - `DATABASE_CLIENT`: defaults to `sqlite` (see `content/config/database.ts`)
  - `HOST`, `PORT`: defaults to `0.0.0.0:1337` (see `content/config/server.ts`)

When running via Docker Compose, these are preconfigured in `docker-compose.yml` for local development.

## Database

The default configuration uses SQLite (see `content/config/database.ts`). Data and uploads are persisted in Docker volumes when using Compose:

- `strapi_data` -> `content/.tmp`
- `strapi_uploads` -> `content/public/uploads`

To switch to PostgreSQL/MySQL later, update `content/config/database.ts` and extend `docker-compose.yml` with a `db` service and matching env vars.

## Scripts

- `web/`
  - `yarn dev`: Start Next.js dev server
  - `yarn build`: Build for production
  - `yarn start`: Start production server

- `content/`
  - `yarn develop`: Start Strapi in development
  - `yarn build`: Build Strapi (for production)
  - `yarn start`: Start Strapi in production

## Development Notes

- This template favors reusability and consistency (senior-dev patterns):
  - Clear separation of concerns: `web/` vs `content/`
  - Containerized dev for parity and easy onboarding
  - Yarn Classic for Strapi dev to avoid PnP pitfalls with native modules
  - Alpine images with the minimum system dependencies for native builds
- Prefer `.env` files for secrets in real projects. Do not commit secrets.

## Troubleshooting

- Docker build error: `no space left on device`
  - Free up disk space in Docker Desktop (Prune unused images/volumes) or increase the Docker disk image size.
  - Command line helpers:
    ```bash
    docker system df
    docker system prune -a
    docker volume prune
    ```

- Yarn/lockfile mismatch errors
  - Ensure you run installs consistently with Yarn
  - If switching from npm, remove `package-lock.json` and regenerate `yarn.lock`

- Sharp / better-sqlite3 build issues on Alpine
  - Ensure the required build tools and `vips-dev` are installed (already included in Dockerfiles)

## Production

This repo is optimized for local development. For production:
- Build the frontend (`yarn build`) and serve via a production server or static export if suitable.
- Build and run Strapi in production mode (`yarn build && yarn start`).
- Use a managed database (PostgreSQL/MySQL) and object storage for uploads (S3, etc.).
- Front a reverse proxy (e.g., Nginx, Traefik) with HTTPS.

## License

Add your project license here.

## Contributing

PRs and suggestions are welcome. Please keep the codebase consistent and well-documented.
