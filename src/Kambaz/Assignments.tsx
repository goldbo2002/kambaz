import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Course = { id: string; title: string };
type Assignment = {
  id: string;
  title: string;
  dueDate?: string; // yyyy-mm-dd
  points?: number;
  description?: string;
};

const rid = () => Math.random().toString(36).slice(2, 10);

function loadCourses(): Course[] {
  const s = localStorage.getItem("kambaz-courses");
  return s ? JSON.parse(s) : [];
}

// per-course assignments storage
const key = (courseId: string) => `kambaz-assignments-${courseId}`;
function loadAssignments(courseId: string): Assignment[] {
  const s = localStorage.getItem(key(courseId));
  return s ? JSON.parse(s) : [];
}
function saveAssignments(courseId: string, data: Assignment[]) {
  localStorage.setItem(key(courseId), JSON.stringify(data));
}

export default function Assignments() {
  const { courseId = "" } = useParams();

  const course = useMemo(() => {
    const all = loadCourses();
    return all.find((c) => c.id === courseId) || { id: courseId, title: "Course" };
  }, [courseId]);

  const [items, setItems] = useState<Assignment[]>(() => loadAssignments(courseId));
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<Assignment>>({
    title: "",
    dueDate: "",
    points: undefined,
    description: ""
  });

  useEffect(() => {
    saveAssignments(courseId, items);
  }, [courseId, items]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "points" ? (value === "" ? undefined : Number(value)) : value
    }));
  };

  const addItem = () => {
    if (!form.title?.trim()) return alert("Title is required.");
    const a: Assignment = {
      id: rid(),
      title: form.title.trim(),
      dueDate: form.dueDate || undefined,
      points: form.points,
      description: form.description?.trim() || undefined
    };
    setItems((list) => [...list, a]);
    setForm({ title: "", dueDate: "", points: undefined, description: "" });
  };

  const startEdit = (a: Assignment) => {
    setEditingId(a.id);
    setForm({
      title: a.title,
      dueDate: a.dueDate || "",
      points: a.points,
      description: a.description || ""
    });
  };

  const saveEdit = () => {
    if (!editingId) return;
    if (!form.title?.trim()) return alert("Title is required.");
    setItems((list) =>
      list.map((a) =>
        a.id === editingId
          ? {
              ...a,
              title: form.title!.trim(),
              dueDate: form.dueDate || undefined,
              points: form.points,
              description: form.description?.trim() || undefined
            }
          : a
      )
    );
    setEditingId(null);
    setForm({ title: "", dueDate: "", points: undefined, description: "" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ title: "", dueDate: "", points: undefined, description: "" });
  };

  const removeItem = (id: string) => {
    setItems((list) => list.filter((a) => a.id !== id));
    if (editingId === id) cancelEdit();
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>{course.title} · Assignments</h2>

      {/* intra-course nav */}
      <div style={{ marginBottom: 12 }}>
        <Link to={`/Kambaz/Courses/${courseId}`}>← Modules</Link>
        <span style={{ margin: "0 8px" }}>·</span>
        <Link to={`/Kambaz/Courses/${courseId}/People`}>People</Link>
      </div>

      {/* form */}
      <div style={{ marginBottom: 16 }}>
        <input
          name="title"
          placeholder="Title"
          value={form.title || ""}
          onChange={onChange}
          style={{ marginRight: 8 }}
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate || ""}
          onChange={onChange}
          style={{ marginRight: 8 }}
        />
        <input
          type="number"
          name="points"
          placeholder="Points"
          value={form.points ?? ""}
          onChange={onChange}
          style={{ marginRight: 8, width: 100 }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description || ""}
          onChange={onChange}
          style={{ verticalAlign: "top", marginRight: 8 }}
        />
        {editingId ? (
          <>
            <button onClick={saveEdit}>Save</button>
            <button onClick={cancelEdit} style={{ marginLeft: 8 }}>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={addItem}>+ Assignment</button>
        )}
      </div>

      {/* list */}
      <table border={1} cellPadding={8} width="100%">
        <thead>
          <tr>
            <th style={{ width: "25%" }}>Title</th>
            <th style={{ width: "15%" }}>Due</th>
            <th style={{ width: "10%" }}>Points</th>
            <th>Description</th>
            <th style={{ width: "18%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No assignments yet. Add your first one above.
              </td>
            </tr>
          ) : (
            items.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.dueDate || "-"}</td>
                <td>{a.points ?? "-"}</td>
                <td>{a.description || "-"}</td>
                <td>
                  <button onClick={() => startEdit(a)}>Edit</button>
                  <button
                    onClick={() => removeItem(a.id)}
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
 Add/Edit/Delete update UI immediately.
 Data persists in localStorage; refresh confirms.
      */}
    </div>
  );
}
