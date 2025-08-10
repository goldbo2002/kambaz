import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import {
  listAssignments, createAssignment, updateAssignment, deleteAssignment
} from "./Assignments/client";

type Assignment = {
  _id?: string;
  course?: string;
  title: string;
  points?: number;
  dueDate?: string; // ISO string
};

export default function Assignments() {
  const { courseId = "" } = useParams();
  const [items, setItems] = useState<Assignment[]>([]);
  const [draft, setDraft] = useState<Assignment>({ title: "", points: 100 });

  useEffect(() => {
    if (!courseId) return;
    listAssignments(courseId).then(setItems);
  }, [courseId]);

  const onCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim()) return;
    const created = await createAssignment({ ...draft, course: courseId });
    setItems(prev => [created, ...prev]);
    setDraft({ title: "", points: 100, dueDate: "" });
  };

  const onUpdate = async (a: Assignment, patch: Partial<Assignment>) => {
    if (!a._id) return;
    const saved = await updateAssignment(a._id, patch);
    setItems(prev => prev.map(x => (x._id === saved._id ? saved : x)));
  };

  const onDelete = async (a: Assignment) => {
    if (!a._id) return;
    setItems(prev => prev.filter(x => x._id !== a._id)); // optimistic
    await deleteAssignment(a._id);
  };

  const setDraftField = (k: keyof Assignment) =>
    (e: ChangeEvent<HTMLInputElement>) => setDraft(d => ({ ...d, [k]: e.target.value }));

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h3 className="m-0">Assignments</h3>
        <div className="d-flex gap-3">
          <Link to={`/Kambaz/Courses/${courseId}`}>Modules</Link>
          <Link to={`/Kambaz/Courses/${courseId}/People`}>People</Link>
          <Link to="/Kambaz/Dashboard">← Back to Dashboard</Link>
        </div>
      </div>

      <form className="card p-3 mb-3" onSubmit={onCreate}>
        <div className="row g-2">
          <div className="col-md-5">
            <input className="form-control" placeholder="Title"
                   value={draft.title} onChange={setDraftField("title")} />
          </div>
          <div className="col-md-2">
            <input className="form-control" placeholder="Points"
                   value={draft.points ?? 0}
                   onChange={(e) => setDraft(d => ({ ...d, points: Number(e.target.value || 0) }))} />
          </div>
          <div className="col-md-3">
            <input className="form-control" type="date"
                   value={draft.dueDate || ""}
                   onChange={setDraftField("dueDate")} />
          </div>
          <div className="col-md-2">
            <button className="btn btn-success w-100" type="submit">+ Add</button>
          </div>
        </div>
      </form>

      {!items.length && <div className="text-secondary">No assignments yet.</div>}

      <div className="list-group">
        {items.map(a => (
          <div key={a._id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div className="w-50">
                <input className="form-control" value={a.title}
                       onChange={(e) => onUpdate(a, { title: e.target.value })} />
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-1">
                  <span className="text-secondary">Points</span>
                  <input className="form-control" style={{ width: 90 }}
                         value={a.points ?? 0}
                         onChange={(e) => onUpdate(a, { points: Number(e.target.value || 0) })} />
                </div>
                <div className="d-flex align-items-center gap-1">
                  <span className="text-secondary">Due</span>
                  <input className="form-control" style={{ width: 170 }} type="date"
                         value={a.dueDate ? a.dueDate.slice(0, 10) : ""}
                         onChange={(e) => onUpdate(a, { dueDate: e.target.value })} />
                </div>
                <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(a)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
