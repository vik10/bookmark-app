import { apiRequest } from "./axiosClient";

export type SignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  status: string;
  message: string;
  user?: unknown;
};

export const signupUser = (payload: SignupPayload) =>
  apiRequest<AuthResponse>({
    method: "POST",
    url: "/signup",
    data: payload,
  });

export const loginUser = (payload: LoginPayload) =>
  apiRequest<AuthResponse>({
    method: "POST",
    url: "/login",
    data: payload,
  });
