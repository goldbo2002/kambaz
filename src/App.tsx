import { BrowserRouter, Routes, Route } from "react-router-dom";
import Kambaz from "./Kambaz"; // main app/dashboard page
import Labs from "./Labs";     // labs landing page
import Lab2 from "./Labs/Lab2"; // specific lab page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Kambaz />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/labs/lab2" element={<Lab2 />} />
        {/* Add more labs if needed */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
