import { Router } from "express";
import { getCurrentUser, login, logout, signup } from "../controllers";
import { requireAuth, validate } from "../middleware";
import {
  loginSchema,
  signupSchema,
} from "../../../shared/schemas/auth.schema.js";
import { asyncHandler } from "../utils";

const router = Router();

router.post("/signup", validate(signupSchema), asyncHandler(signup));

router.post("/login", validate(loginSchema), asyncHandler(login));

router.post("/logout", requireAuth, logout);

router.get("/me", requireAuth, getCurrentUser);
export default router;
