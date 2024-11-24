import "@atlaskit/css-reset";
import "./assets/global.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./languages/i18n";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
