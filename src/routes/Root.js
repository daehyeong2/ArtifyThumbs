import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

const Root = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Root;
