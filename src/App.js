import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [todos, setTodos] = useState(() => {
    if (localStorage.getItem("todos"))
      return JSON.parse(localStorage.getItem("todos"));
    else return [];
  });
  const [text, setText] = useState("");

  const addTodo = () => {
    const todo = {
      id: Date.now(),
      text: text,
    };
    const todosCopy = [...todos, todo];
    setTodos(todosCopy);
    localStorage.setItem("todos", JSON.stringify(todosCopy));
    setText("");
  };

  const removeTodo = (id) => {
    const todosCopy = todos.filter((todo) => todo.id !== id);
    setTodos(todosCopy);
    localStorage.setItem("todos", JSON.stringify(todosCopy));
  };

  return (
    <>
      <Box
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />
        <Button onClick={addTodo} variant="contained">Submit</Button>
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <List dense={false}>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon onClick={() => removeTodo(todo.id)} />
                </IconButton>
              }
            >
              <ListItemText
                primary={todo.text}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

export default App;
