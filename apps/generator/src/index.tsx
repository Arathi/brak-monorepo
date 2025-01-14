import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Generic } from "./pages/generic";
import { Student } from "./pages/student";
import { Item } from "./pages/item";

import "./index.less";

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route index element={<Generic />} />
          <Route path="/student" element={<Student />} />
          <Route path="/item" element={<Item />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
