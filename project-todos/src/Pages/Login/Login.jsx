import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import "./login.css";
import { NavLink } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const connect = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div id="Login">
      <div className="login">
        <h1>Login</h1>
        <Input
          sx={{ width: "100%" }}
          type="mail"
          name="mail"
          onChange={handleEmail}
          value={email}
        />
        <Input
          sx={{ width: "100%" }}
          type="password"
          name="password"
          onChange={handlePass}
          value={pass}
        />

        <Button variant="contained" type="submit" onClick={connect}>
          login
        </Button>
        <NavLink to="/">Pas de compte ?</NavLink>
      </div>
    </div>
  );
}
