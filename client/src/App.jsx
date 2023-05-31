import { Box } from "@chakra-ui/react";
import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AllRoutes from "./routes/AllRoutes";

const userContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState();
  const [user, setUser] = useState({});

  useEffect(() => {
    init();
  }, []);

  async function init() {
    if (!localStorage.getItem("token")) {
      return;
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();

    if (data.message === "user fetched") {
      setUser(data.user);
      setLoggedIn(true);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    setUser({});
    setLoggedIn(false);
  };

  const login = () => {
    init();
  };

  const userContextValue = {
    loggedIn,
    user,
    login,
    logout,
  };

  return (
    <userContext.Provider value={userContextValue}>
      <Box position="fixed" top={0} width="100%" zIndex="999">
        <Navbar />
      </Box>
      <BrowserRouter>
        <Box className="App" paddingTop="60px">
          <AllRoutes />
        </Box>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
export { userContext };
