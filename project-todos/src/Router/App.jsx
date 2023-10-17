import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Auth from "../Auth";
import { Dashboard } from "../Pages/Dashboard/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Auth>
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
