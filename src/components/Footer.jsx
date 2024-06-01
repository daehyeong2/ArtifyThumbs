import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { widthAtom } from "../atom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  margin-top: ${(props) => (props.$isMobile ? 0 : "80px")};
`;

const Footer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: ${(props) =>
    props.$isMobile ? "1px solid rgba(0,0,0,0.2)" : "none"};
  padding: 30px ${(props) => (props.$isMobile ? "10px" : 0)};
`;

const FooterItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 20px;
  grid-column: ${(props) => (props.$isBig ? "span 2" : "")};
  place-self: ${(props) => (props.$isBig ? "center" : "")};
  max-width: 95vw;
  p {
    font-size: 0.9rem;
    line-height: 1.3;
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
  width: fit-content;
`;

const FooterItems = styled.ul`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$isMobile ? "repeat(2, 1fr)" : "2.4fr repeat(2, 1fr) 1.5fr"};
  grid-template-rows: ${(props) =>
    props.$isMobile ? "repeat(2, 1fr)" : "1fr"};
  gap: ${(props) => (props.$isMobile ? "30px" : "65px")};
`;

const FooterLogo = styled(motion.img)`
  aspect-ratio: 1 / 1;
  height: 80px;
`;

const FooterSymbolText = styled.p`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 600;
  width: fit-content;
`;

const FooterSymbol = styled.div`
  display: ${(props) => (props.$isMobile ? "none" : "flex")};
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const FooterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  width: 100%;
  word-break: break-all;
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
  const width = useRecoilValue(widthAtom);
  const isMobile = width < 960;
  return (
    <Wrapper $isMobile={isMobile}>
      <Footer $isMobile={isMobile}>
        <FooterItems $isMobile={isMobile}>
          <FooterItem $isBig={isMobile && true}>
            <FooterItemTitle>ArtifyThumbs</FooterItemTitle>
            <p>
              ArtifyThumbs는 필요한 사진을 요청하여 받을 수 있는 서비스입니다.
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
              <li>
                <MotionLink
                  variants={linkVariants}
                  whileHover="hover"
                  initial="initial"
                  to="/inquiry"
                >
                  문의하기
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
                  to="/policies/privacy-policy"
                >
                  개인정보 처리 방침
                </MotionLink>
              </li>
              <li>
                <MotionLink
                  variants={linkVariants}
                  whileHover="hover"
                  initial="initial"
                  to="/policies/terms"
                >
                  이용약관
                </MotionLink>
              </li>
              <li>
                <MotionLink
                  variants={linkVariants}
                  whileHover="hover"
                  initial="initial"
                  to="/policies/refund-policy"
                >
                  취소 및 환불정책
                </MotionLink>
              </li>
            </ul>
          </FooterItem>
          <FooterSymbol $isMobile={isMobile}>
            <FooterLogo
              variants={footerLogoVariants}
              initial="initial"
              whileHover="hover"
              src="/img/smallLogo.jpeg"
              alt="logo"
            />
            <FooterSymbolText>멋진 그림을 받아보세요!</FooterSymbolText>
          </FooterSymbol>
        </FooterItems>
        <FooterInfo>
          <p>© 2024 ArtifyThumbs. All rights reserved.</p>
        </FooterInfo>
      </Footer>
    </Wrapper>
  );
};

export default MainFooter;
