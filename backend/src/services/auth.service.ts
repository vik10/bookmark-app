import crypto from "node:crypto";
import { createUser, findUserByEmail } from "../repositories";
import { createAppError } from "../utils";

export const signupUser = async (
  fullName: string,
  email: string,
  password: string,
) => {
  const passwordHash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw createAppError("User with this email already exists", 409);
  }

  const user = await createUser(fullName, email, passwordHash);

  return { message: "User signed up successfully", data: user };
};

export const loginUser = async (email: string, password: string) => {
  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
    throw createAppError("Invalid email or password --email-test--", 401);
  }

  const passwordHash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const isValidPassword = passwordHash === existingUser.password_hash;

  if (!isValidPassword) {
    throw createAppError("Invalid email or password --paswrd-test--", 401);
  }

  return {
    message: "Login successful",
    data: {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    },
  };
};
