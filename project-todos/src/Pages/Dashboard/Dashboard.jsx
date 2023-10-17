import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";
import { getDocs } from "firebase/firestore";
import { useContext } from "react";
import { authContext } from "../../Auth";
import uuid from "react-uuid";

export function Dashboard() {
  const [addATodoList, setaddATodoList] = useState(false);
  const [name, setName] = useState("");
  const [viewer, setViewer] = useState("");
  const [todolists, setTodolists] = useState([]);
  const [loading, setLoading] = useState(true);

  const authents = useContext(authContext);

  // Créez une fonction pour récupérer les données de la collection "todos"
  const fetchTodos = async () => {
    const todosCollection = collection(db, "Todos");
    try {
      const getData = await getDocs(todosCollection);

      const todos = [];
      getData.forEach((doc) => {
        // Récupérez les données de chaque document
        todos.push(doc.data());
      });
      console.log(todos);
      setTodolists(todos);
      setLoading(false);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de la collection."
      );
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Permet  de créer une nouvelle todo list
  const create = async () => {
    try {
      const docRef = setDoc(doc(db, "Todos", name), {
        ID: uuid(),
        title: name,
        completed: false,
        viewer: viewer,
      });
      console.log("todolist create !");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const signingOut = () => {
    signOut(auth);
    useNavigate("/login");
  };

  return (
    <div>
      <p>Dashboard</p>
      <button style={{ width: "40px", height: "40px" }} onClick={signingOut}>
        Déconnexion
      </button>
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
      {!loading &&
        todolists.map((el, index) => (
          <li component={Link} to={"/dashboard/todo/" + el.ID}>
            {el.title}
          </li>
        ))}
    </div>
  );
}
