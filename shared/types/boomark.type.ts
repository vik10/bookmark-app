import z from "zod";
import { bookmarkCreateSchema } from "../schemas";

export type bookmarkCreateType = z.infer<typeof bookmarkCreateSchema>;

export interface queryParamsType {
  sortBy?: string;
  sortOrder?: string;
  searchQuery?: string;
}
