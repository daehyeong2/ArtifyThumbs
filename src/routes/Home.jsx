import { motion } from "framer-motion";
import styled from "styled-components";
import Seo from "../components/Seo";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const ContainerTitle = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  span {
    background: linear-gradient(to right top, #55efc4, #00b894);
    color: transparent;
    background-clip: text;
  }
`;

const ContainerSubtitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 900;
  line-height: 25px;
  color: rgba(0, 0, 0, 0.6);
`;

const About = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 250px;
  justify-content: center;
  align-items: center;
  gap: 60px;
  margin-bottom: 150px;
`;

const AboutInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 500px;
`;

const AboutImage = styled.img`
  width: 400px;
  height: 200px;
  object-fit: contain;
`;

const AboutTitle = styled.h2`
  font-size: 2rem;
`;

const AboutContent = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
`;

const ContainerStartButton = styled(motion.button)`
  padding: 8px 18px;
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
`;

const startVariants = {
  initial: {
    backgroundColor: "#0984e3",
    transition: {
      duration: 0.05,
    },
  },
  hover: {
    backgroundColor: "#0097e6",
    transition: {
      duration: 0.05,
    },
  },
};

const AboutVariants = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.1,
    },
  },
};

const Home = () => {
  const user = useRecoilValue(userAtom);
  return (
    <>
      <Seo title="홈" />
      <Wrapper>
        <Container id="main">
          <ContainerTitle>
            쉽고, <span>간편한</span>
          </ContainerTitle>
          <ContainerSubtitle>
            ArtifyThumbs에서 쉽고 빠르게 좋은 그림을 받아보세요.
          </ContainerSubtitle>
          <Link to={user ? "/apply" : "/signup"}>
            <ContainerStartButton
              transition={{ duration: 0.1 }}
              variants={startVariants}
              initial="initial"
              whileHover="hover"
            >
              시작하기
            </ContainerStartButton>
          </Link>
        </Container>
        <About
          variants={AboutVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "all" }}
        >
          <AboutImage src="/img/AboutImage/various.jpeg" alt="various" />
          <AboutInfo>
            <AboutTitle>다양한 그림 종류</AboutTitle>
            <AboutContent>
              ArtifyThumbs에서는 게임 일러스트, 캐릭터 일러스트,
              <br />
              유튜브 썸네일, 프로필 사진, 프로필 배너 등
              <br />
              많은 그림들을 받을 수 있습니다.
            </AboutContent>
          </AboutInfo>
        </About>
        <About
          variants={AboutVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "all" }}
        >
          <AboutInfo>
            <AboutTitle>간편한 신청</AboutTitle>
            <AboutContent>
              쉽게 가입하고 원하는 그림을 신청하세요.
              <br />
              좋은 퀄리티로 빠르게 받아 볼 수 있습니다.
            </AboutContent>
          </AboutInfo>
          <AboutImage src="/img/AboutImage/convenient.jpeg" alt="convenient" />
        </About>
      </Wrapper>
    </>
  );
};

export default Home;
