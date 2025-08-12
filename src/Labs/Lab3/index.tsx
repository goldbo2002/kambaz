// src/Labs/Lab3/index.tsx
//Bo Gold

import { useMemo, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";

type Todo = { id: number; title: string; done?: boolean };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 24 }}>
      <h3 style={{ marginBottom: 8 }}>{title}</h3>
      {children}
    </section>
  );
}

// Small child component for “Parameterizing Components”
function ColorBox({ label, bg }: { label: string; bg: string }) {
  return (
    <div style={{ display: "inline-block", marginRight: 8, marginBottom: 8 }}>
      <div style={{ width: 80, height: 40, background: bg, border: "1px solid #ccc" }} />
      <div style={{ fontSize: 12, textAlign: "center" }}>{label}</div>
    </div>
  );
}

// TodoItem / TodoList for the React ToDo
function TodoItem({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 8px",
        borderLeft: "4px solid green",
        background: "#fff",
        marginBottom: 6,
      }}
    >
      <input type="checkbox" checked={!!todo.done} onChange={() => onToggle(todo.id)} />
      <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>{todo.title}</span>
      <button style={{ marginLeft: "auto" }} onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
}

function TodoList({
  items,
  onToggle,
  onDelete,
}: {
  items: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default function Lab3() {
  const location = useLocation();
  const params = useParams<{ a?: string; b?: string }>();

  // ---------- Variables and constants ----------
  const x = 1;
  let y = 2;
  const s: string = "hello";
  const n: number = 42;
  const b: boolean = true;
  const arr = [1, 2, 3];
  const obj = { name: "Bo", role: "Student" };

  // Boolean vars
  const isLoggedIn = true;
  const isAdmin = false;

  // If/else + ternary + conditional output
  let greet = "Welcome, guest.";
  if (isLoggedIn) {
    greet = "Welcome back!";
  } else {
    greet = "Please sign in.";
  }
  const roleMsg = isAdmin ? "You are an admin." : "You are a regular user.";
  const showSecret = isAdmin && <div>Secret Panel</div>;

  // Welcome If Else + Please login inline
  const username = "alice";
  const welcome = username ? `Welcome ${username}!` : "Welcome!";
  const inlineLogin = isLoggedIn ? <b>Logged in</b> : <i>Please login</i>;

  // Legacy ES5 function vs ES6 arrow + implied returns
  function addES5(a: number, b: number) {
    return a + b;
  }
  const addES6 = (a: number, b: number) => {
    return a + b;
  };
  const addImplied = (a: number, b: number) => a + b; // implied return

  // Template literals
  const who = "Bo";
  const tmpl = `Hi ${who}, ${2 + 3} is five.`;

  // Arrays: push/pop/unshift/shift etc
  const original = [3, 1, 4];
  const withPush = [...original];
  withPush.push(1);
  const withPop = [...withPush];
  withPop.pop();

  // index & length
  const first = original[0];
  const len = original.length;

  // For loop
  const forLoopNums: number[] = [];
  for (let i = 0; i < 3; i++) {
    forLoopNums.push(i);
  }

  // Map / Find / FindIndex / Filter
  const nums = [5, 8, 13, 21];
  const doubled = nums.map((z) => z * 2);
  const found = nums.find((z) => z > 10);
  const foundIdx = nums.findIndex((z) => z === 8);
  const filtered = nums.filter((z) => z % 2 === 1);

  // JSON
  const people = [
    { id: 1, name: "Alice", role: "Student" },
    { id: 2, name: "Bob", role: "TA" },
  ];
  const jsonStr = JSON.stringify(people);
  const parsed = JSON.parse(jsonStr);

  // ToDo List
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Read rubric" },
    { id: 2, title: "Finish Lab 3" },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    const title = newTodo.trim();
    if (!title) return;
    // Spread operator
    setTodos((prev) => [...prev, { id: Date.now(), title }]);
    setNewTodo("");
  };
  const toggleTodo = (id: number) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // Destructuring function destructuring
  const user = { id: 99, first: "Bo", last: "Gold", city: "Boston" };
  const { first: firstName, last: lastName, ...rest } = user;
  const formatUser = ({ first, last }: { first: string; last: string }) => `${first} ${last}`;

  // Working with HTML 
  const isDanger = true;
  const isCool = false;
  const dangerousClass = isDanger ? "danger" : "";
  const coolClass = isCool ? "blue" : "";

  // Style attribute
  const yellowStyle = { background: "yellow", padding: 8 };
  const redStyle = { background: "red", color: "white", padding: 8 };
  const blueStyle = { background: "blue", color: "white", padding: 8 };

  // Location
  const currentPath = location.pathname;
  const A = Number(params.a ?? 1);
  const B = Number(params.b ?? 2);
  const sumA = A + B;
  const sumB = 3 + 4;

  // Memo to show something computed
  const memoExample = useMemo(() => addImplied(10, 5), []);

  return (
    <div id="wd-lab3" style={{ maxWidth: 900, margin: "24px auto", lineHeight: 1.5 }}>
      <h2>Lab 3</h2>
      <div style={{ marginBottom: 12 }}>
        <Link to="/Labs/Lab1">Lab 1</Link> {" | "}
        <Link to="/Labs/Lab2">Lab 2</Link> {" | "}
        <Link to="/Kambaz">Kanbas</Link>
      </div>

      <Section title="Variables and constants (approximate display)">
  <pre style={{ background: "#f7f7f7", padding: 12, overflow: "auto" }}>
    {`x=${x}
y=${y}
s="${s}"
n=${n}
b=${b}
arr=[${arr.join(", ")}]
obj=${JSON.stringify(obj)}`}
  </pre>
  <div>Memo example (10 + 5): {memoExample}</div>
</Section>

      <Section title="Variable types / Boolean variables">
        <div>string: "{s}", number: {n}, boolean: {String(b)}</div>
        <div>isLoggedIn: {String(isLoggedIn)}, isAdmin: {String(isAdmin)}</div>
      </Section>

      <Section title="If/Else / Ternary / Conditional output">
        <div>{greet}</div>
        <div>{roleMsg}</div>
        <div>{showSecret}</div>
      </Section>

      <Section title="Welcome If Else / Please login Inline">
        <div>{welcome}</div>
        <div>{inlineLogin}</div>
      </Section>

      <Section title="Legacy ES5 vs ES6 Arrow vs Implied returns">
        <div>addES5(1,2) = {addES5(1, 2)}</div>
        <div>addES6(3,4) = {addES6(3, 4)}</div>
        <div>addImplied(5,6) = {addImplied(5, 6)}</div>
      </Section>

      <Section title="Template Literals">
        <code>{tmpl}</code>
      </Section>

      <Section title="Working with Arrays / Index & Length / Add & Remove">
        <div>original = [{original.join(", ")}]</div>
        <div>withPush (after push 1) = [{withPush.join(", ")}]</div>
        <div>withPop (after pop) = [{withPop.join(", ")}]</div>
        <div>first = {first}, length = {len}</div>
      </Section>

      <Section title="For Loops">
        <div>[{forLoopNums.join(", ")}]</div>
      </Section>

      <Section title="Map / Find / FindIndex / Filter">
        <div>nums = [{nums.join(", ")}]</div>
        <div>map *2 = [{doubled.join(", ")}]</div>
        <div>find &gt; 10 = {String(found)}</div>
        <div>findIndex == 8 = {foundIdx}</div>
        <div>filter odd = [{filtered.join(", ")}]</div>
      </Section>

      <Section title="JSON">
        <div>stringify = {jsonStr}</div>
        <div>parse[0].name = {parsed[0].name}</div>
      </Section>

      <Section title="Implementing a simple ToDo List using React.js">
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input
            placeholder="New todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <TodoList items={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </Section>

      <Section title="The Spread Operator / Destructuring / Function Destructuring">
        <div>user = {JSON.stringify(user)}</div>
        <div>firstName = {firstName}, lastName = {lastName}</div>
        <div>rest = {JSON.stringify(rest)}</div>
        <div>formatUser(user) = {formatUser(user)}</div>
      </Section>

      <Section title="Working with HTML classes (danger/red, blue) + dynamic">
        <div className={`box ${dangerousClass}`} style={{ padding: 8, marginBottom: 6 }}>
          Red Dangerous background (when danger=true)
        </div>
        <div className={`box ${coolClass}`} style={{ padding: 8 }}>
          Dynamic blue background (when cool=true)
        </div>
      </Section>

      <Section title="Style attribute (yellow, red, blue)">
        <div style={yellowStyle}>Yellow background (inline style)</div>
        <div style={redStyle}>Red background (inline style)</div>
        <div style={blueStyle}>Blue background (inline style)</div>
      </Section>

      <Section title="Parameterizing Components / Child Components">
        <ColorBox label="Sun" bg="yellow" />
        <ColorBox label="Stop" bg="red" />
        <ColorBox label="Sky" bg="blue" />
      </Section>

      <Section title="Working with Location / Navigation highlights current page">
        <div>Current path: <code>{currentPath}</code></div>
        <nav style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <NavLink
            to="/Labs/Lab3"
            className={({ isActive }) => (isActive ? "activeLink" : "")}
          >
            Lab 3 Home
          </NavLink>
          <NavLink
            to="/Labs/Lab3/encoded/1/2"
            className={({ isActive }) => (isActive ? "activeLink" : "")}
          >
            Encoded 1/2
          </NavLink>
        </nav>
        <div style={{ marginTop: 8 }}>
          <div>Encoding Path Parameters:</div>
          <div>
            a = {String(A)} , b = {String(B)}
          </div>
        </div>
      </Section>

      <Section title="1 + 2 displays 3 / 3 + 4 displays 7">
        <div>1 + 2 = {sumA /* when route /encoded/1/2 */}</div>
        <div>3 + 4 = {sumB}</div>
      </Section>

      {/* LITTLE STYLE */}
      <style>{`
        .danger { background: #c1121f; color: #fff; }
        .blue { background: #0d6efd; color: #fff; }
        .activeLink { font-weight: bold; border-left: 4px solid black; padding-left: 6px; }
        .box { border-radius: 6px; }
      `}</style>
    </div>
  );
}
