// src/Labs/Lab4/index.tsx
// Bo Gold

import React, { createContext, useContext, useReducer, useState } from "react";
import { Link } from "react-router-dom";


type Action =
  | { type: "hello" }
  | { type: "inc" }
  | { type: "dec" }
  | { type: "addBy"; payload: number };

type StoreState = {
  message: string;
  counter: number;
};

const initialStore: StoreState = { message: "Hello World", counter: 0 };

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case "hello":
      return { ...state, message: "Hello World" };
    case "inc":
      return { ...state, counter: state.counter + 1 };
    case "dec":
      return { ...state, counter: state.counter - 1 };
    case "addBy":
      return { ...state, counter: state.counter + (action.payload ?? 0) };
    default:
      return state;
  }
}

const StoreCtx = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialStore, dispatch: () => {} });

function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialStore);
  return <StoreCtx.Provider value={{ state, dispatch }}>{children}</StoreCtx.Provider>;
}

function useStore() {
  return useContext(StoreCtx);
}


type Todo = { id: number; title: string; done?: boolean };


function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 24 }}>
      <h3 style={{ marginBottom: 8 }}>{title}</h3>
      {children}
    </section>
  );
}


export default function Lab4() {
  /*  User Events  */
  const [clickCount, setClickCount] = useState(0);
  const handleClick = () => setClickCount((c) => c + 1);

  const [lastNumberClicked, setLastNumberClicked] = useState<number | null>(null);
  const handleNumberClick = (num: number) => setLastNumberClicked(num); // passing data

  function ParentPassingFunction({ onPing }: { onPing: () => void }) {
    return <button onClick={onPing}>Child: Call parent function</button>;
  }

  const [lastEventInfo, setLastEventInfo] = useState("");
  const handleEventObject = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLastEventInfo(`You clicked a <${(e.target as HTMLElement).tagName.toLowerCase()}>`);
  };

  /* Component State */
  // integer
  const [n, setN] = useState(0);
  // boolean
  const [on, setOn] = useState(false);
  // string
  const [txt, setTxt] = useState("hello");
  // date
  const [dt, setDt] = useState<string>(new Date().toISOString().slice(0, 10));
  // object
  const [profile, setProfile] = useState({ first: "Bo", last: "Gold" });
  // array add/remove
  const [nums, setNums] = useState<number[]>([1, 2, 3]);
  const addElement = () => setNums((arr) => [...arr, Math.floor(Math.random() * 10)]);
  const deleteElement = (idx: number) =>
    setNums((arr) => arr.filter((_, i) => i !== idx));

  /* Sharing State Between Components */
  function CounterView({
    value,
    onInc,
    onDec,
  }: {
    value: number;
    onInc: () => void;
    onDec: () => void;
  }) {
    return (
      <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
        <button onClick={onDec}>-</button>
        <b>{value}</b>
        <button onClick={onInc}>+</button>
      </div>
    );
  }

  /* Application State  */
  function HelloRedux() {
    const { state } = useStore();
    return <div>{state.message}</div>;
  }
  function CounterRedux() {
    const { state, dispatch } = useStore();
    const [amount, setAmount] = useState(5);
    return (
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={() => dispatch({ type: "dec" })}>-</button>
        <b>{state.counter}</b>
        <button onClick={() => dispatch({ type: "inc" })}>+</button>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value || "0", 10))}
          style={{ width: 80 }}
        />
        <button onClick={() => dispatch({ type: "addBy", payload: amount })}>
          addBy {amount}
        </button>
      </div>
    );
  }

  /*  Todo List updating */
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Read rubric" },
    { id: 2, title: "Finish Lab 4" },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const createTodo = () => {
    const title = newTitle.trim();
    if (!title) return;
    setTodos((list) => [...list, { id: Date.now(), title }]);
    setNewTitle("");
  };
  const deleteTodo = (id: number) => setTodos((list) => list.filter((t) => t.id !== id));
  const selectTodo = (id: number) => {
    setSelectedId(id);
    const t = todos.find((x) => x.id === id);
    setEditTitle(t?.title || "");
  };
  const updateTodo = () => {
    if (selectedId == null) return;
    setTodos((list) => list.map((t) => (t.id === selectedId ? { ...t, title: editTitle } : t)));
  };

  return (
    <StoreProvider>
      <div id="wd-lab4" style={{ maxWidth: 960, margin: "24px auto", lineHeight: 1.5 }}>
        <h2>Lab 4</h2>
        <div style={{ marginBottom: 12 }}>
          <Link to="/Labs/Lab1">Lab 1</Link> {" | "}
          <Link to="/Labs/Lab2">Lab 2</Link> {" | "}
          <Link to="/Labs/Lab3">Lab 3</Link> {" | "}
          <Link to="/Kambaz">Kanbas</Link>
        </div>

        {/*  User Events  */}
        <Section title="User Events — Handling Click Events">
          <button onClick={handleClick}>Click me</button>{" "}
          <span>Clicked: {clickCount}</span>
        </Section>

        <Section title="User Events — Passing Data when Handling Events">
          <div style={{ display: "flex", gap: 8 }}>
            {[1, 2, 3].map((num) => (
              <button key={num} onClick={() => handleNumberClick(num)}>
                {num}
              </button>
            ))}
          </div>
          <div>Last number clicked: {lastNumberClicked ?? "-"}</div>
        </Section>

        <Section title="User Events — Passing Functions as Attributes">
          <ParentPassingFunction onPing={() => alert("Parent function called!")} />
        </Section>

        <Section title="User Events — The Event Object">
          <button onClick={handleEventObject}>Click & inspect event</button>
          <div style={{ marginTop: 8 }}>{lastEventInfo}</div>
        </Section>

        {/* Component State */}
        <Section title="Component State — Integer / Boolean / String / Date / Object">
          <div style={{ display: "grid", gap: 8, maxWidth: 520 }}>
            <div>
              Integer: <button onClick={() => setN((v) => v - 1)}>-</button>{" "}
              <b style={{ padding: "0 8px" }}>{n}</b>{" "}
              <button onClick={() => setN((v) => v + 1)}>+</button>
            </div>
            <div>
              Boolean:{" "}
              <button onClick={() => setOn((v) => !v)}>{on ? "ON" : "OFF"}</button>
            </div>
            <div>
              String:{" "}
              <input value={txt} onChange={(e) => setTxt(e.target.value)} /> ({txt})
            </div>
            <div>
              Date:{" "}
              <input type="date" value={dt} onChange={(e) => setDt(e.target.value)} /> ({dt})
            </div>
            <div>
              Object:{" "}
              <input
                placeholder="First"
                value={profile.first}
                onChange={(e) => setProfile((p) => ({ ...p, first: e.target.value }))}
                style={{ width: 120, marginRight: 6 }}
              />
              <input
                placeholder="Last"
                value={profile.last}
                onChange={(e) => setProfile((p) => ({ ...p, last: e.target.value }))}
                style={{ width: 120 }}
              />
              <div>
                Full: {profile.first} {profile.last}
              </div>
            </div>
          </div>
        </Section>

        <Section title="Component State — Array addElement / deleteElement">
          <div style={{ marginBottom: 8 }}>
            <button onClick={addElement}>addElement</button>
          </div>
          <ul>
            {nums.map((val, i) => (
              <li key={`${val}-${i}`} style={{ marginBottom: 4 }}>
                {val}{" "}
                <button onClick={() => deleteElement(i)} style={{ marginLeft: 8 }}>
                  deleteElement
                </button>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Component State — Sharing State Between Components">
          <CounterView value={n} onInc={() => setN((v) => v + 1)} onDec={() => setN((v) => v - 1)} />
        </Section>

        {/*  Application State (Redux-like)  */}
        <Section title='Application State — "Hello World Redux" component'>
          <HelloRedux />
        </Section>

        <Section title="Application State — Counter Redux (dispatch to reducers)">
          <CounterRedux />
        </Section>

        {/*Todo List CRUD */}
        <Section title="Todo List — Render all / Create / Delete / Select / Update">
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input
              placeholder="New todo"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button onClick={createTodo}>Create new Todo</button>
          </div>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {todos.map((t) => (
              <li
                key={t.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 8px",
                  borderLeft: "4px solid green",
                  background: selectedId === t.id ? "#fffbe6" : "#fff",
                  marginBottom: 6,
                }}
              >
                <span style={{ flex: 1 }}>{t.title}</span>
                <button onClick={() => selectTodo(t.id)}>Select</button>
                <button onClick={() => deleteTodo(t.id)}>Delete</button>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 8 }}>
            <div>Selected: {selectedId ?? "-"}</div>
            <input
              placeholder="Edit title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              style={{ marginRight: 8 }}
            />
            <button onClick={updateTodo}>Update selected</button>
          </div>
        </Section>

      </div>
    </StoreProvider>
  );
}
