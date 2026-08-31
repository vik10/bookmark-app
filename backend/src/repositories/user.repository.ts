import { pool } from "../config";

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const result = await pool.query(
    "INSERT INTO users (name, password_hash, email) VALUES ($1, $2, $3) RETURNING *",
    [name, password, email],
  );
  return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return result.rows[0];
};
