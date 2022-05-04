import { Box, Container } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./organisms/Menu";
import Data from "./pages/Data";
import Graph from "./pages/Graph";

function App() {
  return (
      <Container
        disableGutters
        sx={{flexDirection: "row", display:"flex", minHeight:"100vh" }}
        maxWidth="lg"
      >
        <Router>
          <Menu />
          <Routes>
            <Route path="/" element={<Graph />}></Route>
            <Route path="/data" element={<Data />}></Route>
          </Routes>
        </Router>
      </Container>
  );
}

export default App;
