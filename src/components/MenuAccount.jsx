import { useRecoilValue } from "recoil";
import { reRenderAtom } from "../atom";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const User = styled.div`
  padding: 8px 10px;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  transition: background-color 0.1s ease-in-out;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const Username = styled.h2`
  font-size: 18px;
  transform: translateY(-2px);
`;

const Avatar = styled.img`
  object-fit: cover;
  object-position: center;
  width: 40px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const Button = styled(Link)`
  padding: 10px 0;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
  border: none;
  color: white;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.1s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;

const SignUp = styled(Button)`
  background-color: #0984e3;
`;

const SignIn = styled(Button)`
  background-color: rgba(0, 0, 0, 0.27);
`;

const UserMenu = styled(motion.ul)`
  padding: 15px 8px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  gap: 3px;
  margin-bottom: 10px;
`;

const UserMenuItem = styled(Link)`
  color: black;
  text-decoration: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;
  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
`;

const SignOut = styled.button`
  color: red;
  border: none;
  padding: 8px;
  border-radius: 5px;
  text-align: start;
  font-size: 14px;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.1s ease-in-out;
  &:hover {
    background-color: rgba(255, 0, 0, 0.06);
  }
`;

const menuVariants = {
  initial: {
    opacity: 0,
    y: 8,
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
    y: 8,
    transition: {
      duration: 0.1,
    },
  },
};

const MenuAccount = ({ menuToggle }) => {
  const user = auth.currentUser;
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const reRender = useRecoilValue(reRenderAtom);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isUser = event.target.closest(".user");
      const isUserMenu = event.target.closest(".userMenu");

      if (userMenuOpen && !isUser && !isUserMenu) {
        onClickOutsideMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);
  const userMenuToggle = () => {
    setUserMenuOpen((prev) => !prev);
  };
  const onClickOutsideMenu = () => {
    setUserMenuOpen(false);
  };
  const onLogOut = async () => {
    await auth.signOut();
    menuToggle();
    navigate(0);
  };
  return (
    <Wrapper key={reRender}>
      {user ? (
        <>
          <AnimatePresence>
            {userMenuOpen && (
              <UserMenu
                variants={menuVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="userMenu"
              >
                <UserMenuItem to="/profile" onClick={menuToggle}>
                  프로필
                </UserMenuItem>
                <UserMenuItem to="/settings/profile" onClick={menuToggle}>
                  설정
                </UserMenuItem>
                <SignOut onClick={onLogOut}>로그아웃</SignOut>
              </UserMenu>
            )}
          </AnimatePresence>
          <User onClick={userMenuToggle} className="user">
            <Avatar src={user.photoURL} />
            <Username>{user.displayName}</Username>
          </User>
        </>
      ) : (
        <>
          <SignUp to="/signup" onClick={menuToggle}>
            시작하기
          </SignUp>
          <SignIn to="/signin" onClick={menuToggle}>
            로그인
          </SignIn>
        </>
      )}
    </Wrapper>
  );
};

export default MenuAccount;
