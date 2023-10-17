import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase";
import "./register.css";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

export default function Register() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const register = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    // Ajoute le user dans une collection firestore
    try {
      const docRef = await addDoc(collection(db, "users", title), {
        email: email,
        pass: pass,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
