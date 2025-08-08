import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

// ===== Types =====
type Course = {
  id: string;
  title: string;
  description: string;
  instructor?: string;
};
type User = {
  id: string;
  username: string;
  role?: string;
};

// ===== Utils / Storage Keys =====
const rid = () => Math.random().toString(36).slice(2, 10);

const COURSES_KEY = "kambaz-courses";
const USERS_KEY = "kambaz-users";
const CURRENT_KEY = "kambaz-current-user-id";

// Enrollments (two synchronized maps):
// - by user: userId -> string[] (courseIds)
// - by course: courseId -> string[] (userIds)  (used by CoursePeople)
const ENROLL_BY_USER_KEY = "kambaz-enrollments-by-user";
const ENROLL_BY_COURSE_KEY = "kambaz-enrollments-map";

// ===== Loaders/Savers =====
const loadCourses = (): Course[] => {
  const s = localStorage.getItem(COURSES_KEY);
  if (s) return JSON.parse(s);
  return [
    { id: rid(), title: "React Fundamentals", description: "Learn the basics of React and build cool stuff.", instructor: "alice" },
    { id: rid(), title: "Node.js for Beginners", description: "Backend development made easy.", instructor: "bob" },
    { id: rid(), title: "Web Dev Patterns", description: "Design patterns for scalable frontends.", instructor: "chris" }
  ];
};
const saveCourses = (courses: Course[]) =>
  localStorage.setItem(COURSES_KEY, JSON.stringify(courses));

const loadUsers = (): User[] => {
  const s = localStorage.getItem(USERS_KEY);
  return s ? JSON.parse(s) : [];
};
const loadCurrentUserId = (): string | null => localStorage.getItem(CURRENT_KEY);

// maps
type ByUser = Record<string, string[]>;
type ByCourse = Record<string, string[]>;

const loadByUser = (): ByUser => {
  const s = localStorage.getItem(ENROLL_BY_USER_KEY);
  return s ? JSON.parse(s) : {};
};
const saveByUser = (m: ByUser) =>
  localStorage.setItem(ENROLL_BY_USER_KEY, JSON.stringify(m));

const loadByCourse = (): ByCourse => {
  const s = localStorage.getItem(ENROLL_BY_COURSE_KEY);
  return s ? JSON.parse(s) : {};
};
const saveByCourse = (m: ByCourse) =>
  localStorage.setItem(ENROLL_BY_COURSE_KEY, JSON.stringify(m));

// ===== Component =====
export default function Dashboard() {
  // data
  const [courses, setCourses] = useState<Course[]>(loadCourses);
  useEffect(() => saveCourses(courses), [courses]);

  const [users] = useState<User[]>(loadUsers);
  const [currentUserId] = useState<string | null>(loadCurrentUserId());

  const currentUser = useMemo(
    () => users.find(u => u.id === currentUserId) || null,
    [users, currentUserId]
  );

  // enroll maps
  const [byUser, setByUser] = useState<ByUser>(loadByUser);
  const [byCourse, setByCourse] = useState<ByCourse>(loadByCourse);
  useEffect(() => saveByUser(byUser), [byUser]);
  useEffect(() => saveByCourse(byCourse), [byCourse]);

  // add/edit form state
  const [form, setForm] = useState<Partial<Course>>({
    title: "",
    description: "",
    instructor: ""
  });
  const [editing, setEditing] = useState<string | null>(null);

  // view toggle: all vs mine
  const [view, setView] = useState<"all" | "mine">("all");

  // visible courses
  const enrolledCourseIds: string[] = useMemo(() => {
    if (!currentUser) return [];
    return byUser[currentUser.id] || [];
  }, [currentUser, byUser]);

  const visibleCourses = useMemo(() => {
    if (view === "mine" && currentUser) {
      return courses.filter(c => enrolledCourseIds.includes(c.id));
    }
    return courses;
  }, [view, courses, enrolledCourseIds, currentUser]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  // add
  const addCourse = () => {
    if (!form.title || !form.description) {
      alert("Title and description required.");
      return;
    }
    const newCourse: Course = {
      id: rid(),
      title: String(form.title),
      description: String(form.description),
      instructor: form.instructor || (currentUser?.username ?? "faculty")
    };
    setCourses(cs => [...cs, newCourse]);

    // If logged in, auto-enroll creator
    if (currentUser) {
      setByUser(m => {
        const list = new Set(m[currentUser.id] || []);
        list.add(newCourse.id);
        return { ...m, [currentUser.id]: Array.from(list) };
      });
      setByCourse(m => {
        const list = new Set(m[newCourse.id] || []);
        list.add(currentUser.id);
        return { ...m, [newCourse.id]: Array.from(list) };
      });
    }

    setForm({ title: "", description: "", instructor: "" });
  };

  // edit
  const startEdit = (id: string) => {
    const course = courses.find(c => c.id === id);
    if (!course) return;
    setEditing(id);
    setForm(course);
  };
  const saveEdit = () => {
    if (!editing) return;
    if (!form.title || !form.description) {
      alert("Title and description required.");
      return;
    }
    setCourses(cs => cs.map(c => (c.id === editing ? { ...c, ...form } as Course : c)));
    setEditing(null);
    setForm({ title: "", description: "", instructor: "" });
  };

  // delete
  const deleteCourse = (id: string) => {
    setCourses(cs => cs.filter(c => c.id !== id));
    // remove enrollments tied to this course
    setByCourse(m => {
      const { [id]: _drop, ...rest } = m;
      return rest;
    });
    setByUser(m => {
      const copy: ByUser = {};
      for (const uid of Object.keys(m)) {
        copy[uid] = (m[uid] || []).filter(cid => cid !== id);
      }
      return copy;
    });
    if (editing === id) {
      setEditing(null);
      setForm({ title: "", description: "", instructor: "" });
    }
  };

  // enroll/unenroll **for the current user**
  const toggleEnroll = (courseId: string) => {
    if (!currentUser) return alert("Sign in to enroll.");
    setByUser(m => {
      const set = new Set(m[currentUser.id] || []);
      if (set.has(courseId)) set.delete(courseId); else set.add(courseId);
      return { ...m, [currentUser.id]: Array.from(set) };
    });
    setByCourse(m => {
      const set = new Set(m[courseId] || []);
      if (set.has(currentUser.id)) set.delete(currentUser.id); else set.add(currentUser.id);
      return { ...m, [courseId]: Array.from(set) };
    });
  };

  const isEnrolled = (courseId: string) =>
    currentUser ? enrolledCourseIds.includes(courseId) : false;

  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard</h2>

      {/* Session banner */}
      <div style={{ marginBottom: 12, opacity: 0.85 }}>
        {currentUser ? (
          <span>Signed in as <b>{currentUser.username}</b></span>
        ) : (
          <span>Not signed in. <Link to="/Kambaz/Account/Signin">Sign in</Link></span>
        )}
      </div>

      {/* Top action bar: All vs My Courses */}
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setView("all")}
          disabled={view === "all"}
          style={{ marginRight: 8 }}
        >
          All Courses
        </button>
        <button
          onClick={() => setView("mine")}
          disabled={view === "mine"}
          style={{ marginRight: 16 }}
        >
          My Courses
        </button>
        <span>
          {view === "all" ? "Viewing all available courses." : "Viewing only your enrolled courses."}
        </span>
      </div>

      {/* Add / Edit Course */}
      <div style={{ marginBottom: 24 }}>
        <input
          name="title"
          placeholder="Course title"
          value={form.title || ""}
          onChange={onChange}
          style={{ marginRight: 8 }}
        />
        <input
          name="instructor"
          placeholder="Instructor"
          value={form.instructor || ""}
          onChange={onChange}
          style={{ marginRight: 8 }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description || ""}
          onChange={onChange}
          style={{ marginRight: 8, verticalAlign: "top" }}
        />
        {editing ? (
          <>
            <button onClick={saveEdit}>Save</button>
            <button
              onClick={() => {
                setEditing(null);
                setForm({ title: "", description: "", instructor: "" });
              }}
              style={{ marginLeft: 8 }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={addCourse}>Add Course</button>
        )}
      </div>

      {/* Courses Table */}
      <table border={1} cellPadding={8} width="100%">
        <thead>
          <tr>
            <th style={{ width: "25%" }}>Title</th>
            <th style={{ width: "15%" }}>Instructor</th>
            <th>Description</th>
            <th style={{ width: "30%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleCourses.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                {view === "mine"
                  ? "You are not enrolled in any courses."
                  : "No courses available."}
              </td>
            </tr>
          ) : (
            visibleCourses.map((c) => (
              <tr key={c.id}>
                <td>{c.title}</td>
                <td>{c.instructor}</td>
                <td>{c.description}</td>
                <td>
                  <Link to={`/Kambaz/Courses/${c.id}`}>
                    <button>Go</button>
                  </Link>

                  <button onClick={() => startEdit(c.id)} style={{ marginLeft: 8 }}>
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCourse(c.id)}
                    style={{ marginLeft: 8, color: "red" }}
                  >
                    Delete
                  </button>

                  {/* Enroll/Unenroll shown only in All view per rubric */}
                  {view === "all" && (
                    <button
                      onClick={() => toggleEnroll(c.id)}
                      style={{ marginLeft: 8 }}
                    >
                      {isEnrolled(c.id) ? "Unenroll" : "Enroll"}
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Notes:
 Login persists w CURRENT_KEY
Enrollments stored per-user and per-course, kept in sync.
My Courses shows only current user's enrolled courses.
Add/Edit/Delete update UI immediately
      */}
    </div>
  );
}
