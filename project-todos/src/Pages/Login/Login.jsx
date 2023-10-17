import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

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
      <Input
        sx={{ width: "100%" }}
        type="text"
        onChange={handleEmail}
        value={email}
      />
      <Input
        sx={{ width: "100%" }}
        type="text"
        onChange={handlePass}
        value={pass}
      />

      <Button variant="contained" type="submit" onClick={connect}>
        login
      </Button>

      <button onClick={() => signOut(auth)}>logout</button>
    </div>
  );
}
