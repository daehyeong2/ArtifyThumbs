import { Outlet, createBrowserRouter } from "react-router-dom";
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
import OrderManagement from "./routes/OrderManagement";
import DetailOrderManagement from "./routes/DetailOrderManagement";

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
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Apply />,
          },
          {
            path: "procedure",
            element: <Procedure />,
          },
        ],
      },
      {
        path: "apply-list",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <ApplyList />,
          },
          {
            path: ":applyId",
            element: <DetailApply />,
          },
        ],
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
      {
        path: "order-management",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <OrderManagement />,
          },
          {
            path: ":orderId",
            element: <DetailOrderManagement />,
          },
        ],
      },
    ],
  },
]);

export default router;
