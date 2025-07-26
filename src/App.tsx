import { HashRouter, Routes, Route } from "react-router-dom";
import Labs from "./Labs";
import Kambaz from "./Kambaz"; // <-- This is your main dashboard/app
import Lab3 from "./Labs/Lab3";
//sets up react and defines what shows up for a url
export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Home/root route, goes to your Kambaz app/dashboard */}
        <Route path="/" element={<Kambaz />} />
        {/* Labs parent route, shows Labs/index.tsx */}
        <Route path="/Labs/*" element={<Labs />} />
        <Route path="/labs/lab3" element={<Lab3 />} />
      </Routes> 
    </HashRouter>
  );
}
//if url matches route, show whatevers there
//hashroute blocks 404 errors
