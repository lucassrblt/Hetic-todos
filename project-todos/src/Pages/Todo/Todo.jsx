import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Firebase";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  getDocs,
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
  const [currentTodo, setCurrentTodo] = useState("");

  const { id } = useParams();
  const taskId = uuid();
  const tasksList = collection(db, "Tasks");
  const todoLists = collection(db, "Todos");

  const fetchTask = () => {
    onSnapshot(tasksList, (snapshot) => {
      let allTasks = [];
      snapshot.docs.forEach((doc) => {
        allTasks.push({ ...doc.data() });
        // console.log(allTasks[0].todoListId);
        // console.log(id);

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
      id: taskId,
      todoListId: id,
      title: inputTodo,
      completed: false,
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

  const changeCompletion = (item) => {
    item.completion ? (item.completion = false) : (item.completion = true);
    console.log(item);
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
          tasks.map((todo, index) => (
            <li key={index}>
              <Button id="button_delete" onClick={() => deleteThing(todo)}>
                Delete
              </Button>
              <span>{todo.title}</span>
              <Checkbox
                sx={{ color: "white" }}
                id="checkbox_todo"
                type="checkbox"
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
