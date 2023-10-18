import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Firebase";
import React from "react";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { AccordionDetails, AccordionSummary, Input, Typography } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import Checkbox from "@mui/material/Checkbox";
import uuid from "react-uuid";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputTodo, setInputTodo] = useState(false);
  const [filterz, setFilterz] = useState("");
  const { id } = useParams();
  const [value, setValue] = React.useState("1");

  const handleChangetabs = (event, newValue) => {
    setValue(newValue);
  };

  const tasksList = collection(db, "Tasks");

  const taskId = uuid();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const fetchTask = () => {
    onSnapshot(tasksList, (snapshot) => {
      let allTasks = [];
      snapshot.docs.forEach((doc) => {
        allTasks.push({ ...doc.data() });
        // console.log(allTasks[0].todoListId);
        // console.log(id);

        const tasksToDisplay = allTasks.filter((el) => el.todoListId == id);
        setTasks(tasksToDisplay);
        console.log(tasks);
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

  const deleteThing = (item) => {
    const docRef = doc(db, "Tasks", item.taskId);
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
  const [filter, setFilter] = useState(null);
  return (
    <div>
      <div className="todopage">
        <div className="add_task">
        <TextField
          sx={{ color: "black" }}
          label="Task"
          variant="outlined"
          type="text"
          onInput={(e) => {
            setInputTodo(e.target.value);
          }}
        />
        <Button onClick={saveTodoList }variant='contained'>save</Button></div>
        <div id="button_filter">
        <Tabs  value={value}
        onChange={handleChangetabs}
        aria-label="wrapped label tabs example">
      <Tab
        label="ALL"
        value="1"
        active={filter === null}
        onClick={() => setFilter(null)}
      />
      <Tab
        label="done"
        value="2"
        active={filter === false}
        onClick={() => setFilter(false)}
      />
      <Tab
      value="3"
        label="not done yet"
        active={filter === true}
        onClick={() => setFilter(true)}
      />
    </Tabs>
        </div>
      </div>
      <ul className="toDoList">
        {/* {!loading && tasks.map((el, index) => <p key={index}>{el.title}</p>)} */}
        {!loading &&
          tasks
            .filter((el) => el.completed !== filter)
            .map((todo, index) => (
              <li key={index}>
              
                <Accordion  expanded={expanded === index} onChange={handleChange(index)} sx={{ width:'80%'}} TransitionProps={{ unmountOnExit: true }} className="apparition"><AccordionSummary><Typography  sx={{ width: '33%', flexShrink: 0 }}>{todo.title}</Typography>  <Checkbox
                  sx={{ color: "black" }}
                  id="checkbox_todo"
                  type="checkbox"
                  checked={todo.completed}
                  onClick={() => changeCompletion(todo)}
                /></AccordionSummary>
                <AccordionDetails>
                <Button
                  sx={{ backgroundColor: "red" }}
                  id="button_delete"
                  variant="contained"
                  onClick={() => deleteThing(todo)}>
                  Delete
                </Button>
                </AccordionDetails>
                </Accordion>
                {console.log(todo.completed)}
              
              </li>
            ))}
      </ul>
    </div>
  );
}
