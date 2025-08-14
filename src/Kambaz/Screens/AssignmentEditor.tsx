import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/api";

export default function AssignmentEditor() {
  const { cid, assignmentId } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    points: 100,
  });

  useEffect(() => {
    if (!cid || assignmentId === "new") return;
    api.get(`/courses/${cid}/assignments/${assignmentId}`).then((res) => {
      const { title, description, dueDate, points } = res.data;
      setForm({
        title,
        description,
        dueDate: dueDate?.slice(0, 10) || "",
        points,
      });
    });
  }, [cid, assignmentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!cid) return;

    const payload = { ...form };

    const endpoint =
      assignmentId === "new"
        ? `/courses/${cid}/assignments`
        : `/courses/${cid}/assignments/${assignmentId}`;

    const method = assignmentId === "new" ? api.post : api.put;

    method(endpoint, payload)
      .then(() => nav(`/courses/${cid}/assignments`))
      .catch((err) => alert("Save failed: " + err.message));
  };

  return (
    <div className="container mt-4">
      <h2>{assignmentId === "new" ? "New Assignment" : "Edit Assignment"}</h2>
      <div className="mb-3">
        <input
          className="form-control mb-2"
          placeholder="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          type="number"
          name="points"
          value={form.points}
          onChange={handleChange}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <button className="btn btn-primary" onClick={handleSave}>
          Save Assignment
        </button>
      </div>
    </div>
  );
}
