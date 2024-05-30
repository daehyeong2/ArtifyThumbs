import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import {
  Avatar,
  Back,
  Container,
  Header,
  Introduction,
  Name,
  Wrapper,
} from "./at_teams";
import { useRecoilValue } from "recoil";
import { isMobileAtom } from "../../atom";

const SiteTech = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  span {
    display: ${(props) => (props.$isMobile ? "none" : "block")};
  }
`;

const TechTitle = styled.h1`
  font-size: ${(props) => (props.$isMobile ? "20px" : "24px")};
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 5px;
`;

const TechGroup = styled.ul`
  display: flex;
  padding-left: 5px;
  box-sizing: border-box;
  gap: 15px;
  flex-wrap: wrap;
`;

const Tech = styled(motion.li)`
  position: relative;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const TechImage = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${(props) => props.$src});
  background-position: center;
  background-size: 40px;
  background-repeat: no-repeat;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
`;

const TechTooltip = styled(motion.span)`
  position: absolute;
  bottom: -37px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 13px;
  padding: 8px 10px;
  border-radius: 5px;
  width: max-content;
  background-color: #969fa5;
`;

const SiteTitle = styled.h1`
  font-size: ${(props) => (props.$isMobile ? "30px" : "33px")};
  font-weight: bold;
  margin-top: 70px;
`;

const tooltipVariants = {
  initial: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
  },
};

const Gorani = () => {
  const isMobile = useRecoilValue(isMobileAtom);
  return (
    <Wrapper $isMobile={isMobile}>
      <Container $isMobile={isMobile}>
        <Back to="/about">
          <FontAwesomeIcon icon={faRotateBack} />
          뒤로가기
        </Back>
        <Header>
          <Avatar $src="/img/workers/gorani.jpeg" />
          <Name>고라니</Name>
        </Header>
        <Introduction>
          <span>소개글:</span> 편하게 신청해 주세요~
        </Introduction>
        <SiteTitle $isMobile={isMobile}>이 웹사이트에 사용된 기술</SiteTitle>
        <SiteTech $isMobile={isMobile}>
          <TechTitle $isMobile={isMobile}>프론트엔드</TechTitle>
          <TechGroup>
            <Tech initial="initial" whileHover="hover">
              <TechImage $src="/img/tech/react.jpeg" />
              <TechTooltip variants={tooltipVariants}>
                리액트 (라이브러리)
              </TechTooltip>
            </Tech>
            <Tech initial="initial" whileHover="hover">
              <TechImage $src="/img/tech/styled-components.jpeg" />
              <TechTooltip variants={tooltipVariants}>
                스타일 컴포넌트 (스타일)
              </TechTooltip>
            </Tech>
            <Tech initial="initial" whileHover="hover">
              <TechImage $src="/img/tech/framer-motion.jpeg" />
              <TechTooltip variants={tooltipVariants}>
                Framer Motion (애니메이션)
              </TechTooltip>
            </Tech>
            <Tech initial="initial" whileHover="hover">
              <TechImage $src="/img/tech/recoil.jpeg" />
              <TechTooltip variants={tooltipVariants}>
                리코일 (state management)
              </TechTooltip>
            </Tech>
            <Tech initial="initial" whileHover="hover">
              <TechImage $src="/img/tech/react-router.jpeg" />
              <TechTooltip variants={tooltipVariants}>
                리액트 라우터 (라우팅)
              </TechTooltip>
            </Tech>
            <Tech initial="initial" whileHover="hover">
              <TechImage $src="/img/tech/react-hook-form.jpeg" />
              <TechTooltip variants={tooltipVariants}>
                리액트 훅 폼 (Form Management)
              </TechTooltip>
            </Tech>
          </TechGroup>
          <TechTitle $isMobile={isMobile}>백엔드</TechTitle>
          <TechGroup>
            <Tech initial="initial" whileHover="hover">
              <TechImage $src="/img/tech/node.js.jpeg" />
              <TechTooltip variants={tooltipVariants}>
                Node.js (자바스크립트 런타임)
              </TechTooltip>
            </Tech>
            <Tech initial="initial" whileHover="hover">
              <TechImage $src="/img/tech/firebase.jpeg" />
              <TechTooltip variants={tooltipVariants}>
                파이어베이스 (백엔드 서비스)
              </TechTooltip>
            </Tech>
            <Tech initial="initial" whileHover="hover">
              <TechImage $src="/img/tech/socket.io.jpeg" />
              <TechTooltip variants={tooltipVariants}>
                Socket.io (실시간 통신)
              </TechTooltip>
            </Tech>
          </TechGroup>
          <TechTitle $isMobile={isMobile}>데이터베이스/스토리지</TechTitle>
          <TechGroup>
            <Tech initial="initial" whileHover="hover">
              <TechImage $src="/img/tech/firebase.jpeg" />
              <TechTooltip variants={tooltipVariants}>
                파이어베이스 (백엔드 서비스)
              </TechTooltip>
            </Tech>
          </TechGroup>
        </SiteTech>
      </Container>
    </Wrapper>
  );
};

export default Gorani;
