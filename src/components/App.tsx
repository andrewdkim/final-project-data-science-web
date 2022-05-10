import { Box, Container } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./organisms/Menu";
import Main from "./pages/Main";

function App() {
  return (
      <Container
        disableGutters
        sx={{flexDirection: "row", display:"flex", minHeight:"100vh" }}
        maxWidth="lg"
      >
        <Router>
          {/* <Menu /> */}
          <Routes>
            <Route path="/" element={<Main />}></Route>
          </Routes>
        </Router>
      </Container>
  );
}

export default App;
