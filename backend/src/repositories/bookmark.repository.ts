import { createBookmarkType, queryParamsType } from "../../../shared";
import { pool } from "../config";

export const insertBookmark = async (
  data: createBookmarkType & { userId: string },
) => {
  const { title, url, description, userId } = data;
  const result = await pool.query(
    "INSERT INTO bookmarks (title,url,description,user_id) VALUES ($1,$2,$3,$4) RETURNING *",
    [title, url, description, userId],
  );
  return result.rows[0];
};

export const getBookmarksByUserId = async (
  userId: number,
  queryParams: queryParamsType,
) => {
  const { sort = "", search = "" } = queryParams;
  const [sortBy, sortOrder] = sort.split(":");

  const allowedSortColumns: Record<string, string> = {
    title: "title",
    created_at: "created_at",
    url: "url",
    id: "id",
  };

  const sortColumn = allowedSortColumns[sortBy] || "created_at";
  const order = sortOrder.toLowerCase() === "asc" ? "ASC" : "DESC";
  const searchPattern = `%${search.trim().toLowerCase()}%`;

  const query = `SELECT * FROM bookmarks
                  WHERE LOWER(title) LIKE $2 
                  AND user_id=$1
                   ORDER BY ${sortColumn} ${order}`;
  const result = await pool.query(query, [userId, searchPattern]);
  return result.rows;
};
