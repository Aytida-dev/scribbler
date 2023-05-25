import { Box } from "@chakra-ui/react";
import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box >
      <Navbar />
      <Box className="App">
        <AllRoutes />
      </Box>
    </Box>
  );
}

export default App;
