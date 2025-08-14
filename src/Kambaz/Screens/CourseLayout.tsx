// src/Kambaz/Screens/CourseLayout.tsx

import { Outlet, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function CourseLayout({ children }: { children?: React.ReactNode }) {
  const { cid } = useParams();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar cid={cid || ""} />
      <div style={{ flexGrow: 1, padding: "20px" }}>
        {children || <Outlet />}
      </div>
    </div>
  );
}
