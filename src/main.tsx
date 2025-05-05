import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./views/App.js";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { router } from "@/routes";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
