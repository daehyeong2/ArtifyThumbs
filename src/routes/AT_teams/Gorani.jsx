import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 0 200px;
  padding-top: 140px;
`;

const Back = styled(Link)`
  text-decoration: none;
  background-color: #0984e3;
  color: white;
  font-size: 15px;
  border-radius: 5px;
  cursor: pointer;
  padding: 6px 10px;
  gap: 5px;
  svg {
    margin-right: 3px;
  }
`;

const Header = styled.header`
  margin-top: 30px;
  display: flex;
  gap: 15px;
  align-items: center;
`;

const Avatar = styled.div`
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

const Name = styled.h1`
  font-size: 50px;
  font-weight: bold;
`;

const Introduction = styled.h2`
  margin-top: 30px;
  font-size: 20px;
  span {
    font-weight: bold;
  }
`;

const SiteTech = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const TechTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 5px;
`;

const TechGroup = styled.ul`
  display: flex;
  padding-left: 5px;
  gap: 15px;
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
  font-size: 33px;
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
  return (
    <Wrapper>
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
      <SiteTitle>이 웹사이트에 사용된 기술</SiteTitle>
      <SiteTech>
        <TechTitle>프론트엔드</TechTitle>
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
        <TechTitle>백엔드</TechTitle>
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
        <TechTitle>데이터베이스/스토리지</TechTitle>
        <TechGroup>
          <Tech initial="initial" whileHover="hover">
            <TechImage $src="/img/tech/firebase.jpeg" />
            <TechTooltip variants={tooltipVariants}>
              파이어베이스 (백엔드 서비스)
            </TechTooltip>
          </Tech>
        </TechGroup>
      </SiteTech>
    </Wrapper>
  );
};

export default Gorani;
