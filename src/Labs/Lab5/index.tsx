// src/Labs/Lab5/index.tsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const BASE = "http://localhost:4000/api";

async function getJSON<T = any>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}
async function sendJSON<T = any>(
  method: "POST" | "PUT" | "DELETE",
  path: string,
  body?: any
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (res.status === 204) return {} as T;
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : ({} as T);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 24 }}>
      <h3 style={{ marginBottom: 8 }}>{title}</h3>
      {children}
    </section>
  );
}

export default function Lab5() {
  // Path params calculator
  const [pathAdd, setPathAdd] = useState<string>("");
  const [pathSub, setPathSub] = useState<string>("");
  const [pathMul, setPathMul] = useState<string>("");
  const [pathDiv, setPathDiv] = useState<string>("");

  // Query params calculator
  const [qAdd, setQAdd] = useState<string>("");
  const [qSub, setQSub] = useState<string>("");

  const calcPath = async (op: string, a: number, b: number, set: (v: string) => void) => {
    try {
      const data = await getJSON<{ result: number }>(`/lab5/calculator/${op}/${a}/${b}`);
      set(String(data?.result ?? ""));
    } catch (e: any) {
      set(`Error: ${e.message}`);
    }
  };
  const calcQuery = async (op: string, a: number, b: number, set: (v: string) => void) => {
    try {
      const data = await getJSON<{ result: number }>(`/lab5/calculator?operation=${op}&a=${a}&b=${b}`);
      set(String(data?.result ?? ""));
    } catch (e: any) {
      set(`Error: ${e.message}`);
    }
  };

  // Objects
  const [assignment, setAssignment] = useState<any>(null);
  const [assignmentTitle, setAssignmentTitle] = useState<string>("");
  const [moduleObj, setModuleObj] = useState<any>(null);
  const [moduleName, setModuleName] = useState<string>("");
  const [newTitle, setNewTitle] = useState("Updated Assignment Title");

  const loadAssignment       = async () => setAssignment(await getJSON(`/lab5/assignment`).catch((e)=>({error:e.message})));
  const loadAssignmentTitle  = async () => setAssignmentTitle(await getJSON<{title:string}>(`/lab5/assignment/title`).then(a=>a.title).catch((e)=>`Error: ${e.message}`));
  const updateAssignmentTitle= async () => {
    try {
      const a = await sendJSON("PUT", `/lab5/assignment/title`, { title: newTitle });
      setAssignment(a);
    } catch (e:any) {
      setAssignment({ error: e.message });
    }
  };
  const loadModule           = async () => setModuleObj(await getJSON(`/lab5/module`).catch((e)=>({error:e.message})));
  const loadModuleName       = async () => setModuleName(await getJSON<{name:string}>(`/lab5/module/name`).then(m=>m.name).catch((e)=>`Error: ${e.message}`));

  // Arrays / Todos
  const [todos, setTodos] = useState<any[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<any>(null);
  const [completedTodos, setCompletedTodos] = useState<any[]>([]);
  const [todoTitle, setTodoTitle] = useState("New Todo");
  const [updateTitle, setUpdateTitle] = useState("NodeJS Assignment");
  const [serverMsg, setServerMsg] = useState<string>("");

  const loadTodos = async () => {
    try {
      setTodos(await getJSON<any[]>(`/lab5/todos`));
      setServerMsg("");
    } catch (e:any) { setServerMsg(`Error: ${e.message}`); }
  };
  const getTodoById = async (id: number) => {
    try {
      setSelectedTodo(await getJSON<any>(`/lab5/todos/${id}`));
      setServerMsg("");
    } catch (e:any) { setServerMsg(`Error: ${e.message}`); }
  };
  const getCompleted = async () => {
    try {
      setCompletedTodos(await getJSON<any[]>(`/lab5/todos?completed=true`));
      setServerMsg("");
    } catch (e:any) { setServerMsg(`Error: ${e.message}`); }
  };
  const createTodo = async () => {
    try {
      await sendJSON("POST", `/lab5/todos`, { title: todoTitle });
      await loadTodos();
      setServerMsg("POST ok");
    } catch (e:any) { setServerMsg(`POST failed: ${e.message}`); }
  };
  const deleteTodo = async (id: number) => {
    try {
      await sendJSON("DELETE", `/lab5/todos/${id}`);
      await loadTodos();
      setServerMsg("DELETE ok");
    } catch (e:any) { setServerMsg(`DELETE failed: ${e.message}`); }
  };
  const updateTodo = async (id: number) => {
    try {
      await sendJSON("PUT", `/lab5/todos/${id}`, { title: updateTitle });
      await loadTodos();
      setServerMsg("PUT ok");
    } catch (e:any) { setServerMsg(`PUT failed: ${e.message}`); }
  };

  // Async welcome
  const [welcome, setWelcome] = useState<string>("");
  const fetchWelcome = async () => {
    try {
      const data = await getJSON<{ message?: string; welcome?: string }>(`/lab5/welcome`);
      setWelcome(data?.message ?? data?.welcome ?? JSON.stringify(data));
    } catch (e:any) { setWelcome(`Error: ${e.message}`); }
  };

  useEffect(() => {
    calcPath("add", 34, 23, setPathAdd);
    calcPath("subtract", 34, 23, setPathSub);
    calcPath("multiply", 7, 6, setPathMul);
    calcPath("divide", 84, 7, setPathDiv);
    calcQuery("add", 34, 23, setQAdd);
    calcQuery("subtract", 34, 23, setQSub);
    loadAssignment();
    loadAssignmentTitle();
    loadModule();
    loadModuleName();
    loadTodos();
    getCompleted();
    fetchWelcome();
  }, []);

  const firstTodoId = useMemo(() => (todos.length ? todos[0].id : null), [todos]);

  return (
    <div id="wd-lab5" style={{ maxWidth: 980, margin: "24px auto", lineHeight: 1.5 }}>
      <h2>Lab 5</h2>
      <div style={{ marginBottom: 12 }}>
        <Link to="/Labs/Lab3">Lab 3</Link> {" | "}
        <Link to="/Labs/Lab4">Lab 4</Link> {" | "}
        <Link to="/Kambaz">Kanbas</Link>
      </div>

      <Section title="Path Parameters — Add 34 + 23">
        <div>Result: {pathAdd || "-"}</div>
      </Section>
      <Section title="Path Parameters — Subtract 34 - 23">
        <div>Result: {pathSub || "-"}</div>
      </Section>
      <Section title="Path Parameters — multiply / divide">
        <div>multiply 7×6 = {pathMul || "-"}</div>
        <div>divide 84÷7 = {pathDiv || "-"}</div>
      </Section>

      <Section title="Query Parameters — Add 34 + 23 / Subtract 34 - 23">
        <div>add: {qAdd || "-"}</div>
        <div>subtract: {qSub || "-"}</div>
      </Section>

      <Section title="Working with Objects — Assignment / Title">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
          <button onClick={loadAssignment}>Get Assignment</button>
          <button onClick={loadAssignmentTitle}>Get Title</button>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ width: 260 }}
            placeholder="New title"
          />
          <button onClick={updateAssignmentTitle}>Update Title</button>
        </div>
        <div><b>Assignment:</b> <code>{JSON.stringify(assignment)}</code></div>
        <div><b>Title:</b> {assignmentTitle || "-"}</div>
      </Section>

      <Section title="Working with Objects — Module / Module Name">
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <button onClick={loadModule}>Get Module</button>
          <button onClick={loadModuleName}>Get Module Name</button>
        </div>
        <div><b>Module:</b> <code>{JSON.stringify(moduleObj)}</code></div>
        <div><b>Name:</b> {moduleName || "-"}</div>
      </Section>

      <Section title="Working with Arrays — Todos">
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <button onClick={loadTodos}>Get Todos</button>
          <button onClick={() => firstTodoId && getTodoById(firstTodoId)}>Get Todo By Id (first)</button>
          <button onClick={getCompleted}>Get Completed Todos</button>
        </div>
        <div style={{ marginTop: 8 }}>
          <b>Todos:</b>
          <pre style={{ background: "#f7f7f7", padding: 8, overflow: "auto" }}>
{JSON.stringify(todos, null, 2)}
          </pre>
        </div>
        <div><b>Selected Todo:</b> <code>{JSON.stringify(selectedTodo)}</code></div>
        <div><b>Completed:</b> <code>{JSON.stringify(completedTodos)}</code></div>
      </Section>

      <Section title="POST / DELETE / PUT + Error">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
          <input
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            placeholder="New todo title"
            style={{ width: 220 }}
          />
          <button onClick={createTodo}>POST — Create</button>

          <button onClick={() => firstTodoId && deleteTodo(firstTodoId)}>DELETE — First</button>

          <input
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
            placeholder="Update title"
            style={{ width: 220 }}
          />
          <button onClick={() => firstTodoId && updateTodo(firstTodoId)}>PUT — First</button>

          <button onClick={() => deleteTodo(1234)}>Error Demo — Delete ID 1234</button>
        </div>
        <div style={{ color: serverMsg.startsWith("Error") ? "#b00020" : "#0b6b0b" }}>
          {serverMsg || "—"}
        </div>
      </Section>

      <Section title="Async — Fetching Welcome">
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={fetchWelcome}>Fetch Welcome</button>
          <div><b>Welcome: </b>{welcome || "-"}</div>
        </div>
      </Section>
    </div>
  );
}
