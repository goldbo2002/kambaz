// src/Kambaz/Screens/AssignmentEditor.tsx
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid?: string; aid?: string }>();
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    points: 100,
  });
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    if (!cid) return;

    if (aid) {
      // Edit mode
      setIsNew(false);
      api.get(`/courses/${cid}/assignments/${aid}`)
        .then(res => setForm(res.data))
        .catch(err => console.error("Failed to load assignment", err));
    }
  }, [cid, aid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cid) return;

    const payload = {
      ...form,
      points: Number(form.points) || 100,
    };

    const req = isNew
      ? api.post(`/courses/${cid}/assignments`, payload)
      : api.put(`/courses/${cid}/assignments/${aid}`, payload);

    req.then(() => nav(`/courses/${cid}/assignments`))
       .catch(err => console.error("Save failed", err));
  };

  return (
    <div className="container mt-4">
      <h2>{isNew ? "New Assignment" : "Edit Assignment"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={form.description}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input
            name="dueDate"
            type="date"
            className="form-control"
            value={form.dueDate?.slice(0, 10) || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Points</label>
          <input
            name="points"
            type="number"
            className="form-control"
            value={form.points}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary me-2" type="submit">
          {isNew ? "Create" : "Save"}
        </button>
        <button className="btn btn-secondary" type="button" onClick={() => nav(-1)}>
          Cancel
        </button>
      </form>
    </div>
  );
}
