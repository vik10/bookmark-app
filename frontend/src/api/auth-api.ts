import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axios-base-query";
import type { ApiResponse } from "../../../shared";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: axiosBaseQuery({
    baseUrl: "/auth",
  }),

  tagTypes: ["Auth"],

  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        data,
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Auth"],
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    authenticateUser: builder.query<
      ApiResponse<{ isAuthenticated: boolean }>,
      void
    >({
      query: () => ({
        url: "/me",
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
