import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Firebase";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { Input } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import uuid from "react-uuid";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputTodo, setInputTodo] = useState(false);
  const [filter, setFilter] = useState("");
  const [addViewer, setAddViewer] = useState("");
  const { id } = useParams();
  const taskId = uuid();
  const tasksList = collection(db, "Tasks");
  const todoLists = collection(db, "Todos");

  const fetchTask = () => {
    onSnapshot(tasksList, (snapshot) => {
      let allTasks = [];
      snapshot.docs.forEach((doc) => {
        allTasks.push({ ...doc.data() });
        const tasksToDisplay = allTasks.filter((el) => el.todoListId == id);
        setTasks(tasksToDisplay);
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const saveTodoList = () => {
    setDoc(doc(db, "Tasks", taskId), {
      todoListId: id,
      title: inputTodo,
      completed: false,
      taskId: taskId,
    });
  };

  // Ajouter des personnes à une todolist
  const addingViewer = () => {
    let allTodolists = [];
    getDocs(todoLists).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        // console.log({ ...doc.data() });
        // console.log(doc.data());
        allTodolists.push(doc.data());
      });
      const reachTodo = allTodolists.filter((el) => el.id == id);
      const newViewers = [...reachTodo[0].viewer, addViewer];
      const docRef = doc(db, "Todos", id);
      updateDoc(docRef, { viewer: newViewers });
    });
  };

  const deleteThing = (item) => {
    const docRef = doc(db, "Tasks", item.taskId);

    console.log(docRef);
    deleteDoc(docRef);
    setTasks(tasks.filter((el) => el.taskId !== item.taskid));
    console.log(tasks);
  };

  const changeCompletion = (item) => {
    const docRef = doc(db, "Tasks", item.taskId);
    updateDoc(
      docRef,
      item.completed ? { completed: false } : { completed: true }
    );
  };

  return (
    <div>
      <div>
        <Input
          sx={{ color: "black" }}
          label="Standard"
          variant="To do list"
          type="text"
          onInput={(e) => {
            setInputTodo(e.target.value);
          }}
        />
        <Button onClick={saveTodoList}>save</Button>
        <div id="button_filter">
          <ButtonGroup>
            <Button variant="contained" onClick={() => setFilter()}>
              ALL
            </Button>
            <Button variant="contained" onClick={() => setFilter(false)}>
              done
            </Button>
            <Button variant="contained" onClick={() => setFilter(true)}>
              not done yet
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <ul className="toDoList">
        {/* {!loading && tasks.map((el, index) => <p key={index}>{el.title}</p>)} */}
        {!loading &&
          tasks
            .filter((el) => el.completed !== filter)
            .map((todo, index) => (
              <li key={index}>
                <Button
                  sx={{ backgroundColor: "red" }}
                  id="button_delete"
                  onClick={() => deleteThing(todo)}
                >
                  Delete
                </Button>
                <span>{todo.title}</span>
                {console.log(todo.completed)}
                <Checkbox
                  sx={{ color: "black" }}
                  id="checkbox_todo"
                  type="checkbox"
                  checked={todo.completed}
                  onClick={() => changeCompletion(todo)}
                />
              </li>
            ))}
      </ul>
      <div>
        <Input
          variant="outlined"
          placeholder="johndoe@gmail.com"
          onChange={(e) => setAddViewer(e.target.value)}
        />
        <Button variant="contained" onClick={addingViewer}>
          Ajouter
        </Button>
      </div>
    </div>
  );
}
