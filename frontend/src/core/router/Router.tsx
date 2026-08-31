import { Route, Routes } from "react-router";
import Dashboard from "../../pages/Dashboard";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import ProtectedLayout from "./ProtectedLayout";

const Router = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Router;
