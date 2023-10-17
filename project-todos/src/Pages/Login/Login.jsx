import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../Firebase";

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
    <div className="form">
      <form className="input-group">
        <div className="label-input">
          <label htmlFor="" className="label">
            Email
          </label>
          <input
            type="text"
            className="input required-border"
            onChange={handleEmail}
            value={email}
          />
          <label htmlFor="" className="label">
            Password
          </label>
          <input
            type="password"
            className="input required-border"
            onChange={handlePass}
            value={pass}
          />
          <button type="submit" onClick={connect}>
            Login
          </button>
          <button onClick={() => signOut(auth)}>logout</button>
        </div>
      </form>
    </div>
  );
}
