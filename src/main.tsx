import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary"; // ⬅️ import it
import { Provider } from "react-redux";
import store from "./redux/store";
try {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store ={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  );
} catch (err) {
  console.error("🔥 Uncaught render error:", err);
  const root = document.getElementById("root");
  if (root) {
    root.innerText = `Fatal error: ${err instanceof Error ? err.message : String(err)}`;
  }
}
