import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Root from "./routes/Root";
import NotFound from "./components/NotFound";
import Apply from "./routes/Apply";
import ApplyList from "./routes/ApplyList";
import DetailApply from "./routes/DetailApply";
import Signup from "./routes/Signup";
import Signin from "./routes/Signin";
import Inquiry from "./routes/Inquiry";
import Procedure from "./routes/Procedure";

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
        path: "apply/procedure",
        element: <Procedure />,
      },
      {
        path: "apply-list",
        element: <ApplyList />,
      },
      {
        path: "apply-list/:applyId",
        element: <DetailApply />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "inquiry",
        element: <Inquiry />,
      },
    ],
  },
]);

export default router;
