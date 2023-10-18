import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, setDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import { useContext } from "react";
import { authContext } from "../../Auth";
import uuid from "react-uuid";
import "./Dashboard.css";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Dashboard() {
  const [addATodoList, setaddATodoList] = useState(false);
  const [name, setName] = useState("");
  const [viewer, setViewer] = useState("");
  const [getTodolists, setGetTodolists] = useState([]);
  const [loading, setLoading] = useState(true);

  const authent = useContext(authContext);
  console.log(authent);

  const todolists = collection(db, "Todos");
  const tasks = collection(db, "tasks");
  const authents = useContext(authContext);
  const todoListId = uuid();

  // Créez une fonction pour récupérer les données de la collection "todos"
  const fetchTodoList = () => {
    onSnapshot(todolists, (snapshot) => {
      let allTodolists = [];
      snapshot.docs.forEach((doc) => {
        allTodolists.push({ ...doc.data() });
        const todolistsToDisplay = allTodolists.filter(
          (el) => el.authorId == authent.uid
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
    setDoc(doc(db, "Todos", name), {
      todoListId: todoListId,
      authorId: authent.uid,
      title: name,
      completed: false,
      viewer: {
        1: viewer,
      },
    });
  };

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
          getTodolists.map((el, index) => (
            <div key={index} style={{ width: "100px", height: "100px" }}>
              <DeleteIcon />
              <NavLink
                key={index}
                to={"/dashboard/todo/" + el.todoListId}
                className="todolist">
                {el.title}
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
}
