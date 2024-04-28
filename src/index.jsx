import React, { lazy } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import router from "./router";
import { RecoilRoot } from "recoil";
import "./styles.css";
import { AnimatePresence } from "framer-motion";
const LazyReactQueryDevtools = lazy(() =>
  import("react-query/devtools").then((module) => ({
    default: module.ReactQueryDevtools,
  }))
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 3,
      cacheTime: 1000 * 60 * 5,
    },
  },
});

const container = document.getElementById("root");
const root = createRoot(container);

if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AnimatePresence mode="wait">
          <RouterProvider router={router} />
        </AnimatePresence>
        {process.env.NODE_ENV === "development" && (
          <LazyReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </RecoilRoot>
  );
} else {
  root.render(
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AnimatePresence mode="wait">
          <RouterProvider router={router} />
        </AnimatePresence>
        {process.env.NODE_ENV === "development" && (
          <LazyReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </RecoilRoot>
  );
}
