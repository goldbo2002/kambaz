let assignment = { id: 1, title: "NodeJS Assignment", module: "Server" };
let moduleObj  = { id: 1, name: "Module 1" };
let todos = [
  { id: 1, title: "Learn React", completed: true },
  { id: 2, title: "Learn Node",  completed: false },
  { id: 3, title: "Build Kambaz", completed: false }
];

export default function LabsRoutes(app) {
  // welcome
  app.get("/api/labs/welcome", async (_req, res) => {
    await new Promise((r) => setTimeout(r, 100));
    res.json({ message: "Welcome to Labs" });
  });

  // Path math
  app.get("/api/labs/add/:a/:b", (req, res) => res.json({ result: +req.params.a + +req.params.b }));
  app.get("/api/labs/subtract/:a/:b", (req, res) => res.json({ result: +req.params.a - +req.params.b }));
  app.get("/api/labs/multiply/:a/:b", (req, res) => res.json({ result: +req.params.a * +req.params.b }));
  app.get("/api/labs/divide/:a/:b", (req, res) => {
    const a = +req.params.a, b = +req.params.b || 1;
    res.json({ result: b === 0 ? null : a / b });
  });

  // Query math
  app.get("/api/labs/add", (req, res) => res.json({ result: +req.query.a + +req.query.b }));
  app.get("/api/labs/subtract", (req, res) => res.json({ result: +req.query.a - +req.query.b }));

  // Objects
  app.get("/api/labs/assignment", (_req, res) => res.json(assignment));
  app.get("/api/labs/assignment/title", (_req, res) => res.json({ title: assignment.title }));
  app.put("/api/labs/assignment/title", (req, res) => {
    assignment.title = req.body?.title ?? assignment.title;
    res.json(assignment);
  });

  app.get("/api/labs/module", (_req, res) => res.json(moduleObj));
  app.get("/api/labs/module/name", (_req, res) => res.json({ name: moduleObj.name }));
  app.put("/api/labs/module/name", (req, res) => {
    moduleObj.name = req.body?.name ?? moduleObj.name;
    res.json(moduleObj);
  });

  // Arrays / Todos
  app.get("/api/labs/todos", (_req, res) => res.json(todos));
  app.get("/api/labs/todos/completed", (_req, res) => res.json(todos.filter(t => t.completed)));
  app.get("/api/labs/todos/:id", (req, res) => {
    const todo = todos.find(t => t.id === +req.params.id);
    if (!todo) return res.sendStatus(404);
    res.json(todo);
  });
  app.post("/api/labs/todos", (req, res) => {
    const nextId = (Math.max(...todos.map(t => t.id)) || 0) + 1;
    const todo = { id: nextId, title: req.body?.title ?? "New Todo", completed: !!req.body?.completed };
    todos = [todo, ...todos];
    res.status(201).json(todo);
  });
  app.delete("/api/labs/todos/:id", (req, res) => {
    const id = +req.params.id;
    const exists = todos.some(t => t.id === id);
    if (!exists) return res.status(404).json({ error: `Unable to Delete Todo with ID: ${id}` });
    todos = todos.filter(t => t.id !== id);
    res.json({ ok: true });
  });
  app.put("/api/labs/todos/:id", (req, res) => {
    const id = +req.params.id;
    const i = todos.findIndex(t => t.id === id);
    if (i < 0) return res.sendStatus(404);
    todos[i] = { ...todos[i], ...req.body };
    res.json(todos[i]);
  });
}
