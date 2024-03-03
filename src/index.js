import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import router from "./router";
import { Helmet } from "react-helmet";
import { RecoilRoot } from "recoil";
import "./styles.css";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" sizes="16x16" href="/img/favicon.ico" />
      </Helmet>
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
    </QueryClientProvider>
  </RecoilRoot>
);
