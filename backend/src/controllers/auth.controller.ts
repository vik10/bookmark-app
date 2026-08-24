import { Request, Response } from "express";
import { loginUser, signupUser } from "../services";

export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, password, email } = req.body;
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();

  try {
    const result = await signupUser(fullName, email, password);
    return res.status(201).json(result);
  } catch (error) {
    if ((error as Error).message === "EMAIL_EXISTS") {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }
    return res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await loginUser(email, password);
    return res.status(200).json(result);
  } catch (error) {
    if ((error as Error).message === "EMAIL_NOT_EXISTS") {
      return res.status(401).json({
        message: "invalid email or password--email-test--",
      });
    }

    if ((error as Error).message === "PASSWORD_INVALID") {
      return res.status(401).json({
        message: "invalid email or password--passwrd-test--",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};
