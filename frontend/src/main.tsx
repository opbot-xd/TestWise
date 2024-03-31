import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

(ReactDOM as any)
  .createRoot(document.getElementById("root") as HTMLElement)
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
