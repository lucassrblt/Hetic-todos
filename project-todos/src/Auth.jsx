import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";

export const authContext = createContext();

export default function Auth({ children }) {
  const [authent, setAuthent] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthent(user);
      } else {
        setAuthent(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  return (
    <authContext.Provider value={authent}>{children}</authContext.Provider>
  );
}
