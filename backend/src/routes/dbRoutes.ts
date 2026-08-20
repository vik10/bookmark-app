import { Router } from "express";
import {
  loginUser,
  signupUser,
  testDatabaseConnection,
} from "../controllers/dbController.js";

const router = Router();

router.get("/db-test", testDatabaseConnection);

router.post("/signup", signupUser);

router.post("/login", loginUser);

export default router;
