import React from "react";
import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

type Course = { _id: string; title: string; number?: string };

export default function CourseLayout() {
  const { cid } = useParams<{ cid?: string }>();
  const nav = useNavigate();
  const [course, setCourse] = React.useState<Course | null>(null);

  React.useEffect(() => {
    if (!cid) return;
    // Redirect if cid is not a valid 24-char hex MongoDB ObjectID
    if (!/^[0-9a-fA-F]{24}$/.test(cid)) {
      nav("/Kambaz/Dashboard", { replace: true });
      return;
    }
    api.get<Course>(`/courses/${cid}`)
      .then((r) => setCourse(r.data))
      .catch(() => nav("/Kambaz/Dashboard", { replace: true }));
  }, [cid, nav]);

  if (!cid) return <div>Loading...</div>;

  return (
    <div className="container-fluid">
      <h2 className="mb-3">
        {course ? `${course.number ?? ""} ${course.title}`.trim() : "Course"}
      </h2>
      <div className="row">
        <div className="col-3">
          <ul>
            <li>
              <NavLink to={`/courses/${cid}/assignments`}>
                Assignments
              </NavLink>
            </li>
            <li>
              <NavLink to={`/courses/${cid}/modules`}>
                Modules
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
