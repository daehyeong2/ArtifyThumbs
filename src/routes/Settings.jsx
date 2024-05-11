import { Outlet, useMatch } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  padding-top: 140px;
`;

const Container = styled.div`
  width: 1000px;
  height: 600px;
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 10px;
`;

const SideBar = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
`;

const SideButton = styled(Link)`
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

const Main = styled.section``;

const LogOut = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: red;
  padding: 10px 15px;
  border-radius: 7px;
  position: absolute;
  bottom: 0;
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
  const profileMatch = useMatch("/settings/profile");
  const accountMatch = useMatch("/settings/account");
  const onLogOut = () => {
    auth.signOut();
    window.location.href = "/";
  };
  return (
    <Wrapper>
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
