import { Outlet, useMatch } from "react-router";
import styled from "styled-components";
import { auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import CustomLink from "../components/CustomLink";
import usePrompt from "../components/usePrompt";
import { useRecoilValue } from "recoil";
import { isBlockedAtom } from "../atom";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 140px 0;
  box-sizing: border-box;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: bold;
`;

const Container = styled.div`
  width: 100%;
  flex: 1;
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 10px;
`;

const SideBar = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  height: 100%;
`;

const SideButton = styled(CustomLink)`
  display: flex;
  position: relative;
  text-decoration: none;
  color: black;
  padding: 10px 15px;
  border-radius: 7px;
  align-items: center;
  gap: 6px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Main = styled.section`
  padding-bottom: 100px;
  height: 100%;
`;

const LogOut = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: red;
  padding: 10px 15px;
  border-radius: 7px;
  position: absolute;
  bottom: 5px;
  width: 100%;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;
  font-size: 16px;
  font-weight: bold;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &:hover {
    background-color: rgba(255, 0, 0, 0.08);
  }
`;

const Indicator = styled.div`
  width: 4px;
  height: 90%;
  border-radius: 8px;
  background-color: #0984e3;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
  display: ${(props) => (props.$active ? "block" : "none")};
`;

const SettingIcon = styled(FontAwesomeIcon)``;

const Settings = () => {
  const isBlocked = useRecoilValue(isBlockedAtom);
  const profileMatch = useMatch("/settings/profile");
  const accountMatch = useMatch("/settings/account");
  const onLogOut = () => {
    auth.signOut();
    window.location.href = "/";
  };
  usePrompt(
    "아직 저장되지 않았습니다. 정말로 페이지를 떠나시겠습니까?",
    isBlocked
  );
  return (
    <Wrapper>
      <Title>설정</Title>
      <Container>
        <SideBar>
          <SideButton to="/settings/profile">
            <Indicator $active={profileMatch} />
            <SettingIcon icon={faUser} />
            프로필 설정
          </SideButton>
          <SideButton to="/settings/account">
            <Indicator $active={accountMatch} />
            <SettingIcon icon={faGear} />
            계정 설정
          </SideButton>
          <LogOut onClick={onLogOut}>
            <SettingIcon icon={faSignOut} />
            로그아웃
          </LogOut>
        </SideBar>
        <Main>
          <Outlet />
        </Main>
      </Container>
    </Wrapper>
  );
};

export default Settings;
