import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

type AxiosBaseQueryArgs = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
};

type AxiosBaseQueryError = {
  status?: number;
  message: string;
};

export const axiosBaseQuery =
  ({
    baseUrl = "",
  }: {
    baseUrl?: string;
  } = {}) =>
  async ({ url, method = "GET", data, params }: AxiosBaseQueryArgs) => {
    try {
      const result = await axios({
        baseURL:
          import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
        url: `${baseUrl}${url}`,
        method,
        data,
        params,
        withCredentials: true,
      });

      return {
        data: result.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      return {
        error: {
          status: axiosError.response?.status,
          message:
            axiosError.response?.data?.message ||
            axiosError.message ||
            "Request failed",
        } satisfies AxiosBaseQueryError,
      };
    }
  };
