import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  let loggedIn = false;

  async function check() {
    const response = await fetch("http://localhost:4000/user/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    if (data.message === "user fetched") {
      return true;
    } else {
      return false;
    }
  }

  if (localStorage.getItem("token")) {
    loggedIn = check();
  }
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}
