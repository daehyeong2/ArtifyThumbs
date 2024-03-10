import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import MainFooter from "../components/Footer";
import pageScrollTop from "../components/pageScrollTop";
import TopButton from "../components/TopButton";

const Root = () => {
  pageScrollTop();
  return (
    <>
      <NavBar />
      <Outlet />
      <MainFooter />
      <TopButton />
    </>
  );
};

export default Root;
