import { Router } from "express";
import { login, signup } from "../controllers";
import { validate } from "../middleware";
import {
  loginSchema,
  signupSchema,
} from "../../../shared/schemas/auth.schema.js";

const router = Router();

router.post("/signup", validate(signupSchema), signup);

router.post("/login", validate(loginSchema), login);

export default router;
