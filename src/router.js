import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Root from "./routes/Root";
import NotFound from "./components/NotFound";
import Order from "./routes/Order";

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
        path: "order",
        element: <Order />,
      },
    ],
  },
]);

export default router;
