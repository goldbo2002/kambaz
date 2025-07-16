import { HashRouter, Routes, Route } from "react-router-dom";
import Labs from "./Labs";
import Kambaz from "./Kambaz"; // <-- This is your main dashboard/app

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Home/root route, goes to your Kambaz app/dashboard */}
        <Route path="/" element={<Kambaz />} />
        {/* Labs parent route, shows Labs/index.tsx */}
        <Route path="/Labs/*" element={<Labs />} />
      </Routes>
    </HashRouter>
  );
}
