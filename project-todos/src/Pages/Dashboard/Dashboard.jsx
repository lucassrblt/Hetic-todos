import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";
import { getDocs } from "firebase/firestore";
import { useContext } from "react";
import { authContext } from "../../Auth";
import uuid from "react-uuid";
import "./Dashboard.css";



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
      <h1>Dashboard</h1>

      <button onClick={() => setaddATodoList(!addATodoList)}>+</button>
      {addATodoList && (
        <div>
          <label htmlFor="">Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
          <label htmlFor="">Ajouter des colaborateurs</label>
          <input
            type="mail"
            placeholder="admin@admin.com"
            onChange={(e) => setViewer(e.target.value)}
          />
          <button onClick={create}>Créer</button>
        </div>
      )}
      <div className="box__todolist">
        {!loading &&
          todolists.map((el, index) => (
            <NavLink
              key={index}
              to={"/dashboard/todo/" + el.ID}
              className="todolist"
            >
              {el.title}
            </NavLink>
          ))}
      </div>
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
