import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "../Components/Nav/nav";
import Register from "../Pages/Register/Register";
import "../../src/index.css";
import Auth from "../Auth";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";


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
