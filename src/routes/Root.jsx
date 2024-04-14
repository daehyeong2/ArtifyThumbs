import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import MainFooter from "../components/Footer";
import pageScrollTop from "../components/pageScrollTop";
import TopButton from "../components/TopButton";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom, userIsLoadedAtom } from "../atom";
import axiosInstance from "../axiosInstance";
import { useEffect } from "react";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Root = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const setUserIsLoaded = useSetRecoilState(userIsLoadedAtom);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token && !user) {
      axiosInstance
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/get`)
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data);
            setUserIsLoaded(true);
          }
        });
    } else {
      setUserIsLoaded(true);
    }
  }, [token, user, setUser, setUserIsLoaded]);
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
