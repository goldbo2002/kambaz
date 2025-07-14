import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lab1 from "./Labs/Lab1";
import Lab2 from "./Labs/Lab2";
import Kambaz from "./Kambaz"; // or adjust if it's in a subfolder

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Labs/Lab1" element={<Lab1 />} />
        <Route path="/Labs/Lab2" element={<Lab2 />} />
        <Route path="/Kambaz" element={<Kambaz />} />
        {/* Optionally: default route */}
        <Route path="*" element={<Lab1 />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
