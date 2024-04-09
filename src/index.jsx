import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import router from "./router";
import { RecoilRoot } from "recoil";
import "./styles.css";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 3,
      cacheTime: 1000 * 60 * 5,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </RecoilRoot>
);
