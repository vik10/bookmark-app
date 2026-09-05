import z from "zod";
import { createBookmarkSchema } from "../schemas";

export type CreateBookmarkType = z.infer<typeof createBookmarkSchema>;

export interface QueryParamsType {
  sort?: string;
  search?: string;
}
