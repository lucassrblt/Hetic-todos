import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import "./login.css"
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
        type="email"
        label="Mots de passe"
        name="email"
        variant="outlined"
        onChange={handlePass}
        value={pass}
      />

      <Button  sx={{ width: "100%",maxWidth:"500px" }} variant="contained" type="submit" onClick={connect}>
        login
      </Button>

      {/* <button onClick={() => signOut(auth)}>logout</button> */}
    </div>
  );
}
