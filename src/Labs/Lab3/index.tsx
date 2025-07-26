import { useState } from "react";

// Type for todos
type Todo = { text: string };
type TodoItemProps = {
  todo: Todo;
  onDelete: () => void;
};

// Child component for a single todo item
function TodoItem({ todo, onDelete }: TodoItemProps) {
  return (
    <li style={{ margin: "0.4em 0", display: "flex", justifyContent: "space-between" }}>
      <span>{todo.text}</span>
      <button onClick={onDelete}>X</button>
    </li>
  );
}

// A simple ToDo app with state for new item
function TodoDemo() {
  const [todos, setTodos] = useState<Todo[]>([
    { text: "Finish assignment" },
    { text: "Push to GitHub" },
    { text: "Eat" }
  ]);
  const [newTodo, setNewTodo] = useState("");

  return (
    <div>
      <input
        value={newTodo}
        placeholder="Add a task"
        onChange={e => setNewTodo(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <button
        onClick={() => {
          setTodos([...todos, { text: newTodo }]);
          setNewTodo(""); // clear input
        }}
        disabled={!newTodo.trim()}
      >
        Add
      </button>
      <ul>
        {todos.map((todo, i) => (
          <TodoItem key={i} todo={todo} onDelete={() => setTodos(todos.filter((_, idx) => idx !== i))} />
        ))}
      </ul>
    </div>
  );
}

export default function Lab3() {
  // variable demos
  let studentName = "Bo Gold";
  const section = "Section 01";
  var legacyVar = 42; // old JS var
  let age = 21;
  const PI = 3.14;

  // data types
  let someString: string = "A string";
  let someNumber: number = 42;
  let someBool: boolean = true;
  let untyped;
  untyped = "first a string";
  untyped = 99; // now a number

  // if/else example
  let isHungry = false;
  let hungryMsg = isHungry ? "Please feed me!" : "I'm good!"; // ternary

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto" }}>
      <h2>Lab 3: JS Variables, Types, Conditionals</h2>

      <section>
        <h3>Variables & Constants</h3>
        <ul>
          <li>studentName: {studentName}</li>
          <li>section: {section}</li>
          <li>legacyVar: {legacyVar}</li>
          <li>age: {age}</li>
          <li>PI: {PI}</li>
        </ul>
      </section>

      <section>
        <h3>Variable Types</h3>
        <div>someString: {someString}</div>
        <div>someNumber: {someNumber}</div>
        <div>someBool: {String(someBool)}</div>
        <div>untyped: {untyped}</div>
      </section>

      <section>
        <h3>Conditionals (if/else and ternary)</h3>
        <div>isHungry: {String(isHungry)}</div>
        <div>{hungryMsg}</div>
      </section>

      <section>
        <h3>ToDo List with React</h3>
        <TodoDemo />
      </section>
    </div>
  );
}
