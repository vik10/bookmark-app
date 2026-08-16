import { Route, Routes } from "react-router";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/:path" element={<div>Bookmark</div>} />
    </Routes>
  );
};
