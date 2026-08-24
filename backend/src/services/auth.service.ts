import crypto from "node:crypto";
import { createUser, findUserByEmail } from "../repositories";

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
    throw new Error("EMAIL_EXISTS");
  }

  const user = await createUser(fullName, email, passwordHash);

  return { message: "User signed up successfully", data: user };
};

export const loginUser = async (email: string, password: string) => {
  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
    throw new Error("EMAIL_NOT_EXISTS");
  }

  const passwordHash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const isValidPassword = passwordHash === existingUser.password_hash;

  if (!isValidPassword) {
    throw new Error("PASSWORD_INVALID");
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
