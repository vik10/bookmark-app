import { api } from "./api";
import type { bookmarkCreateType } from "../../../shared";

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

type BookmarkQueryParams = {
  sortBy?: "title" | "created_at" | "url" | "id";
  sortOrder?: "asc" | "desc";
  searchQuery?: string;
};

export const bookmarkApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createBookmark: builder.mutation<
      { data: { id: number } },
      bookmarkCreateType
    >({
      query: (data) => ({
        url: "/bookmarks/create-bookmark",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Bookmarks"],
    }),
    getBookmarks: builder.query<BookmarkListResponse, BookmarkQueryParams>({
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
