import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import { useNavigate } from "react-router-dom";

export const authContext = createContext();

export default function Auth(props) {
  const [authent, setAuthent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthent(user);
        navigate("/dashboard");
      } else {
        setAuthent(null);
        // navigate("/login");
      }
    });
    return () => {
      listen();
    };
  }, []);

  return (
    <authContext.Provider value={authent}>
      {props.children}
    </authContext.Provider>
  );
}
