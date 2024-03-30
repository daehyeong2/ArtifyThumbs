import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import MainFooter from "../components/Footer";
import pageScrollTop from "../components/pageScrollTop";
import TopButton from "../components/TopButton";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isRequestedAtom, userAtom } from "../atom";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Root = () => {
  const setUser = useSetRecoilState(userAtom);
  const [isRequested, setIsRequested] = useRecoilState(isRequestedAtom);
  if (!isRequested) {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/get`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.loggedIn) {
          setUser(res.data.user);
          setIsRequested(true);
        } else {
          setIsRequested(true);
        }
      });
  }
  pageScrollTop();
  return (
    <>
      <NavBar />
      <Wrapper>
        <Outlet />
      </Wrapper>
      <MainFooter />
      <TopButton />
    </>
  );
};

export default Root;
