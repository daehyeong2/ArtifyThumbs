import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import MainFooter from "../components/Footer";

const Root = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <MainFooter />
    </>
  );
};

export default Root;
