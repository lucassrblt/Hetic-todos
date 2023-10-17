import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";

const signingOut = () => {
  signOut(auth);
  useNavigate("/login");
};

export function Dashboard() {
  return (
    <div>
      <p>Dashboard</p>
    </div>
  );
}
