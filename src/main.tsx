import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary"; // ⬅️ import it

window.addEventListener("error", (e) => {
  console.log("🔥 Uncaught error event:", e.error || e.message);
});

window.addEventListener("unhandledrejection", (e) => {
  console.log("🔥 Unhandled Promise rejection:", e.reason);
});


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
