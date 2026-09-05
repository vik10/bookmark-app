import { api } from "./api";
import type { CreateBookmarkType, QueryParamsType } from "../../../shared";

type Bookmark = {
  id: number;
  title: string;
  url: string;
  description?: string | null;
  created_at?: string;
  user_id?: number;
};

type BookmarkListResponse = {
  data: Bookmark[];
};

export const bookmarkApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createBookmark: builder.mutation<
      { data: { id: number } },
      CreateBookmarkType
    >({
      query: (data) => ({
        url: "/bookmarks",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Bookmarks"],
    }),
    getBookmarks: builder.query<BookmarkListResponse, QueryParamsType>({
      query: (params = {}) => ({
        url: "/bookmarks",
        method: "GET",
        params,
      }),
      providesTags: ["Bookmarks"],
    }),
  }),
});

export const { useCreateBookmarkMutation, useGetBookmarksQuery } = bookmarkApi;
