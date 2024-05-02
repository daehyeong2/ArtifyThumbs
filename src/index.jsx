import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { RecoilRoot } from "recoil";
import "./styles.css";
import { AnimatePresence } from "framer-motion";

const container = document.getElementById("root");
const root = createRoot(container);

if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <RecoilRoot>
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
    </RecoilRoot>
  );
} else {
  root.render(
    <RecoilRoot>
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
    </RecoilRoot>
  );
}
