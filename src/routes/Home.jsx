import { motion } from "framer-motion";
import styled from "styled-components";
import Seo from "../components/Seo";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atom";
import { useEffect, useState, useCallback } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  background-image: url("/img/background/home.jpeg");
  background-position: right 8% bottom 13%;
  background-size: 23.5vw;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const ContainerTitle = styled.h1`
  display: flex;
  align-items: center;
  font-size: 4rem;
  font-weight: 900;
  span {
    margin-left: 15px;
    background: linear-gradient(to right top, #55efc4, #6c5ce7);
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
  height: 100%;
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

const Pipe = styled(motion.div)`
  margin-left: 5px;
  margin-top: 6px;
  width: 8px;
  height: 90%;
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

const PipeVariants = {
  initial: {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  animate: {
    backgroundColor: "rgba(0,0,0,0.0)",
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 0.5,
    },
  },
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const labelList = ["간편한", "다양한", "빠른", "아름다운", "친절한"];

const Home = () => {
  const userValue = useRecoilValue(userAtom);
  const [user, setUser] = useState(null);
  const [label, setLabel] = useState(null);
  const [isFirst, setIsFirst] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const createComebackInterval = useCallback(
    (data, initialTime) => {
      const text = data.text;
      const r = data.r;
      let index = data.index;
      const comebackInterval = setInterval(() => {
        setLabel(text.slice(0, index));
        index--;
        clearInterval(comebackInterval);
        if (Math.abs(index) - 1 === text.length) {
          if (isFirst) {
            setIsFirst(false);
          }
          r();
        } else {
          const x = Math.abs(index);
          const result = 200 - 18 * (x ** 2 / 2 + -0.5 * x + 2);
          createComebackInterval({ text, r, index }, result);
        }
      }, initialTime);
    },
    [isFirst]
  );
  const createLetterInterval = useCallback(
    (data, initialTime) => {
      const text = data.text;
      const r = data.r;
      let index = data.index;
      sleep(initialTime).then(() => {
        setLabel((prev) => (prev += text[index]));
        sleep(30).then(() => {
          index++;
          if (index === text.length) {
            index = -1;
            sleep(1000).then(() => {
              const x = Math.abs(index);
              createComebackInterval(
                { index, r, text },
                200 - 12 * (x ** 2 / 3 + -0.3 * x + 2)
              );
            });
          } else {
            const x = Math.abs(index);
            const result = 40 * (x ** 2 / 3 + -0.3 * x + 2);
            createLetterInterval({ text, r, index }, result);
          }
        });
      });
    },
    [createComebackInterval]
  );
  const addLetter = useCallback(
    (text) => {
      return new Promise((r) => {
        let index = 0;
        if (isFirst) {
          const x = 1;
          createComebackInterval(
            { text, r, index: -1 },
            200 - 12 * (x ** 2 / 3 + -0.3 * x + 2)
          );
        } else {
          createLetterInterval({ text, r, index }, 60);
        }
      });
    },
    [createLetterInterval, createComebackInterval, isFirst]
  );
  useEffect(() => {
    sleep(1000).then(() => {
      const text = labelList[currentIndex];
      addLetter(text).then(() => {
        setCurrentIndex((prev) => (prev + 1) % labelList.length);
      });
    });
  }, [currentIndex, addLetter]);
  useEffect(() => {
    if (userValue) {
      setUser(userValue);
    }
  }, [userValue]);
  useEffect(() => {
    setLabel(labelList[0]);
  }, []);
  return (
    <>
      <Seo
        title="홈"
        description="ArtifyThumbs에서 원하는 사진을 받아보세요!"
      />
      <Wrapper>
        <Container id="main">
          <ContainerTitle>
            쉽고, <span>{label}</span>
            <Pipe variants={PipeVariants} initial="initial" animate="animate" />
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
        <About
          variants={AboutVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "all" }}
        >
          <AboutImage src="/img/AboutImage/chats.jpeg" alt="chats" />
          <AboutInfo>
            <AboutTitle>실시간 채팅</AboutTitle>
            <AboutContent>
              매우 빠른 무제한 실시간 채팅을 이용해 보세요.
              <br />
              간편하게 당신이 원하는 그림에 대해 설명해 보세요.
            </AboutContent>
          </AboutInfo>
        </About>
      </Wrapper>
    </>
  );
};

export default Home;
