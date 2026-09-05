import z from "zod";

export const createBookmarkSchema = z.object({
  title: z.string().trim().min(1, "Title is requried").max(255),
  url: z.url("Enter a valid URl"),
  description: z.string(),
});
