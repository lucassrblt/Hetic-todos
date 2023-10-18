import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  setDoc,
  doc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { useContext } from "react";
import { authContext } from "../../Auth";
import uuid from "react-uuid";
import "./Dashboard.css";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";import DeleteIcon from "@mui/icons-material/Delete";

export default  function Dashboard() {
  const [addATodoList, setaddATodoList] = useState(false);
  const [name, setName] = useState("");
  const [viewer, setViewer] = useState("");
  const [getTodolists, setGetTodolists] = useState([]);
  const [loading, setLoading] = useState(true);

  const authent = useContext(authContext);
  console.log(authent);
  console.log(authent.reloadUserInfo.email);

  const todolists = collection(db, "Todos");

  const id = uuid();
  
  // Créez une fonction pour récupérer les données de la collection "todos"
  const fetchTodoList = () => {
    onSnapshot(todolists, (snapshot) => {
      let allTodolists = [];
      snapshot.docs.forEach((doc) => {
        allTodolists.push({ ...doc.data() });
        const todolistsToDisplay = allTodolists.filter(
          (el) =>
            el.authorId == authent.uid ||
            el.viewer.includes(authent.reloadUserInfo.email)
        );
        setGetTodolists(todolistsToDisplay);
        setLoading(false);
        console.log(getTodolists);
      });
    });
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  // Permet  de créer une nouvelle todo list

  const create = () => {
    setDoc(doc(db, "Todos", id), {
      id: id,
      authorId: authent.uid,
      title: name,
      completed: false,
      viewer: [],
    });
  };

  // Supprimer une todolist
  const deleteTodo = (todoId) => {
    const todoToDelete = doc(db, "Todos", todoId);
    deleteDoc(todoToDelete);
  };

  const signingOut = () => {
    signOut(auth);
    useNavigate("/login");
  };

  return (
    <div className="Dashboard">
      <h1>Dashboard</h1>
      
      <div className="Ajout_box"><div className="Button_input_ajout">
      <Button sx={ {padding: '1.1em',maxHeight:'50px' }} variant="contained" onClick={() => setaddATodoList(!addATodoList)} className="Ajouter">Ajouter une To do list +</Button>
      {addATodoList && (
        <div className="input_todolist apparition">
        
          <TextField type="text" onChange={(e) => setName(e.target.value)} placeholder="Titre" label="Titre" />
{/*         
          <TextField
          label="Collaborateur"
            type="mail"
            placeholder="admin@admin.com"
            onChange={(e) => setViewer(e.target.value)}
          /> */}
          <Button sx={ {padding: '1.1em' }} variant="contained"  onClick={create}>Créer</Button>
        </div>

      )}</div>
      <div className="box__todolist">
        {!loading &&
          getTodolists.map((el, index) => (
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#FAFAFA",
              }}
            >
              <DeleteIcon onClick={() => deleteTodo(el.id)} />
              <NavLink
                key={index}
                to={"/dashboard/todo/" + el.id}
                className="todolist apparition"
              >
                {el.title}
              </NavLink>
            </div>
          ))}
      </div>
      </div>
    </div>
  );
}