import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Input } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import uuid from "react-uuid";

export default function Todo() {
  const [tasks, setTasks] = useState("");
  const [loading, setLoading] = useState(true);
  const [TodoList, setTodoList] = useState([]);
  const [inputTodo, setInputTodo] = useState(false);
  const [filter, setFilter] = useState();
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

  useEffect(() => {
    fetchTodos();
  }, []);

  const saveTodoList = async () => {

    db.collection("Todos").doc(id).update({
      inputTodo : {
          ID: uuid(),
           title: inputTodo,
          completed: false,
          todoId: id,
      }
    })

    const 
    // try {
    //   const docRef = setDoc(doc(db, "Todos", inputTodo), {
    //     inputTodo: {
    //       ID: uuid(),
    //       title: inputTodo,
    //       completed: false,
    //       todoId: id,
    //     },
    //   });
    //   await docRef;
    //   console.log("task create !");
    // } catch (e) {
    //   console.error("Error adding task: ", e);
    // }

    setTodoList([
      ...TodoList,
      { id: TodoList.length + 1, text: inputTodo, completion: false },
    ]);
  };
  const deleteThing = (item) => {
    setTodoList(TodoList.filter((el) => el.id !== item.id));
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
        {TodoList.filter((el) => el.completion !== filter).map(
          (todo, index) => (
            <li key={index}>
              <Button id="button_delete" onClick={() => deleteThing(todo)}>
                Delete
              </Button>
              <span>{todo.text}</span>
              <Checkbox
                sx={{ color: "white" }}
                id="checkbox_todo"
                type="checkbox"
                onClick={() => changeCompletion(todo)}
              />
            </li>
          )
        )}
      </ul>
    </div>
  );
}
