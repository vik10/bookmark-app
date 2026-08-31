import { Request, Response } from "express";
import { loginUser, signupUser } from "../services";
import { createAppError } from "../utils";

export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, password, email } = req.body;
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();

  const result = await signupUser(fullName, email, password);
  res.status(201).json(result);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await loginUser(email, password);
  req.session.userId = result.data.id;
  res.status(200).json(result);
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) {
      throw createAppError("Unable to logout", 500);
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logout successful" });
  });
};

export const getCurrentUser = (_req: Request, res: Response) => {
  res.status(200).json({
    message: "User authenticated",
    data: {
      isAuthenticated: true,
    },
  });
};
