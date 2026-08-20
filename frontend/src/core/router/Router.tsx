import { Route, Routes } from "react-router";
import Dashboard from "../../pages/Dashboard";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";

const Router = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Router;
