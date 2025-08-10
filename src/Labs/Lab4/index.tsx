import { useState } from "react";

// --- Redux-like mini store for demo purposes ---
type Action = { type: "increment" } | { type: "add", payload: string };
function counterReducer(state: number, action: Action) {
  switch (action.type) {
    case "increment": return state + 1;
    default: return state;
  }
}

export default function Lab4() {
  const [count, setCount] = useState(0);
  const [isBlue, setIsBlue] = useState(false);
  const [label, setLabel] = useState("Click me");
  const [clickedAt, setClickedAt] = useState<Date | null>(null);
  const [profile, setProfile] = useState({ name: "Zippy", mood: "chill" });
  const [history, setHistory] = useState<string[]>([]);

  // For deleteElement demo
  const removeHistoryItem = (index: number) => {
    setHistory(h => h.filter((_, i) => i !== index));
  };

  function handleMagicClick(event: React.MouseEvent<HTMLButtonElement>, amount: number) {
    setCount(c => c + amount);
    setClickedAt(new Date());
    setLabel(`Clicked +${amount}!`);
    setHistory(h => [`Clicked +${amount} at ${new Date().toLocaleTimeString()}`, ...h]);
    if (event.shiftKey) {
      setLabel("Whoa, shift click!");
    }
  }

  const ChildButton = ({ label, onChildClick }: { label: string, onChildClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) => (
    <button onClick={onChildClick}>
      {label}
    </button>
  );

  const toggleBlue = () => setIsBlue(v => !v);
  const changeMood = () => setProfile(p => ({ ...p, mood: p.mood === "chill" ? "hyped" : "chill" }));

  // Shared state demo
  const SiblingDisplay = ({ mood }: { mood: string }) => (
    <div style={{ fontStyle: "italic" }}>Sibling sees mood: {mood}</div>
  );

  // Redux Hello World + Counter demo (local)
  const [reduxCount, setReduxCount] = useState(0);
  const dispatchRedux = (action: Action) => {
    setReduxCount(s => counterReducer(s, action));
  };

  // Todo List CRUD
  const [todos, setTodos] = useState<{ id: number; text: string; done: boolean }[]>([]);
  const [todoText, setTodoText] = useState("");
  const [selectedTodo, setSelectedTodo] = useState<number | null>(null);

  const addTodo = () => {
    if (!todoText.trim()) return;
    setTodos(t => [...t, { id: Date.now(), text: todoText, done: false }]);
    setTodoText("");
  };

  const deleteTodo = (id: number) => setTodos(t => t.filter(todo => todo.id !== id));
  const toggleTodo = (id: number) => setTodos(t => t.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  const updateTodo = (id: number, newText: string) => setTodos(t => t.map(todo => todo.id === id ? { ...todo, text: newText } : todo));

  return (
    <div style={{ margin: "auto", maxWidth: 420, padding: 24, background: isBlue ? "#d0e3ff" : "#f7f7ff", borderRadius: 10 }}>
      <h2>Lab 4: User Events (& State)</h2>

      {/* Existing functionality */}
      <div>
        <button onClick={e => handleMagicClick(e, 1)}>Add 1</button>
        <button onClick={e => handleMagicClick(e, 5)}>Add 5</button>
        <button onClick={toggleBlue}>
          {isBlue ? "Not Blue" : "Blue Mode"}
        </button>
        <button onClick={changeMood}>
          Mood: {profile.mood}
        </button>
      </div>
      <div>
        <span>{label}</span> | Count: {count}
      </div>
      <div>
        Last clicked: {clickedAt ? clickedAt.toLocaleString() : "Never"}
      </div>
      <ChildButton label="Child says hi" onChildClick={() => setLabel("Child says hi!")} />
      <SiblingDisplay mood={profile.mood} />
      <div style={{ marginTop: 12 }}>
        <strong>History:</strong>
        <ul style={{ maxHeight: 80, overflowY: "auto", fontSize: "0.9em" }}>
          {history.slice(0, 6).map((h, i) => (
            <li key={i}>
              {h} <button onClick={() => removeHistoryItem(i)}>x</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Redux Hello World + Counter */}
      <hr />
      <h3>Redux Hello World (Simulated)</h3>
      <p>Redux count: {reduxCount}</p>
      <button onClick={() => dispatchRedux({ type: "increment" })}>Increment</button>

      {/* Todo List CRUD */}
      <hr />
      <h3>Todo List</h3>
      <input value={todoText} onChange={e => setTodoText(e.target.value)} placeholder="New todo..." />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.done ? "line-through" : "none" }}>
            <span onClick={() => setSelectedTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            {selectedTodo === todo.id && (
              <input
                value={todo.text}
                onChange={e => updateTodo(todo.id, e.target.value)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
