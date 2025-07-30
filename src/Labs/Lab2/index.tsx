import { useState } from "react";
import "./index.css";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const initialTodos: Todo[] = [
  { id: 1, text: "Pet the cat", completed: false },
  { id: 2, text: "Do CS homework", completed: false },
];

export default function Lab2() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [input, setInput] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // Add new todo
  const addTodo = () => {
    if (input.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: input.trim(), completed: false }
      ]);
      setInput("");
    }
  };

  // Select for edit
  const selectTodo = (id: number, text: string) => {
    setSelectedId(id);
    setEditText(text);
  };

  // Update todo
  const updateTodo = () => {
    if (selectedId === null) return;
    setTodos(todos.map(todo =>
      todo.id === selectedId ? { ...todo, text: editText } : todo
    ));
    setSelectedId(null);
    setEditText("");
  };

  // Delete todo
  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
      setEditText("");
    }
  };

  // Toggle completed
  const toggleCompleted = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="lab2-container">
      <h2>Lab 2: To-Do List</h2>
      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {selectedId !== null && (
        <div className="edit-row">
          <input
            type="text"
            value={editText}
            onChange={e => setEditText(e.target.value)}
          />
          <button onClick={updateTodo}>Update</button>
          <button onClick={() => setSelectedId(null)}>Cancel</button>
        </div>
      )}

      <ul>
        {todos.map(todo => (
          <li key={todo.id}
              className={todo.completed ? "todo-completed" : ""}>
            <span
              onClick={() => toggleCompleted(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : undefined,
                cursor: "pointer"
              }}
            >
              {todo.text}
            </span>
            <button className="select-btn"
                    onClick={() => selectTodo(todo.id, todo.text)}>
              Edit
            </button>
            <button className="remove-btn"
                    onClick={() => removeTodo(todo.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* CSS rubric requirements demo */}
      <hr />
      <h3>CSS Selectors Demo</h3>
      <p id="white-on-red">white on red paragraph</p>
      <p id="black-on-yellow">black on yellow paragraph</p>
      <p className="blue-on-yellow">blue on yellow paragraph</p>
      <h4 className="blue-on-yellow">blue on yellow heading</h4>
      <div id="white-on-red-div">
        white on red DIV
        <span className="blue-on-yellow-span">blue on yellow small span within the DIV</span>
      </div>
      <h4 className="blue-on-white">blue on white heading</h4>
      <p className="red-on-white">red on white text</p>
      <p className="green-on-white">green on white text</p>
      <h4 className="white-on-blue">white on blue heading</h4>
      <p className="black-on-red">black on red paragraph</p>
      <span className="white-on-green-span">white on green span</span>
      <div className="fat-red-border">fat red border</div>
      <div className="thin-blue-dashed">thin blue dashed border</div>
      <div className="fat-yellow-border">fat yellow border, blue background, big margin</div>
    </div>
  );
}
