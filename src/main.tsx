import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary"; // ⬅️ import it
console.log("🔥 App is about to mount");

window.addEventListener("error", (e) => {
  console.error("🔥 Uncaught error at window level:", e.error ?? e.message ?? e);
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("🔥 Unhandled Promise rejection at window level:", e.reason ?? e);
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
