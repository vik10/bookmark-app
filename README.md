# Bookmark App

A bookmark application with a React frontend and an Express, PostgreSQL-backed API.

## Project Structure

```text
bookmark-app/
  frontend/   React, TypeScript, Vite, and Material UI app
  backend/    Express, TypeScript, and PostgreSQL API
  shared/     Shared Zod schemas and TypeScript types
  *.config.*  Common TypeScript and ESLint configuration
```

## Prerequisites

- Node.js 20 or newer
- npm
- PostgreSQL

## Setup

Install dependencies in both applications:

```bash
cd frontend
npm install

cd ../backend
npm install
```

Create a PostgreSQL database named `bookmark_app`, or configure another database with the environment variables described in [backend/README.md](backend/README.md).

## Run Locally

Start the backend in one terminal:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

The frontend is normally available at `http://localhost:5173` and the API at `http://localhost:3000`.

## Validation

Run the frontend checks:

```bash
cd frontend
npm run build
npm run lint
```

Run the backend build:

```bash
cd backend
npm run build
npm run lint
```

Run the complete TypeScript project check from the repository root with:

```bash
npx tsc -b
```

See the application-specific documentation for more details:

- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)
