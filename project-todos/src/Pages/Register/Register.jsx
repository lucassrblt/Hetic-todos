import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";

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
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="login">
      <input type="text" onChange={handleEmail} value={email} />
      <input type="text" onChange={handlePass} value={pass} />
      <button type="submit" onClick={register}>
        SignIn
      </button>
    </div>
  );
}
