import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Creative from "./Creative";
import Web from "./Web";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/creative" element={<Creative />} />
        <Route path="/web" element={<Web />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
