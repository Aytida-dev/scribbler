import { Route, Routes } from "react-router-dom";
import Blogspage from "../pages/Blogspage";
import Createblogpage from "../pages/Createblogpage";
import EditBlogPage from "../pages/EditBlogPage";
import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
import Myblogspage from "../pages/Myblogspage";
import Signuppage from "../pages/Signuppage";
import PrivateRoute from "./PrivateRoute";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/signup" element={<Signuppage />} />
      <Route path="/:id/:title" element={<Blogspage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/myblogs" element={<Myblogspage />} />
        <Route path="/createblog" element={<Createblogpage />} />
        <Route path="/edit/:id" element={<EditBlogPage />} />
      </Route>
    </Routes>
  );
}
