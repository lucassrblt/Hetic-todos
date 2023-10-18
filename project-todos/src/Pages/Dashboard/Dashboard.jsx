import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import {doc, setDoc } from "firebase/firestore";
import {db} from "../../Firebase";
import { useState } from "react";

const signingOut = () => {
  signOut(auth);
  useNavigate("/login");
};

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");

  const handlechange = (e) => {
    setTitle(e.target.value);
  };

  const savedb= async ()=>{
    try{
    const docRef = setDoc(doc(db, "Todos", "victan"), {
       title: title,
       completed: false,
      mail : email,
       ID: new Date(),
      
    });
    await docRef;
    console.log("Document Ajouter: ", docRef.id);}
    catch(e){
      console.error("erreur lors de l'ajout: ", e);
    }

  }
  const mailchange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  }

  return (
    <div>
      <p>Dashboard</p>
      <input type="text" name="title" onChange={handlechange} value={title}/>
      <input type="text" name="email" onChange={mailchange} />
      <button onClick={savedb}>Sauvegarder</button>
      <button
        style={{ width: "40px", height: "40px" }}
        onClick={signingOut}
      ></button>
    </div>
  );
}
