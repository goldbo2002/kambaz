import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/api";

export default function AssignmentEditor() {
  const { courseId, assignmentId } = useParams();
  const nav = useNavigate();
  const isNew = assignmentId === "new";

  const [form, setForm] = useState({
    title: "",
    dueDate: "",
    points: 100,
    description: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!isNew && courseId && assignmentId) {
      api.get(`/courses/${courseId}/assignments/${assignmentId}`)
        .then(res => setForm(res.data))
        .catch(() => setError("Failed to load assignment"));
    }
  }, [assignmentId, courseId, isNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (!form.title) return setError("Title is required");

      if (isNew) {
        await api.post(`/courses/${courseId}/assignments`, form);
      } else {
        await api.put(`/courses/${courseId}/assignments/${assignmentId}`, form);
      }

      nav(`/courses/${courseId}/assignments`);
    } catch (err) {
      console.error("Save failed:", err);
      setError("Failed to save assignment");
    }
  };

  return (
    <div className="container mt-4">
      <h3>{isNew ? "New Assignment" : "Edit Assignment"}</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <input className="form-control mb-3" name="title" value={form.title} onChange={handleChange} placeholder="Title" />
      <input className="form-control mb-3" name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
      <input className="form-control mb-3" name="points" type="number" value={form.points} onChange={handleChange} placeholder="Points" />
      <textarea className="form-control mb-3" name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={4} />
      
      <button className="btn btn-success" onClick={handleSave}>
        Save Assignment
      </button>
    </div>
  );
}
