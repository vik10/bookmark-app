import { Request, Response } from "express";
import crypto from "node:crypto";
import pool from "../config/database.js";

export const testDatabaseConnection = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      status: "ok",
      message: "Database connected",
      timestamp: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
      error: (error as Error).message,
    });
  }
};

export const signupUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { firstName, lastName, name, password, email } = req.body;
  const fullName = [firstName, lastName, name].filter(Boolean).join(" ").trim();

  console.log("Signup request received:", {
    email,
    password,
    fullName,
    body: req.body,
  });

  if (!fullName || !password || !email) {
    res.status(400).json({
      status: "error",
      message: "Name, email, and password are required",
    });
    return;
  }

  const passwordHash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      res.status(409).json({
        status: "error",
        message: "User with this email already exists",
      });
      return;
    }

    const result = await pool.query(
      "INSERT INTO users (name, password_hash, email) VALUES ($1, $2, $3) RETURNING *",
      [fullName, passwordHash, email],
    );

    res.status(201).json({
      status: "ok",
      message: "User signed up successfully",
      user: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "User signup failed",
      error: (error as Error).message,
    });
  }
};
