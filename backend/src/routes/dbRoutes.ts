import { Router } from "express";
import {
  signupUser,
  testDatabaseConnection,
} from "../controllers/dbController.js";

const router = Router();

router.get("/db-test", testDatabaseConnection);

router.post("/signup", signupUser);

export default router;
