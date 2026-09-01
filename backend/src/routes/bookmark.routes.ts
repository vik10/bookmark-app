import { requireAuth, validate } from "./../middleware";
import { Router } from "express";
import {
  bookmarkCreation,
  getBookmarksByUserId,
  testDatabaseConnection,
} from "../controllers";
import { bookmarkCreateSchema } from "../../../shared/schemas/bookmark.schema";
import { asyncHandler } from "../utils";

const router = Router();

router.get("/db-test", requireAuth, testDatabaseConnection);

router.post(
  "/create-bookmark",
  requireAuth,
  validate(bookmarkCreateSchema),
  asyncHandler(bookmarkCreation),
);

router.get("/", requireAuth, asyncHandler(getBookmarksByUserId));

export default router;
