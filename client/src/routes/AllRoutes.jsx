import Blogspage from "../pages/Blogspage";
import Createblogpage from "../pages/Createblogpage";
import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
import Myblogspage from "../pages/Myblogspage";
import Signuppage from "../pages/Signuppage";
import { Route, Routes } from "react-router-dom";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/createblog" element={<Createblogpage />} />
      <Route path="/myblogs" element={<Myblogspage />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/signup" element={<Signuppage />} />
      <Route path="/blog/:title" element={<Blogspage />} />
    </Routes>
  );
}
