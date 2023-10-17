import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "../Components/Nav/nav";
import Register from "../Pages/Register/Register";
import "../../src/index.css";
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
