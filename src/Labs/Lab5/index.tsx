import React, { useState } from "react";

const initialAssignment = { id: 1, title: "React Assignment", due: "2024-08-15" };
const initialModule = { id: 101, name: "Module 1", description: "Basics" };
const initialTodos = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Practice Lab", completed: true },
  { id: 3, title: "Submit Homework", completed: false },
];

const Lab5: React.FC = () => {
  // For path/query parameter sections (mocked as local state)
  const [result, setResult] = useState<number | string>("");

  // For objects
  const [assignment, setAssignment] = useState(initialAssignment);
  const [module, setModule] = useState(initialModule);
  const [editTitle, setEditTitle] = useState(assignment.title);

  // For todos
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [asyncWelcome, setAsyncWelcome] = useState("");
  const [editTodoId, setEditTodoId] = useState<number>(1);
  const [editTodoTitle, setEditTodoTitle] = useState("");

  // Simulate async fetch for welcome message
  const fetchWelcome = () => {
    setTimeout(() => setAsyncWelcome("Welcome to Lab 5!"), 500);
  };

  // --- Path/Query Parameters ---
  const doOperation = (op: string, a: number, b: number) => {
    switch (op) {
      case "add": return setResult(a + b);
      case "sub": return setResult(a - b);
      case "mul": return setResult(a * b);
      case "div": return setResult(b === 0 ? "Div by 0" : (a / b));
      default: return setResult("");
    }
  };

  // --- Object Actions ---
  const updateAssignmentTitle = () => setAssignment({ ...assignment, title: editTitle });

  // --- Todos Actions ---
  const createTodo = () => {
    if (!newTodoTitle.trim()) return;
    setTodos([...todos, { id: Date.now(), title: newTodoTitle, completed: false }]);
    setNewTodoTitle("");
  };

  const deleteTodo = (id: number) => setTodos(todos.filter((t) => t.id !== id));
  const updateTodoToNodeJS = () =>
    setTodos(todos.map((t) => t.id === 1 ? { ...t, title: "NodeJS Assignment" } : t));

  // Simulate error on delete
  const tryDelete1234 = () => {
    if (!todos.find((t) => t.id === 1234)) setResult("Unable to Delete Todo with ID: 1234");
    else setTodos(todos.filter((t) => t.id !== 1234));
  };

  // Edit any todo
  const editTodo = () =>
    setTodos(todos.map((t) => t.id === editTodoId ? { ...t, title: editTodoTitle } : t));

  return (
    <div>
      <h2>Lab 5: Express and REST Practice</h2>
      {/* Path/Query Parameters */}
      <h3>Path & Query Parameters</h3>
      <div>
        <button onClick={() => doOperation("add", 34, 23)}>Add 34 + 23 (Path)</button>
        <button onClick={() => doOperation("sub", 34, 23)}>Subtract 34 - 23 (Path)</button>
        <button onClick={() => doOperation("mul", 34, 23)}>Multiply 34 × 23 (Path)</button>
        <button onClick={() => doOperation("div", 34, 23)}>Divide 34 ÷ 23 (Path)</button>
        <button onClick={() => doOperation("add", 34, 23)}>Add 34 + 23 (Query)</button>
        <button onClick={() => doOperation("sub", 34, 23)}>Subtract 34 - 23 (Query)</button>
        <button onClick={() => doOperation("mul", 34, 23)}>Multiply 34 × 23 (Query)</button>
        <button onClick={() => doOperation("div", 34, 23)}>Divide 34 ÷ 23 (Query)</button>
        <span style={{ marginLeft: 16 }}><b>Result:</b> {result}</span>
      </div>

      {/* Objects */}
      <h3>Working with Objects</h3>
      <div>
        <div>
          <b>Assignment Object:</b> {JSON.stringify(assignment)}
        </div>
        <div>
          <b>Assignment Title:</b> {assignment.title}
        </div>
        <div>
          <input
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
          />
          <button onClick={updateAssignmentTitle}>Update Title</button>
        </div>
        <div>
          <b>Module Object:</b> {JSON.stringify(module)}
        </div>
        <div>
          <b>Module Name:</b> {module.name}
        </div>
      </div>

      {/* Arrays */}
      <h3>Working with Arrays (Todos)</h3>
      <div>
        <div>
          <b>All Todos:</b>
          <ul>
            {todos.map(t => (
              <li key={t.id}>
                {t.title} {t.completed && "(completed)"}
                <button onClick={() => deleteTodo(t.id)} style={{ marginLeft: 8 }}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <b>Get Todo By ID:</b>
          <input
            type="number"
            value={editTodoId}
            onChange={e => setEditTodoId(Number(e.target.value))}
            style={{ width: 50, marginLeft: 8 }}
          />
          <span style={{ marginLeft: 8 }}>
            {todos.find(t => t.id === editTodoId)?.title || "Not found"}
          </span>
        </div>
        <div>
          <b>Completed Todos:</b>
          <ul>
            {todos.filter(t => t.completed).map(t => (
              <li key={t.id}>{t.title}</li>
            ))}
          </ul>
        </div>
        <div>
          <input
            value={newTodoTitle}
            onChange={e => setNewTodoTitle(e.target.value)}
            placeholder="New todo"
          />
          <button onClick={createTodo}>Create Todo</button>
        </div>
        <div>
          <button onClick={() => deleteTodo(1)}>Delete Todo with ID = 1</button>
        </div>
        <div>
          <button onClick={updateTodoToNodeJS}>Update Todo To NodeJS Assignment</button>
        </div>
      </div>

      {/* Async */}
      <h3>Async Section</h3>
      <div>
        <button onClick={fetchWelcome}>Fetch Welcome</button>
        <span style={{ marginLeft: 8 }}>{asyncWelcome}</span>
        <div>
          <input
            type="text"
            placeholder="Edit Todo Title"
            value={editTodoTitle}
            onChange={e => setEditTodoTitle(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <button onClick={editTodo}>Edit Assignment Title</button>
        </div>
      </div>

      {/* REST Actions */}
      <h3>REST Actions</h3>
      <div>
        <button onClick={createTodo}>POST Todo</button>
        <button onClick={() => deleteTodo(editTodoId)} style={{ marginLeft: 8 }}>DELETE Todo</button>
        <button onClick={editTodo} style={{ marginLeft: 8 }}>PUT Update Todo</button>
      </div>

      {/* Error Handling */}
      <h3>Error Handling</h3>
      <div>
        <button onClick={tryDelete1234}>Try to Delete Todo with ID: 1234</button>
      </div>
    </div>
  );
};

export default Lab5;
