import { Router } from "express";
import { login, signup } from "../controllers";
import { validate } from "../middleware";
import {
  loginSchema,
  signupSchema,
} from "../../../shared/schemas/auth.schema.js";
import { asyncHandler } from "../utils";

const router = Router();

router.post("/signup", validate(signupSchema), asyncHandler(signup));

router.post("/login", validate(loginSchema), asyncHandler(login));

export default router;
