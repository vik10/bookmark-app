import { useAuthenticateUserQuery } from "../api/auth-api";

export const useAuth = () => {
  const { data, isLoading } = useAuthenticateUserQuery();

  return {
    isAuthenticated: data?.data?.isAuthenticated,
    isLoading,
    userName: data?.data?.user?.name,
  };
};
