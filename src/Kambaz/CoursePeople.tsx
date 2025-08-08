import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Course = { id: string; title: string };
type User = {
  id: string;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
};

// keys
const USERS_KEY = "kambaz-users"; // global users (you already use this in People)
const ENROLL_MAP_KEY = "kambaz-enrollments-map"; // courseId -> userId[]

// helpers
function loadCourses(): Course[] {
  const s = localStorage.getItem("kambaz-courses");
  return s ? JSON.parse(s) : [];
}

function loadUsers(): User[] {
  const s = localStorage.getItem(USERS_KEY);
  return s ? JSON.parse(s) : [];
}

type EnrollMap = Record<string, string[]>;

function loadEnrollMap(): EnrollMap {
  const s = localStorage.getItem(ENROLL_MAP_KEY);
  return s ? JSON.parse(s) : {};
}

function saveEnrollMap(map: EnrollMap) {
  localStorage.setItem(ENROLL_MAP_KEY, JSON.stringify(map));
}

export default function CoursePeople() {
  const { courseId = "" } = useParams();

  const course = useMemo(() => {
    const all = loadCourses();
    return all.find((c) => c.id === courseId) || { id: courseId, title: "Course" };
  }, [courseId]);

  const [users, setUsers] = useState<User[]>(() => loadUsers());
  const [map, setMap] = useState<EnrollMap>(() => loadEnrollMap());
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  useEffect(() => {
    saveEnrollMap(map);
  }, [map]);

  const enrolledIds = map[courseId] || [];
  const enrolledUsers = users.filter((u) => enrolledIds.includes(u.id));
  const notEnrolledUsers = users.filter((u) => !enrolledIds.includes(u.id));

  const addToCourse = () => {
    if (!selectedUserId) return;
    setMap((m) => {
      const ids = new Set(m[courseId] || []);
      ids.add(selectedUserId);
      return { ...m, [courseId]: Array.from(ids) };
    });
    setSelectedUserId("");
  };

  const removeFromCourse = (uid: string) => {
    setMap((m) => {
      const next = (m[courseId] || []).filter((id) => id !== uid);
      return { ...m, [courseId]: next };
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>{course.title} · People</h2>

      {/* intra-course nav */}
      <div style={{ marginBottom: 12 }}>
        <Link to={`/Kambaz/Courses/${courseId}`}>← Modules</Link>
        <span style={{ margin: "0 8px" }}>·</span>
        <Link to={`/Kambaz/Courses/${courseId}/Assignments`}>Assignments</Link>
      </div>

      {/* add user to course */}
      <div style={{ marginBottom: 16 }}>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          style={{ marginRight: 8 }}
        >
          <option value="">Select user to enroll</option>
          {notEnrolledUsers.map((u) => (
            <option key={u.id} value={u.id}>
              {u.firstName} {u.lastName} ({u.username}){u.role ? ` – ${u.role}` : ""}
            </option>
          ))}
        </select>
        <button onClick={addToCourse}>Enroll</button>
      </div>

      {/* enrolled users table */}
      <table border={1} cellPadding={8} width="100%">
        <thead>
          <tr>
            <th style={{ width: "25%" }}>Name</th>
            <th style={{ width: "20%" }}>Username</th>
            <th style={{ width: "25%" }}>Email</th>
            <th style={{ width: "15%" }}>Role</th>
            <th style={{ width: "15%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrolledUsers.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No one enrolled yet. Add someone above.
              </td>
            </tr>
          ) : (
            enrolledUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.firstName} {u.lastName}</td>
                <td>{u.username}</td>
                <td>{u.email || "-"}</td>
                <td>{u.role || "-"}</td>
                <td>
                  <button onClick={() => removeFromCourse(u.id)} style={{ color: "red" }}>
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/*\
      Add/remove updates UI immediately.
different users into different courses
        Data persists in localStorage; refresh confirms.
      */}
    </div>
  );
}
