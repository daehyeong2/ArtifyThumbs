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
import SecurePage from "./components/SecurePage";
import InquiryList from "./routes/InquiryList";
import DetailInquiry from "./routes/DetailInquiry";
import Profile from "./routes/Profile";
import Settings from "./routes/Settings";
import ProfileSettings from "./routes/ProfileSettings";
import AccountSettings from "./routes/AccountSettings";
import SuccessVerification from "./routes/SuccessVerification";
import PasswordReset from "./routes/PasswordReset";

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
        element: <SecurePage element={<Outlet />} authenticatedOnly />,
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
        element: <SecurePage element={<Outlet />} authenticatedOnly />,
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
        element: <SecurePage element={<Signup />} guestOnly />,
      },
      {
        path: "signin",
        element: <SecurePage element={<Signin />} guestOnly />,
      },
      {
        path: "inquiry",
        element: <Inquiry />,
      },
      {
        path: "order-management",
        element: <SecurePage element={<Outlet />} adminOnly />,
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
      {
        path: "inquiry-management",
        element: <SecurePage element={<Outlet />} adminOnly />,
        children: [
          {
            path: "",
            element: <InquiryList />,
          },
          {
            path: ":inquiryId",
            element: <DetailInquiry />,
          },
        ],
      },
      {
        path: "profile",
        element: <SecurePage element={<Profile />} authenticatedOnly />,
      },
      {
        path: "settings",
        element: <SecurePage element={<Settings />} authenticatedOnly />,
        children: [
          {
            path: "profile",
            element: <ProfileSettings />,
          },
          {
            path: "account",
            element: <AccountSettings />,
          },
        ],
      },
      {
        path: "success-email-verification",
        element: <SuccessVerification />,
      },
      {
        path: "password-reset",
        element: <SecurePage element={<PasswordReset />} guestOnly />,
      },
    ],
  },
]);

export default router;
