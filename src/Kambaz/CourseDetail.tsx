import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { listModules, createModule, updateModule, deleteModule } from "./Modules/client";

type Module = {
  _id?: string;
  course?: string;
  title: string;
  description?: string;
};

export default function CourseDetail() {
  const { courseId = "" } = useParams();
  const [mods, setMods] = useState<Module[]>([]);
  const [draft, setDraft] = useState<Module>({ title: "" });

  useEffect(() => {
    if (!courseId) return;
    listModules(courseId).then(setMods);
  }, [courseId]);

  const onCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim()) return;
    const created = await createModule({ ...draft, course: courseId });
    setMods(prev => [created, ...prev]);
    setDraft({ title: "" });
  };

  const onRename = async (m: Module) => {
    const title = prompt("New module title", m.title);
    if (!title || title === m.title || !m._id) return;
    const saved = await updateModule(m._id, { title });
    setMods(prev => prev.map(x => (x._id === saved._id ? saved : x)));
  };

  const onDelete = async (m: Module) => {
    if (!m._id) return;
    setMods(prev => prev.filter(x => x._id !== m._id)); // optimistic
    await deleteModule(m._id);
  };

  const onDraft = (k: keyof Module) => (e: ChangeEvent<HTMLInputElement>) =>
    setDraft(d => ({ ...d, [k]: e.target.value }));

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h3 className="m-0">Modules</h3>
        <div className="d-flex gap-3">
          <Link to={`/Kambaz/Courses/${courseId}/People`}>People</Link>
          <Link to={`/Kambaz/Courses/${courseId}/Assignments`}>Assignments</Link>
          <Link to="/Kambaz/Dashboard">← Back to Dashboard</Link>
        </div>
      </div>

      <form className="card p-3 mb-3" onSubmit={onCreate}>
        <div className="row g-2">
          <div className="col-md-8">
            <input className="form-control" placeholder="New module title"
                   value={draft.title} onChange={onDraft("title")} />
          </div>
          <div className="col-md-4">
            <button className="btn btn-success w-100" type="submit">+ Add Module</button>
          </div>
        </div>
      </form>

      {!mods.length && <div className="text-secondary">No modules for this course.</div>}

      <div className="list-group">
        {mods.map(m => (
          <div key={m._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="fw-semibold">{m.title}</div>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-secondary" onClick={() => onRename(m)}>Rename</button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(m)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
