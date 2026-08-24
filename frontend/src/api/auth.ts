import type { SignupData } from "../../../shared";
import { apiRequest } from "./axiosClient";

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  status: string;
  message: string;
  user?: unknown;
};

export const signupUser = (payload: SignupData) =>
  apiRequest<AuthResponse>({
    method: "POST",
    url: "/auth/signup",
    data: payload,
  });

export const loginUser = (payload: LoginPayload) =>
  apiRequest<AuthResponse>({
    method: "POST",
    url: "/auth/login",
    data: payload,
  });
