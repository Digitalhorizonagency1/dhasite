import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "./LangContext";
import { ThemeProvider } from "./ThemeContext";
import Layout from "./Layout";
import App from "./App";
import Creative from "./Creative";
import Web from "./Web";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <LangProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<App />} />
              <Route path="creative" element={<Creative />} />
              <Route path="web" element={<Web />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LangProvider>
    </ThemeProvider>
  </StrictMode>
);
