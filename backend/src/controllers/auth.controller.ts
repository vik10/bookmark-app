import { Request, Response } from "express";
import { loginUser, signupUser } from "../services";

export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, password, email } = req.body;
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();

  const result = await signupUser(fullName, email, password);
  res.status(201).json(result);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await loginUser(email, password);
  res.status(200).json(result);
};
