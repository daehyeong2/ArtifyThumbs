import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import MainFooter from "../components/Footer";
import pageScrollTop from "../components/pageScrollTop";
import TopButton from "../components/TopButton";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../atom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getUser } from "../api";
import { useEffect } from "react";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Root = () => {
  const setUser = useSetRecoilState(userAtom);
  const { data, isLoading } = useQuery("user-info", getUser);
  useEffect(() => {
    if (!isLoading && data) {
      setUser(data.user);
    }
  }, [isLoading, data, setUser]);

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
