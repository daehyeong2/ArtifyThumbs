import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import MainFooter from "../components/Footer";
import pageScrollTop from "../components/pageScrollTop";

const Root = () => {
  pageScrollTop();
  return (
    <>
      <NavBar />
      <Outlet />
      <MainFooter />
    </>
  );
};

export default Root;
