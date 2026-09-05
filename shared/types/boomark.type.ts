import z from "zod";
import { createBookmarkSchema } from "../schemas";

export type createBookmarkType = z.infer<typeof createBookmarkSchema>;

export interface queryParamsType {
  sort?: string;
  search?: string;
}
