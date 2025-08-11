// src/Kambaz/Dashboard.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  findAllCourses, myCourses, enroll, unenroll,
  createCourse, updateCourse, deleteCourse
} from "./Courses/client";
import { currentUser, signout } from "./Account/client";
import { useAuth } from "../App"; // you have this context in App.tsx

type Course = {
  _id?: string;
  name: string;
  number?: string;
  section?: string;
  term?: string;
};

export default function Dashboard() {
  const [me, setMe] = useState<any | null>(null);
  const [all, setAll] = useState<Course[]>([]);
  const [mine, setMine] = useState<Course[]>([]);
  const [view, setView] = useState<"ALL" | "MY">("ALL");
  const [draft, setDraft] = useState<Course>({ name: "" });

  const navigate = useNavigate();
  const { setUser } = useAuth(); // so the header/UI can reflect logged-out state too

  useEffect(() => {
    (async () => {
      try { setMe(await currentUser()); } catch { setMe(null); }
      setAll(await findAllCourses());
      setMine(await myCourses());
    })();
  }, []);

  const isEnrolled = (cid: string) => mine.some(c => c._id === cid);

  const toggleEnroll = async (cid?: string) => {
    if (!cid || !me?._id) return alert("Sign in first");
    if (isEnrolled(cid)) await unenroll(me._id, cid);
    else await enroll(me._id, cid);
    setMine(await myCourses()); // refresh my list
  };

  const onCreate = async () => {
    if (!draft.name.trim()) return;
    const created = await createCourse(draft);
    setAll(prev => [created, ...prev]);
    setDraft({ name: "" });
    setMine(await myCourses()); // author is auto-enrolled
  };

  const onUpdate = async (c: Course, patch: Partial<Course>) => {
    if (!c._id) return;
    const saved = await updateCourse(c._id, patch);
    setAll(prev => prev.map(x => x._id === saved._id ? saved : x));
  };

  const onDelete = async (c: Course) => {
    if (!c._id) return;
    setAll(prev => prev.filter(x => x._id !== c._id)); // optimistic
    await deleteCourse(c._id);
    setMine(await myCourses());
  };

  // NEW: sign out button handler
  const handleSignout = async () => {
    try { await signout(); } catch {}
    setUser(null);      // clear context (your App.tsx provides this)
    setMe(null);        // clear local view state
    navigate("/Kambaz/Account/Signin");
  };

  const list = view === "ALL" ? all : mine;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3>Dashboard</h3>
        {me ? (
          <div className="d-flex align-items-center gap-2">
            <span className="text-secondary small">
              Signed in as <strong>{me.username}</strong>
            </span>
            <button className="btn btn-sm btn-outline-danger" onClick={handleSignout}>
              Sign Out
            </button>
          </div>
        ) : (
          <div className="alert alert-warning m-0 py-1 px-2">
            Not signed in. <Link to="/Kambaz/Account/Signin">Sign in</Link>
          </div>
        )}
      </div>

      <div className="d-flex gap-2 my-3">
        <button className={`btn ${view==="ALL"?"btn-primary":"btn-outline-primary"}`} onClick={() => setView("ALL")}>
          All Courses
        </button>
        <button className={`btn ${view==="MY"?"btn-primary":"btn-outline-primary"}`} onClick={() => setView("MY")}>
          My Courses
        </button>
      </div>

      <div className="card p-3 mb-3">
        <div className="row g-2">
          <div className="col-md-4">
            <input className="form-control" placeholder="Course name"
                   value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })}/>
          </div>
          <div className="col-md-2">
            <input className="form-control" placeholder="Number"
                   value={draft.number || ""} onChange={e => setDraft({ ...draft, number: e.target.value })}/>
          </div>
          <div className="col-md-2">
            <input className="form-control" placeholder="Section"
                   value={draft.section || ""} onChange={e => setDraft({ ...draft, section: e.target.value })}/>
          </div>
          <div className="col-md-2">
            <input className="form-control" placeholder="Term"
                   value={draft.term || ""} onChange={e => setDraft({ ...draft, term: e.target.value })}/>
          </div>
          <div className="col-md-2">
            <button className="btn btn-success w-100" onClick={onCreate}>+ Create</button>
          </div>
        </div>
      </div>

      {!list.length && <div className="text-secondary">No courses.</div>}

      <div className="list-group">
        {list.map(c => (
          <div key={c._id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Link to={`/Kambaz/Courses/${c._id}`} className="fw-semibold">{c.name}</Link>
                <div className="small text-secondary">
                  {[c.number, c.section, c.term].filter(Boolean).join(" • ")}
                </div>
              </div>
              <div className="d-flex gap-2">
                <button className={`btn btn-sm ${isEnrolled(c._id!) ? "btn-outline-warning" : "btn-outline-success"}`}
                        onClick={() => toggleEnroll(c._id)}>
                  {isEnrolled(c._id!) ? "Unenroll" : "Enroll"}
                </button>
                <button className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          const newName = prompt("New name?", c.name);
                          if (newName && newName !== c.name) onUpdate(c, { name: newName });
                        }}>
                  Rename
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(c)}>
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
