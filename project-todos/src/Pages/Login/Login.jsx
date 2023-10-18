import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import TextField from "@mui/material/TextField";
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
    <div className="login">
      <h1>Connexion</h1>
      <TextField
        sx={{ width: "100%",maxWidth:"500px" }}
        type="email"
        name="email"
        label="Email"
        variant="outlined"
        onChange={handleEmail}
        value={email}
      />
      <TextField
        sx={{ width: "100%",maxWidth:"500px" }}
        type="password"
        label="Mots de passe"
        name="password"
        variant="outlined"
        onChange={handlePass}
        value={pass}
      />

      <Button   sx={{ width: "100%",maxWidth:"500px",padding: '1em',backgroundColor:'#4440FF' }} variant="contained" type="submit" onClick={connect}>
        login
      </Button>

   
      <NavLink to="/">Pas de compte ?</NavLink>
    </div>
  );
}
