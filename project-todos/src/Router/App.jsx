import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "../Components/Nav/nav";
import Register from "../Pages/Register/Register";
import "../../src/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Auth>
        <Nav />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Auth>
    </BrowserRouter>
  );
}

export default App;
