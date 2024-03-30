import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { userAtom } from "../atom";

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
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Menu = styled(motion.div)`
  background-color: #fafafa;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  position: absolute;
  right: -28px;
  top: 50px;
  padding: 10px;
  gap: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  cursor: default;
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  width: 100px;
  height: 100%;
`;

const MenuItem = styled(Link)`
  font-size: 15px;
  text-align: center;
  width: 100%;
  cursor: pointer;
  color: black;
  text-decoration: none;
  padding: 5px;
  box-sizing: border-box;
  transition: background-color 0.1s ease-in-out;
  border-radius: 5px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
  &:last-child {
    color: red;
    font-weight: bold;
    border: none;
  }
`;

const MenuProfile = styled.section`
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const AvatarImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: center;
  border-radius: 50%;
`;

const Username = styled.h2`
  font-size: 20px;
  font-weight: bold;
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

const menuVariants = {
  initial: {
    opacity: 0,
    y: -8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.1,
    },
  },
};

const NavAccount = () => {
  const user = useRecoilValue(userAtom);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
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
      {!user ? (
        <>
          <Link to="/signin">
            <SignInButton
              transition={{ duration: 0.1 }}
              variants={signInVariants}
              whileHover="hover"
            >
              로그인
            </SignInButton>
          </Link>
          <Link to="/signup">
            <StartButton
              transition={{ duration: 0.1 }}
              variants={startVariants}
              whileHover="hover"
            >
              시작하기
            </StartButton>
          </Link>
        </>
      ) : (
        <>
          <Profile className="Profile" onClick={onClickProfile}>
            <AnimatePresence>
              {isMenuOpen && (
                <Menu
                  variants={menuVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="Menu"
                >
                  <MenuProfile>
                    <AvatarImage src={user.avatar} />
                    <Username>{user.username}님</Username>
                  </MenuProfile>
                  <MenuList className="MenuList">
                    <MenuItem className="MenuItem">프로필</MenuItem>
                    <MenuItem className="MenuItem">설정</MenuItem>
                    <MenuItem
                      to="http://localhost:4000/users/logout"
                      className="MenuItem"
                    >
                      로그아웃
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </AnimatePresence>
          </Profile>
        </>
      )}
    </Wrapper>
  );
};

export default NavAccount;
