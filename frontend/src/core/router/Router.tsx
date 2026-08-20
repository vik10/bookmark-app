import { Route, Routes } from "react-router";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";

const Router = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Router;
