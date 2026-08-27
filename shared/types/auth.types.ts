import { z } from "zod";
import { signupSchema, loginSchema } from "../schemas/index.js";

export type SignupData = z.infer<typeof signupSchema>;

export type LoginData = z.infer<typeof loginSchema>;
