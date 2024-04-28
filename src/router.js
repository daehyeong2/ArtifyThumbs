import { Outlet, createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import Root from "./routes/Root";
import NotFound from "./components/NotFound";
import SecurePage from "./components/SecurePage";
import styled from "styled-components";
const Home = React.lazy(() => import("./routes/Home"));
const About = React.lazy(() => import("./routes/About"));
const Apply = React.lazy(() => import("./routes/Apply"));
const ApplyList = React.lazy(() => import("./routes/ApplyList"));
const DetailApply = React.lazy(() => import("./routes/DetailApply"));
const Signup = React.lazy(() => import("./routes/Signup"));
const Signin = React.lazy(() => import("./routes/Signin"));
const Inquiry = React.lazy(() => import("./routes/Inquiry"));
const Procedure = React.lazy(() => import("./routes/Procedure"));
const OrderManagement = React.lazy(() => import("./routes/OrderManagement"));
const DetailOrderManagement = React.lazy(() =>
  import("./routes/DetailOrderManagement")
);
const InquiryList = React.lazy(() => import("./routes/InquiryList"));
const DetailInquiry = React.lazy(() => import("./routes/DetailInquiry"));

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
`;

const loading = <Loading>Loading...</Loading>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={loading}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={loading}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "apply",
        element: <SecurePage element={<Outlet />} authenticatedOnly />,
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={loading}>
                <Apply />
              </Suspense>
            ),
          },
          {
            path: "procedure",
            element: (
              <Suspense fallback={loading}>
                <Procedure />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "apply-list",
        element: <SecurePage element={<Outlet />} authenticatedOnly />,
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={loading}>
                <ApplyList />
              </Suspense>
            ),
          },
          {
            path: ":applyId",
            element: (
              <Suspense fallback={loading}>
                <DetailApply />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={loading}>
            <SecurePage element={<Signup />} guestOnly />
          </Suspense>
        ),
      },
      {
        path: "signin",
        element: (
          <Suspense fallback={loading}>
            <SecurePage element={<Signin />} guestOnly />
          </Suspense>
        ),
      },
      {
        path: "inquiry",
        element: (
          <Suspense fallback={loading}>
            <Inquiry />
          </Suspense>
        ),
      },
      {
        path: "order-management",
        element: <SecurePage element={<Outlet />} adminOnly />,
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={loading}>
                <OrderManagement />
              </Suspense>
            ),
          },
          {
            path: ":orderId",
            element: (
              <Suspense fallback={loading}>
                <DetailOrderManagement />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "inquiry-management",
        element: <SecurePage element={<Outlet />} adminOnly />,
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={loading}>
                <InquiryList />
              </Suspense>
            ),
          },
          {
            path: ":inquiryId",
            element: (
              <Suspense fallback={loading}>
                <DetailInquiry />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
