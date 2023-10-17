import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "../Components/Nav/nav";
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
