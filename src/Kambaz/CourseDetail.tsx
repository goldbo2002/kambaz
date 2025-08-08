import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Course and Module types
type Course = {
  id: string;
  title: string;
  description?: string;
  instructor?: string;
};

type Module = {
  id: string;
  name: string;
};

// util
const rid = () => Math.random().toString(36).slice(2, 10);

// courses
function loadCourses(): Course[] {
  const s = localStorage.getItem("kambaz-courses");
  return s ? JSON.parse(s) : [];
}

// per-course modules storage
const modulesKey = (courseId: string) => `kambaz-modules-${courseId}`;
function loadModules(courseId: string): Module[] {
  const s = localStorage.getItem(modulesKey(courseId));
  return s ? JSON.parse(s) : [];
}
function saveModules(courseId: string, modules: Module[]) {
  localStorage.setItem(modulesKey(courseId), JSON.stringify(modules));
}

export default function CourseDetail() {
  const { courseId = "" } = useParams();

  // find course
  const course = useMemo(() => {
    const all = loadCourses();
    return all.find((c) => c.id === courseId) || { id: courseId, title: "Course" };
  }, [courseId]);

  // modules state
  const [modules, setModules] = useState<Module[]>(() => loadModules(courseId));
  const [name, setName] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // persist
  useEffect(() => {
    saveModules(courseId, modules);
  }, [courseId, modules]);

  // add module
  const addModule = () => {
    const trimmed = name.trim();
    if (!trimmed) return alert("Module name is required.");
    setModules((mods) => [...mods, { id: rid(), name: trimmed }]);
    setName("");
  };

  // start edit
  const startEdit = (m: Module) => {
    setEditingId(m.id);
    setName(m.name);
  };

  // save edit
  const saveEdit = () => {
    if (!editingId) return;
    const trimmed = name.trim();
    if (!trimmed) return alert("Module name is required.");
    setModules((mods) => mods.map((m) => (m.id === editingId ? { ...m, name: trimmed } : m)));
    setEditingId(null);
    setName("");
  };

  // cancel
  const cancelEdit = () => {
    setEditingId(null);
    setName("");
  };

  // delete
  const deleteModule = (id: string) => {
    setModules((mods) => mods.filter((m) => m.id !== id));
    if (editingId === id) cancelEdit();
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>{course.title}</h2>

      {/* quick nav for this course */}
      <div style={{ marginBottom: 12 }}>
        <Link to="/Kambaz/Dashboard">← Back to Dashboard</Link>
        <span style={{ margin: "0 12px" }}>|</span>
        <Link to={`/Kambaz/Courses/${courseId}`}>Modules</Link>
        <span style={{ margin: "0 8px" }}>·</span>
        <Link to={`/Kambaz/Courses/${courseId}/Assignments`}>Assignments</Link>
        <span style={{ margin: "0 8px" }}>·</span>
        <Link to={`/Kambaz/Courses/${courseId}/People`}>People</Link>
      </div>

      {/* Create Update Module */}
      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="New module name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: 8 }}
        />
        {editingId ? (
          <>
            <button onClick={saveEdit}>Save</button>
            <button onClick={cancelEdit} style={{ marginLeft: 8 }}>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={addModule}>+ Module</button>
        )}
      </div>

      {/* Modules list */}
      <table border={1} cellPadding={8} width="100%">
        <thead>
          <tr>
            <th style={{ width: "60%" }}>Module</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {modules.length === 0 ? (
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                No modules yet. Add your first module above.
              </td>
            </tr>
          ) : (
            modules.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>
                  <button onClick={() => startEdit(m)}>Edit</button>
                  <button
                    onClick={() => deleteModule(m.id)}
                    style={{ marginLeft: 8, color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
