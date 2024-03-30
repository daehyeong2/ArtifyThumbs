import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import MainFooter from "../components/Footer";
import pageScrollTop from "../components/pageScrollTop";
import TopButton from "../components/TopButton";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../atom";

const Root = () => {
  const setUser = useSetRecoilState(userAtom);
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/get`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data);
      setUser(res.data.user);
    });
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
