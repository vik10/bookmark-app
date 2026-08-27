# Bookmark App Frontend

The frontend is a React and TypeScript application built with Vite. It uses Material UI for components, React Hook Form and Zod for form validation, Axios for API requests, and React Router for navigation.

## Setup

```bash
npm install
```

The API client uses `http://localhost:3000/api` by default. To use another API URL, create a `.env.local` file:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Development

```bash
npm run dev
```

The Vite development server normally runs at `http://localhost:5173`.

## Validation

Signup and login use the shared Zod schemas and TypeScript types from the repository-level `shared/` directory.

```bash
npm run build
npm run lint
```
