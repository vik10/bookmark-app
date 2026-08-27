# Bookmark App Backend

The backend is an Express and TypeScript API that connects to PostgreSQL with `pg`.

## Setup

```bash
npm install
```

The database connection reads these environment variables:

```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=bookmark_app
DATABASE_USER=postgres
DATABASE_PASSWORD=your-password
```

The defaults are `localhost:5432`, database `bookmark_app`, user `postgres`, and an empty password. Use a `.env` file in the `backend` directory for local overrides. Do not commit credentials.

## Development

```bash
npm run dev
```

The development server uses `tsx watch`, so it restarts automatically when backend source files change. The API normally runs at `http://localhost:3000`.

## API Routes

The database test route is mounted under `/api/bookmarks`:

- `GET /api/bookmarks/db-test`

It returns the database connection status and current database timestamp.

## Scripts

```bash
npm run dev       # Start the API with automatic reloads
npm run build     # Compile TypeScript into dist/
npm run lint      # Run ESLint
npm run start     # Run the compiled API
```

Shared validation schemas and inferred TypeScript types are in the repository-level `shared/` directory.
