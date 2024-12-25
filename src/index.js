import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { StateProvider } from "./util/Hook/StoreHook";
import Main from "./Main";

const MOUNT_NODE = document.getElementById("root");
const root = ReactDOM.createRoot(MOUNT_NODE)
root.render(
    <StateProvider>
      <StrictMode>
        <Main />
      </StrictMode>
    </StateProvider>
);


reportWebVitals();
