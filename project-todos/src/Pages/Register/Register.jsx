import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { NavLink } from "react-router-dom";
import '../Login/login.css'
import { collection, setDoc, doc } from "firebase/firestore";

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
        console.log(user);
        // Ajoute le user dans une collection firestore
        setDoc(doc(db, "User", email), {
          id: user.uid,
          email: email,
        });
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        
        const errorMessage = error.message;
      });
  };

  return (
    <div id="register" className="login">
      
        <h1>Inscription</h1>
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
        <Button   sx={{ width: "100%",maxWidth:"500px",backgroundColor:'#4440FF',padding:'1em' }} variant="contained" type="submit" onClick={register}>
          SignIn
        </Button>
        <NavLink to="/login">Déja un compte ?</NavLink>
    
    </div>
  );
}
