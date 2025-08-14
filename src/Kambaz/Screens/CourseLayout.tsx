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
    // if not a 24-hex MongoID, bounce to Dashboard
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
      <h2 className="mb-3">{course ? `${course.number ?? ""} ${course.title}`.trim() : "Course"}</h2>
      <div className="row">
        <div className="col-12 col-md-3 col-lg-2">
          <div className="list-group">
            <Item to="Home">Home</Item>
            <Item to="Modules">Modules</Item>
            <Item to="Assignments">Assignments</Item>
            <Item to="People">People</Item>
          </div>
        </div>
        <div className="col-12 col-md-9 col-lg-10"><Outlet /></div>
      </div>
    </div>
  );
}

function Item({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink end to={to} className={({ isActive }) =>
      "list-group-item list-group-item-action " + (isActive ? "active" : "")
    }>{children}</NavLink>
  );
}
