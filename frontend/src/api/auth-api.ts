import { api } from "./api";
import type { ApiResponse } from "../../../shared";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Auth"],
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Auth"],
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "Bookmarks"],
    }),

    authenticateUser: builder.query<
      ApiResponse<{
        isAuthenticated: boolean;
        user?: { id: number; name: string; email: string };
      }>,
      void
    >({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useAuthenticateUserQuery,
} = authApi;
