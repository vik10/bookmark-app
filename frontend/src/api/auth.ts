import { apiRequest } from "./axiosClient";

export type SignupPayload = {
  firstName: string;
  lastName: string;
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
