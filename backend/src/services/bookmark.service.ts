import { bookmarkCreateType, queryParamsType } from "../../../shared";
import { creatBookarkInTable, getBookmarksByUserId } from "../repositories";

export const createBookmark = async (
  data: bookmarkCreateType & { userId: string },
) => {
  const bookmark = await creatBookarkInTable(data);
  return {
    message: "bookmark created successfully",
    data: { id: bookmark.id },
  };
};

export const handleGetBookmarksByUserId = async (
  userId: number,
  query: queryParamsType,
) => {
  const result = await getBookmarksByUserId(userId, query);
  return {
    data: result,
  };
};
