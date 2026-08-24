import { Router } from "express";
import { testDatabaseConnection } from "../controllers";

const router = Router();

router.get("/db-test", testDatabaseConnection);

export default router;
