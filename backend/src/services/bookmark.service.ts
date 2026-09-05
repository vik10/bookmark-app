import { CreateBookmarkType, QueryParamsType } from "../../../shared";
import { insertBookmark, getBookmarksByUserId } from "../repositories";

export const createBookmarkService = async (
  data: CreateBookmarkType & { userId: string },
) => {
  const bookmark = await insertBookmark(data);
  return {
    message: "bookmark created successfully",
    data: { id: bookmark.id },
  };
};

export const getBookmarksByUserIdService = async (
  userId: number,
  query: QueryParamsType,
) => {
  const result = await getBookmarksByUserId(userId, query);
  return {
    data: result,
  };
};
