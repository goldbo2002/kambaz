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
      setIsNew(false);
      api.get(`/assignments/${cid}/${aid}`)
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
        <input type="text" name="title" value={form.title} onChange={handleChange} required />
        <textarea name="description" value={form.description} onChange={handleChange} />
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
        <input type="number" name="points" value={form.points} onChange={handleChange} />
        <button type="submit" className="btn btn-success">Save</button>
      </form>
    </div>
  );
}