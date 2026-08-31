import { requireAuth } from "./../middleware";
import { Router } from "express";
import { testDatabaseConnection } from "../controllers";

const router = Router();

router.get("/db-test", requireAuth, testDatabaseConnection);

export default router;
