import styled from "styled-components";
import NavAccount from "./NavAccount";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useMatch } from "react-router-dom";
import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atom";
import CustomLink from "./CustomLink";
import MotionLink from "./MotionLink";

const Logo = styled.div`
  background-image: url("/img/Logo.jpeg");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 250px;
  height: 50px;
  align-self: center;
  cursor: pointer;
`;

const Nav = styled(motion.nav)`
  height: 85px;
  padding: 20px 75px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 0.5fr minmax(450px, 1fr) 0.5fr;
  width: 100vw;
  position: fixed;
  width: 100vw;
  position: fixed;
  z-index: 2;
  border: ${(props) =>
    props.$isBorderExist ? "1px solid rgba(0, 0, 0, 0.1)" : "none"};
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3vw;
`;

const NavItem = styled(motion.li)`
  cursor: pointer;
  position: relative;
  a {
    text-decoration: none;
    font-size: 20px;
    font-weight: 600;
  }
`;

const UnderLine = styled(motion.div)`
  position: absolute;
  background-color: #74b9ff;
  height: 2px;
  bottom: -7px;
`;

const NavItemVariants = {
  initial: {
    color: "rgba(0,0,0,0.25)",
    transition: {
      duration: 0.1,
    },
  },
  animate: {
    color: "rgb(0,0,0)",
    transition: {
      duration: 0.05,
    },
  },
  hover: {
    color: "rgb(0,0,0)",
    transition: {
      duration: 0.05,
    },
  },
};

const UnderLineVariants = {
  initial: {
    width: "0%",
    height: "2px",
  },
  hover: {
    width: "100%",
    transition: {
      duration: 0.25,
    },
  },
};

const NavVariants = {
  initial: {
    border: "1px solid rgba(0, 0, 0, 0)",
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
  scrolled: {
    border: "1px solid rgba(0, 0, 0, 0.15)",
    backgroundColor: "rgba(255,255,255,1)",
  },
};

const BorderNavVariants = {
  initial: {
    border: "1px solid rgba(0, 0, 0, 0.15)",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
  },
  scrolled: {
    backgroundColor: "rgba(255,255,255,1)",
  },
};

const NavBar = () => {
  const userData = useRecoilValue(userAtom);
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const homeMatch = useMatch("/");
  const aboutMatch = useMatch("/about");
  const applyListMatch = useMatch("/apply-list");
  const DetailApplyMatch = useMatch("/apply-list/:applyId");
  const applyMatch = useMatch("/apply");
  const applyProcedureMatch = useMatch("/apply/procedure");
  const inquiryMatch = useMatch("/inquiry");
  const orderManagementMatch = useMatch("/order-management");
  const orderManagementDetailMatch = useMatch("/order-management/:orderId");
  const inquiryManagementMatch = useMatch("/inquiry-management");
  const inquiryManagementDetailMatch = useMatch(
    "/inquiry-management/:inquiryId"
  );
  const signinMatch = useMatch("/signin");
  const signupMatch = useMatch("/signup");
  const { scrollY } = useScroll();
  const handleScroll = useCallback((latest) => {
    setCurrentScrollY(latest);
  }, []);
  useMotionValueEvent(scrollY, "change", handleScroll);
  const isBorderExist = signinMatch || signupMatch;
  return (
    <Nav
      $isBorderExist={isBorderExist}
      variants={isBorderExist ? BorderNavVariants : NavVariants}
      initial="initial"
      animate={currentScrollY > 80 ? "scrolled" : "initial"}
      transition={{ duration: 0.2 }}
    >
      <CustomLink to="/">
        <Logo alt="logo" />
      </CustomLink>
      <NavList>
        <NavItem
          initial="initial"
          animate={homeMatch ? "animate" : "initial"}
          whileHover="hover"
        >
          <div>
            <MotionLink to="/" variants={NavItemVariants}>
              홈
            </MotionLink>
          </div>
          <UnderLine variants={UnderLineVariants} />
        </NavItem>
        <NavItem
          initial="initial"
          animate={aboutMatch ? "animate" : "initial"}
          whileHover="hover"
        >
          <div>
            <MotionLink to="/about" variants={NavItemVariants}>
              소개
            </MotionLink>
          </div>
          <UnderLine variants={UnderLineVariants} />
        </NavItem>
        <NavItem
          initial="initial"
          animate={inquiryMatch ? "animate" : "initial"}
          whileHover="hover"
        >
          <div>
            <MotionLink to="/inquiry" variants={NavItemVariants}>
              문의하기
            </MotionLink>
          </div>
          <UnderLine variants={UnderLineVariants} />
        </NavItem>
        {userData && (
          <>
            <NavItem
              initial="initial"
              animate={
                applyListMatch || DetailApplyMatch ? "animate" : "initial"
              }
              whileHover="hover"
            >
              <div>
                <MotionLink to="/apply-list" variants={NavItemVariants}>
                  신청 목록
                </MotionLink>
              </div>
              <UnderLine variants={UnderLineVariants} />
            </NavItem>
            <NavItem
              initial="initial"
              animate={
                applyMatch || applyProcedureMatch ? "animate" : "initial"
              }
              whileHover="hover"
            >
              <div>
                <MotionLink to="/apply" variants={NavItemVariants}>
                  신청하기
                </MotionLink>
              </div>
              <UnderLine variants={UnderLineVariants} />
            </NavItem>
            {userData?.isAdmin && (
              <>
                <NavItem
                  initial="initial"
                  animate={
                    orderManagementMatch || orderManagementDetailMatch
                      ? "animate"
                      : "initial"
                  }
                  whileHover="hover"
                >
                  <div>
                    <MotionLink
                      to="/order-management"
                      variants={NavItemVariants}
                    >
                      주문 관리
                    </MotionLink>
                  </div>
                  <UnderLine variants={UnderLineVariants} />
                </NavItem>
                <NavItem
                  initial="initial"
                  animate={
                    inquiryManagementMatch || inquiryManagementDetailMatch
                      ? "animate"
                      : "initial"
                  }
                  whileHover="hover"
                >
                  <div>
                    <MotionLink
                      to="/inquiry-management"
                      variants={NavItemVariants}
                    >
                      문의 목록
                    </MotionLink>
                  </div>
                  <UnderLine variants={UnderLineVariants} />
                </NavItem>
              </>
            )}
          </>
        )}
      </NavList>
      <NavAccount />
    </Nav>
  );
};

export default NavBar;
