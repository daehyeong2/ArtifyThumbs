import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  margin-top: 100px;
`;

const FooterItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 20px;
  p {
    font-size: 0.9rem;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    a {
      text-decoration: none;
    }
  }
`;

const FooterItemTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.4);
`;

const FooterItems = styled.ul`
  display: flex;
  gap: 65px;
`;

const FooterLogo = styled(motion.img)`
  width: 80px;
  height: 80px;
`;

const FooterSymbolText = styled.p`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 600;
`;

const FooterSymbol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const FooterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  width: 48%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  p {
    color: rgba(0, 0, 0, 0.4);
    font-weight: bold;
  }
`;

const linkVariants = {
  initial: {
    color: "rgba(0, 0, 0, 0.65)",
    transition: {
      duration: 0.1,
    },
  },
  hover: {
    color: "rgba(0,0,0,1)",
    transition: {
      duration: 0.1,
    },
  },
};

const footerLogoVariants = {
  initial: {
    transform: "translateY(0px)",
    transition: {
      duration: 0.1,
    },
  },
  hover: {
    transform: "translateY(-3px)",
    transition: {
      duration: 0.1,
    },
  },
};

const MotionLink = motion(Link);

const MainFooter = () => {
  return (
    <Footer>
      <FooterItems>
        <FooterItem>
          <FooterItemTitle>ArtifyThumbs</FooterItemTitle>
          <p>
            ArtifyThumbs는 필요한 사진을 요청하여
            <br />
            받을 수 있는 서비스입니다.
          </p>
        </FooterItem>
        <FooterItem>
          <FooterItemTitle>Navigation</FooterItemTitle>
          <ul>
            <li>
              <MotionLink
                variants={linkVariants}
                whileHover="hover"
                initial="initial"
                to="/"
              >
                홈
              </MotionLink>
            </li>
            <li>
              <MotionLink
                variants={linkVariants}
                whileHover="hover"
                initial="initial"
                to="/about"
              >
                소개
              </MotionLink>
            </li>
          </ul>
        </FooterItem>
        <FooterItem>
          <FooterItemTitle>LEGAL</FooterItemTitle>
          <ul>
            <li>
              <MotionLink
                variants={linkVariants}
                whileHover="hover"
                initial="initial"
                to="/privacy"
              >
                개인정보 처리방침
              </MotionLink>
            </li>
            <li>
              <MotionLink
                variants={linkVariants}
                whileHover="hover"
                initial="initial"
                to="/terms"
              >
                이용약관
              </MotionLink>
            </li>
          </ul>
        </FooterItem>
        <FooterSymbol>
          <FooterLogo
            variants={footerLogoVariants}
            initial="initial"
            whileHover="hover"
            src="/img/smallLogo.jpeg"
          />
          <FooterSymbolText>멋진 그림을 받아보세요!</FooterSymbolText>
        </FooterSymbol>
      </FooterItems>
      <FooterInfo>
        <p>© 2024 ArtifyThumbs. All rights reserved.</p>
      </FooterInfo>
    </Footer>
  );
};

export default MainFooter;
