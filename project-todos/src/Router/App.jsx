import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "../Components/Nav/nav";
import Register from "../Pages/Register/Register";
import "../../src/index.css";
import Login from "../Pages/Login/Login";
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
