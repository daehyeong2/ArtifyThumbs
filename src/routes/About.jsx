import styled from "styled-components";
import Seo from "../components/Seo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0 25vw;
  padding-top: 140px;
  gap: 80px;
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContainerTitle = styled.h1`
  width: 100%;
  font-size: 4rem;
  font-weight: 900;
  display: flex;
  justify-content: center;
  gap: 10px;
  span {
    background: linear-gradient(to right top, #6c5ce7, #74b9ff);
    padding-bottom: 15px;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline;
    @supports not (
      (-webkit-background-clip: text) and (-webkit-text-fill-color: transparent)
    ) {
      h1 {
        background: none;
        color: #0984e3; /* 글자 색상을 원래 단색으로 설정 */
      }
    }
  }
`;

const ContainerSubtitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 900;
  line-height: 25px;
`;

const Introduction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InfoTitle = styled.h1`
  font-weight: bold;
  font-size: 2rem;
`;

const InfoContent = styled.p`
  font-weight: 700px;
  font-size: 1.1rem;
  line-height: 1.2;
`;

const WorkersTitle = styled.h1`
  margin-top: 50px;
  font-size: 30px;
  font-weight: bold;
`;

const Workers = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  gap: 50px;
`;

const Worker = styled(motion(Link))`
  display: flex;
  flex-direction: column;
  gap: 30px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: black;
  text-decoration: none;
  border-radius: 10px;
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  grid-column: ${(props) => props.$isBig && "span 2"};
  width: ${(props) => (props.$isBig ? "390px" : "390px")};
  place-self: center;
  position: relative;
  background: none;
  overflow: hidden;
  z-index: 99;
  cursor: pointer;
`;

const WorkerList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 800px;
`;

const WorkerProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const WorkerAvatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-position: center;
  object-fit: cover;
`;

const WorkerName = styled.span`
  font-size: 20px;
  font-weight: bold;
  span {
    font-size: 13px;
    color: transparent;
    ${(props) =>
      props.$type === "purple"
        ? "background: linear-gradient(to right top, #0984e3, #e84393);"
        : props.$type === "yellow"
        ? "background: linear-gradient(to right top, #fdcb6e, #e84393);"
        : "background: linear-gradient(to right top, #0984e3, #00cec9);"}
    background-clip: text;
  }
`;

const WorkerBackground = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  filter: blur(80px);
  z-index: -1;
`;

const WorkerIntroduction = styled.p`
  font-size: 15px;
  line-height: 1.5;
  span {
    font-size: 16px;
    font-weight: bold;
  }
`;

function getWorkerVariants(type) {
  let linearGradient = null;
  if (type === "purple") {
    linearGradient = "linear-gradient(to right top, #ffeaa7, #e84393)";
  } else if (type === "yellow") {
    linearGradient = "linear-gradient(to right top, #ffeaa7, #00cec9";
  } else {
    linearGradient = "linear-gradient(to right top, #74b9ff, #81ecec)";
  }
  return {
    initial: {
      background: "linear-gradient(to right top, #ced6e0, #f1f2f6)",
    },
    hover: {
      background: linearGradient,
    },
  };
}

const About = () => {
  return (
    <>
      <Seo title="소개" description="ArtifyThumbs에 대해 알아보세요!" />
      <Container>
        <TopBar>
          <ContainerTitle>
            <span>ArtifyThumbs</span>에 대해
          </ContainerTitle>
          <ContainerSubtitle>
            ArtifyThumbs는 이미지를 신청하고 좋은 퀄리티의 이미지를 빠르게 받을
            수 있는 서비스입니다.
          </ContainerSubtitle>
        </TopBar>
        <Introduction>
          <Info>
            <InfoTitle>무엇을 할 수 있나요?</InfoTitle>
            <InfoContent>
              ArtifyThumbs에서는 저렴한 가격에 원하는 사진을 신청하고 금방
              받아볼 수 있어요.
            </InfoContent>
          </Info>
          <Info>
            <InfoTitle>
              AritfyThumbs를 이용해야 하는 이유는 무엇인가요?
            </InfoTitle>
            <InfoContent>
              저희는 가격이 저렴하고 신청도 간편해요! 게다가 좋은 퀄리티의
              사진을 빠르게 받아볼 수 있어요.
            </InfoContent>
          </Info>
          <Info>
            <InfoTitle>어떻게 이용하나요?</InfoTitle>
            <InfoContent>
              ArtifyThumbs에 가입하고 원하는 사진을 신청하면 됩니다. 자세한
              내용은 신청 페이지에 있습니다.
            </InfoContent>
          </Info>
        </Introduction>
        <Workers>
          <WorkersTitle>ArtifyThumbs 팀</WorkersTitle>
          <WorkerList>
            <Worker to="/workers/dawn" initial="initial" whileHover="hover">
              <WorkerBackground
                variants={getWorkerVariants("purple")}
                transition={{ duration: 0.3 }}
              />
              <WorkerProfile>
                <WorkerAvatar src="/img/workers/dawn.jpeg" alt="workerAvatar" />
                <WorkerName $type="purple">
                  새벽 <span>그림 담당</span>
                </WorkerName>
              </WorkerProfile>
              <WorkerIntroduction>
                <span>소개글:</span> 어쩌다가 여기에 끌려왔을까요? 살려주세요
                ㅠㅠ 하지만 퀄리티는 보장 해드립니다.
                <br />
                믿고 맡겨주세요.
              </WorkerIntroduction>
            </Worker>
            <Worker to="/workers/baram" initial="initial" whileHover="hover">
              <WorkerBackground
                variants={getWorkerVariants("yellow")}
                transition={{ duration: 0.3 }}
              />
              <WorkerProfile>
                <WorkerAvatar src="/img/workers/wind.jpeg" alt="workerAvatar" />
                <WorkerName $type="yellow">
                  바람 <span>썸네일 담당</span>
                </WorkerName>
              </WorkerProfile>
              <WorkerIntroduction>
                <span>소개글:</span> 하루 24시간중 12시간을 자니까 100년을
                산다면 50년을 자는겁니다.
              </WorkerIntroduction>
            </Worker>
            <Worker
              to="/workers/gorani"
              $isBig={true}
              initial="initial"
              whileHover="hover"
            >
              <WorkerBackground
                variants={getWorkerVariants("blue")}
                transition={{ duration: 0.3 }}
              />
              <WorkerProfile>
                <WorkerAvatar
                  src="/img/workers/gorani.jpeg"
                  alt="workerAvatar"
                />
                <WorkerName>
                  고라니 <span>개발 담당</span>
                </WorkerName>
              </WorkerProfile>
              <WorkerIntroduction>
                <span>소개글:</span> 편하게 신청해 주세요~
              </WorkerIntroduction>
            </Worker>
          </WorkerList>
        </Workers>
      </Container>
    </>
  );
};

export default About;
