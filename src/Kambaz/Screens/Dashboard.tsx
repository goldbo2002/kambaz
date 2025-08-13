import React from "react";
import { api } from "../../lib/api";
import { Link, useNavigate } from "react-router-dom";

type Course = {
  _id: string;
  title: string;
  number?: string;
  image?: string;
};

export default function Dashboard() {
  const nav = useNavigate();
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [mine, setMine] = React.useState<string[]>([]);
  const [mode, setMode] = React.useState<"ALL" | "MY">("ALL");
  const [draft, setDraft] = React.useState<Partial<Course>>({
    title: "New Course",
    number: "CS0000",
  });

  // Load courses + my enrollments (if logged in)
  const load = React.useCallback(async () => {
    const all = await api.get<Course[]>("/courses").then(r => r.data);
    setCourses(all);

    try {
      const my = await api.get<Course[]>("/enrollments/my").then(r => r.data);
      setMine(my.map(c => c._id));
    } catch {
      // not logged in -> no enrollments; ignore 401
      setMine([]);
    }
  }, []);

  React.useEffect(() => { load(); }, [load]);

  const createCourse = async () => {
    try {
      const { data } = await api.post<Course>("/courses", {
        title: draft.title || "Untitled Course",
        number: draft.number || ""
      });
      setCourses(c => [data, ...c]);
      setDraft({ title: "New Course", number: "CS0000" });
    } catch (e: any) {
      console.error("Create course failed:", e?.response?.status, e?.message);
      alert("Create course failed. Check console for details.");
    }
  };

  const updateCourse = async (c: Course) => {
    try {
      const { data } = await api.put<Course>(`/courses/${c._id}`, c);
      setCourses(list => list.map(x => (x._id === c._id ? data : x)));
    } catch (e: any) {
      console.error("Update course failed:", e?.response?.status, e?.message);
      alert("Update course failed.");
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      await api.delete(`/courses/${id}`);
      setCourses(list => list.filter(x => x._id !== id));
      setMine(m => m.filter(cid => cid !== id));
    } catch (e: any) {
      console.error("Delete course failed:", e?.response?.status, e?.message);
      alert("Delete course failed.");
    }
  };

  const toggleEnroll = async (c: Course) => {
    try {
      if (mine.includes(c._id)) {
        await api.post("/enrollments/unenroll", { course: c._id });
        setMine(m => m.filter(id => id !== c._id));
      } else {
        await api.post("/enrollments/enroll", { course: c._id });
        setMine(m => [c._id, ...m]);
      }
    } catch (e: any) {
      if (e?.response?.status === 401) {
        // needs login
        nav("/Kambaz/Account/Signin");
        return;
      }
      console.error("Enroll toggle failed:", e?.response?.status, e?.message);
      alert("Enroll/Unenroll failed.");
    }
  };

  const visible = mode === "ALL" ? courses : courses.filter(c => mine.includes(c._id));

  return (
    <div className="container-fluid">
      <h1>Dashboard</h1>

      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          style={{ maxWidth: 260 }}
          placeholder="Title"
          value={draft.title || ""}
          onChange={e => setDraft({ ...draft, title: e.target.value })}
        />
        <input
          className="form-control"
          style={{ maxWidth: 160 }}
          placeholder="Number"
          value={draft.number || ""}
          onChange={e => setDraft({ ...draft, number: e.target.value })}
        />
        <button className="btn btn-danger" onClick={createCourse}>+ Course</button>

        <div className="ms-auto btn-group">
          <button className={`btn btn-outline-secondary ${mode==="ALL"?"active":""}`} onClick={()=>setMode("ALL")}>All Courses</button>
          <button className={`btn btn-outline-secondary ${mode==="MY"?"active":""}`} onClick={()=>setMode("MY")}>My Courses</button>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
        {visible.map(c => (
          <div className="col" key={c._id}>
            <div className="card h-100">
              <div className="card-img-top bg-light" style={{ height: 120 }} />
              <div className="card-body d-flex flex-column">
                <input
                  className="form-control mb-2"
                  value={c.title}
                  onChange={e => updateLocalTitle(c._id, e.target.value, setCourses)}
                  onBlur={e => updateCourse({ ...c, title: e.target.value })}
                />
                <div className="d-flex mt-auto justify-content-between">
                  <Link className="btn btn-outline-primary" to={`/Kambaz/Courses/${c._id}/Home`}>Open</Link>
                  <button className="btn btn-outline-secondary" onClick={() => toggleEnroll(c)}>
                    {mine.includes(c._id) ? "Unenroll" : "Enroll"}
                  </button>
                  <button className="btn btn-outline-danger" onClick={() => deleteCourse(c._id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {visible.length === 0 && <div className="text-muted">No courses</div>}
      </div>
    </div>
  );
}

function updateLocalTitle(id: string, title: string, setCourses: React.Dispatch<React.SetStateAction<Course[]>>) {
  setCourses(list => list.map(x => (x._id === id ? { ...x, title } : x)));
}
