# Docker Setup

This repo includes a Docker Compose setup to run the Next.js frontend (`web/`) and Strapi backend (`content/`) together for local development using SQLite.

## Prerequisites

- Docker and Docker Compose installed
- Ports `3000` (Next.js) and `1337` (Strapi) available on your machine

## Services

- `web`: Next.js dev server on http://localhost:3000
- `content`: Strapi dev server on http://localhost:1337

## First Run

```bash
# at repository root
docker compose up --build
```

Then visit:
- Frontend: http://localhost:3000
- Strapi Admin: http://localhost:1337/admin

> On first visit to Strapi Admin, you’ll be prompted to create an admin user.

## Environment

- The frontend gets `NEXT_PUBLIC_API_URL=http://localhost:1337` from `docker-compose.yml`
- Strapi runs with SQLite by default (see `content/config/database.ts`) and stores data in the named volumes:
  - `strapi_data` (SQLite file)
  - `strapi_uploads` (uploaded assets)

## Volumes and Hot Reloading

- Code is bind-mounted into the containers, so changes in your local files should hot-reload
- Node modules are kept within the container via the `web_node_modules` named volume to avoid host conflicts

## Common Commands

```bash
# Start containers in the foreground
docker compose up

# Rebuild and start
docker compose up --build

# Run in background
docker compose up -d

# Stop containers
docker compose down

# Stop and remove volumes (including Strapi data/uploads)
docker compose down -v
```

## Customization Notes

- If you switch Strapi from SQLite to PostgreSQL/MySQL, update `content/config/database.ts` and `docker-compose.yml` accordingly (add a `db` service and env vars)
- If your API URL changes, update `NEXT_PUBLIC_API_URL` in `docker-compose.yml` so the frontend points to the correct backend
