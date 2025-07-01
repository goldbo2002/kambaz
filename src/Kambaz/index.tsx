import { Routes, Route, } from "react-router-dom";
import Account from "./Account";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";

export default function Kambaz() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="Account/*" element={<Account />} />
          <Route path="Dashboard" element={<Dashboard />} />
          {/* Add more routes: Course, Calendar, Inbox, etc, if you want */}
        </Routes>
      </div>
    </div>
  );
}
