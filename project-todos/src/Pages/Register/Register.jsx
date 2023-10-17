import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import "./register.css";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        use;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div id="register">
      <div className="login">
        <h1>Register</h1>
        <Input
          sx={{ width: "100%" }}
          type="text"
          onInput={handleEmail}
          value={email}
        />
        <Input
          sx={{ width: "100%" }}
          type="text"
          onInput={handlePass}
          value={pass}
        />
        <Button variant="contained" type="submit" onClick={register}>
          SignIn
        </Button>
        <NavLink to="/login">Déja un compte ?</NavLink>
      </div>
    </div>
  );
}
