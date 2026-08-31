import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "./db";

const PgSession = connectPgSimple(session);

const sessionMiddleware = session({
  store: new PgSession({
    pool,
    tableName: "user_sessions",
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET || "development-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24,
  },
});

export default sessionMiddleware;
