import { requireAuth, validate } from "./../middleware";
import { Router } from "express";
import {
  createBookmark,
  getBookmarksByUserId,
  testDatabaseConnection,
} from "../controllers";
import { createBookmarkSchema } from "../../../shared/schemas/bookmark.schema";
import { asyncHandler } from "../utils";

const router = Router();

router.get("/health-check", testDatabaseConnection);
router.post(
  "/",
  requireAuth,
  validate(createBookmarkSchema),
  asyncHandler(createBookmark),
);

router.get("/", requireAuth, asyncHandler(getBookmarksByUserId));

export default router;
