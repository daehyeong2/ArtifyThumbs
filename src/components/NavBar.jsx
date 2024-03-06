import styled from "styled-components";
import NavAccount from "./NavAccount";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "../atom";
import { Link, useMatch } from "react-router-dom";
import { useCallback, useState } from "react";

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
  grid-template-columns: 1fr minmax(450px, 1fr) 1fr;
  width: 100vw;
  position: fixed;
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
    color: "rgba(0,0,0,0.2)",
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
    backgroundColor: "rgba(255,255,255,0)",
  },
  scrolled: {
    border: "1px solid rgba(0, 0, 0, 0.15)",
    backgroundColor: "rgba(255,255,255,1)",
  },
};

const MotionLink = motion(Link);

const NavBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const homeMatch = useMatch("/");
  const aboutMatch = useMatch("/about");
  const orderListMatch = useMatch("/order-list");
  const orderMatch = useMatch("/order");
  const { scrollY } = useScroll();
  const handleScroll = useCallback((latest) => {
    setCurrentScrollY(latest);
  }, []);
  useMotionValueEvent(scrollY, "change", handleScroll);
  return (
    <Nav
      variants={NavVariants}
      initial="initial"
      animate={currentScrollY > 80 ? "scrolled" : "initial"}
      transition={{ duration: 0.2 }}
    >
      <Link to="/">
        <Logo />
      </Link>
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
        {isLoggedIn && (
          <>
            <NavItem
              initial="initial"
              animate={orderListMatch ? "animate" : "initial"}
              whileHover="hover"
            >
              <div>
                <MotionLink to="/order-list" variants={NavItemVariants}>
                  신청 목록
                </MotionLink>
              </div>
              <UnderLine variants={UnderLineVariants} />
            </NavItem>
            <NavItem
              initial="initial"
              animate={orderMatch ? "animate" : "initial"}
              whileHover="hover"
            >
              <div>
                <MotionLink to="/order" variants={NavItemVariants}>
                  신청하기
                </MotionLink>
              </div>
              <UnderLine variants={UnderLineVariants} />
            </NavItem>
          </>
        )}
      </NavList>
      <NavAccount />
    </Nav>
  );
};

export default NavBar;
