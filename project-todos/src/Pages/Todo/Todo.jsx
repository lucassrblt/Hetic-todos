import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection } from "firebase/firestore";
import { db } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";

export function Todo() {
  const [tasks, setTasks] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchTodos = async () => {
    const docRef = doc(db, "Todos", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  //   const fetchTodos = async () => {
  //     const singleTodo = collection(db, "todolist");
  //     try {
  //       const getData = await getDocs(singleTodo);

  //       const todos = [];
  //       getData.forEach((doc) => {
  //         // Récupérez les données de chaque document
  //         todos.push(doc.data());
  //       });
  //       setTasks(todos);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error(
  //         "Erreur lors de la récupération des données de la collection."
  //       );
  //     }
  //   };

  useEffect(() => {
    fetchTodos();
  }, []);

  return <div></div>;
}
