import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isLoggedInAtom } from "../atom";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

const StartButton = styled(motion.button)`
  padding: 4px 14px;
  border-radius: 40px;
  background-color: #0984e3;
  color: white;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const SignInButton = styled(motion.button)`
  background: none;
  border: none;
  font-size: 15px;
  cursor: pointer;
`;

const Profile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #74b9ff;
  cursor: pointer;
  position: relative;
`;

const Menu = styled.div`
  width: 100px;
  background-color: #fafafa;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  position: absolute;
  left: -28px;
  top: 50px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  cursor: default;
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  gap: 6px;
  width: 100%;
  height: 100%;
`;

const MenuItem = styled.li`
  font-size: 15px;
  width: 80%;
  text-align: center;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  cursor: pointer;
  &:last-child {
    color: red;
    font-weight: bold;
    border: none;
  }
`;

const signInVariants = {
  hover: {
    color: "rgba(0,0,0,0.58)",
    transition: {
      duration: 0.1,
    },
  },
};

const startVariants = {
  hover: {
    backgroundColor: "#0097e6",
    transition: {
      duration: 0.05,
    },
  },
};

const NavAccount = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onClickProfile = (event) => {
    if (event.target.closest(".Menu")) return;
    setIsMenuOpen(!isMenuOpen);
  };
  const onClickOutsideMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isProfile = event.target.closest(".Profile");
      const isMenu = event.target.closest(".Menu");
      const isMenuList = event.target.closest(".MenuList");
      const isMenuItem = event.target.closest(".MenuItem");

      if (isMenuOpen && !isProfile && !isMenu && !isMenuList && !isMenuItem) {
        onClickOutsideMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);
  return (
    <Wrapper>
      {!isLoggedIn ? (
        <>
          <SignInButton variants={signInVariants} whileHover="hover">
            로그인
          </SignInButton>
          <StartButton variants={startVariants} whileHover="hover">
            시작하기
          </StartButton>
        </>
      ) : (
        <>
          <Profile className="Profile" onClick={onClickProfile}>
            {isMenuOpen && (
              <Menu className="Menu">
                <MenuList className="MenuList">
                  <MenuItem className="MenuItem">프로필</MenuItem>
                  <MenuItem className="MenuItem">설정</MenuItem>
                  <MenuItem className="MenuItem">로그아웃</MenuItem>
                </MenuList>
              </Menu>
            )}
          </Profile>
        </>
      )}
    </Wrapper>
  );
};

export default NavAccount;
