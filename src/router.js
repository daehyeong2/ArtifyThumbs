import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Root from "./routes/Root";
import NotFound from "./components/NotFound";
import Apply from "./routes/Apply";
import ApplyList from "./routes/ApplyList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "apply",
        element: <Apply />,
      },
      {
        path: "apply-list",
        element: <ApplyList />,
      },
    ],
  },
]);

export default router;
