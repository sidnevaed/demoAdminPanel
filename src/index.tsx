import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { AppWithStore } from "./App";
import "./firebase/firebase";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(<AppWithStore />);
