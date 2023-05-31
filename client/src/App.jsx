import { Box } from "@chakra-ui/react";
import "./App.css";
import Navbar from "./components/Navbar";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <Box>
      <Box position="fixed" top={0} width="100%" zIndex="999">
        <Navbar />
      </Box>
      <Box className="App" paddingTop="60px">
        <AllRoutes />
      </Box>
    </Box>
  );
}

export default App;
