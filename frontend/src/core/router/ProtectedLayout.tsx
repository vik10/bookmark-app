import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/use-auth";
import { Header } from "../../components";

const ProtectedLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Header />;
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
