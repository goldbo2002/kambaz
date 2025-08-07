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

// Utility: random id for new modules
const rid = () => Math.random().toString(36).slice(2, 10);

// Load all courses from storage (used to show course title)
function loadCourses(): Course[] {
  const s = localStorage.getItem("kambaz-courses");
  return s ? JSON.parse(s) : [];
}

// Storage key per course for modules
const modulesKey = (courseId: string) => `kambaz-modules-${courseId}`;

// Load modules for a specific course
function loadModules(courseId: string): Module[] {
  const s = localStorage.getItem(modulesKey(courseId));
  return s ? JSON.parse(s) : [];
}

// Save modules for a specific course
function saveModules(courseId: string, modules: Module[]) {
  localStorage.setItem(modulesKey(courseId), JSON.stringify(modules));
}

export default function CourseDetail() {
  // read :courseId from the URL
  const { courseId = "" } = useParams();

  // derive the current course from stored courses
  const course = useMemo(() => {
    const all = loadCourses();
    return all.find((c) => c.id === courseId) || { id: courseId, title: "Course" };
  }, [courseId]);

  // modules state for this course
  const [modules, setModules] = useState<Module[]>(() => loadModules(courseId));
  const [name, setName] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // keep modules persisted per course
  useEffect(() => {
    saveModules(courseId, modules);
  }, [courseId, modules]);

  // Add a new module for this course
  const addModule = () => {
    const trimmed = name.trim();
    if (!trimmed) return alert("Module name is required.");
    const next = [...modules, { id: rid(), name: trimmed }];
    setModules(next); // UI updates immediately
    setName("");      // reset form
  };

  // Start editing a module
  const startEdit = (m: Module) => {
    setEditingId(m.id);
    setName(m.name);
  };

  // Save edit
  const saveEdit = () => {
    if (!editingId) return;
    const trimmed = name.trim();
    if (!trimmed) return alert("Module name is required.");
    setModules(mods => mods.map(m => (m.id === editingId ? { ...m, name: trimmed } : m)));
    setEditingId(null);
    setName("");
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setName("");
  };

  // Delete a module (UI updates immediately; refresh confirms persistence)
  const deleteModule = (id: string) => {
    setModules(mods => mods.filter(m => m.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setName("");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>{course.title}</h2>
      <div style={{ marginBottom: 16 }}>
        <Link to="/Kambaz/Dashboard">← Back to Dashboard</Link>
      </div>

      {/* Create / Update Module */}
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

      {/* Modules list for this course */}
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

      {/* 
UI updates immediately on add/edit/delete
Different courses use different storage keys
      */}
    </div>
  );
}
