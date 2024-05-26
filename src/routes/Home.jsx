import { motion } from "framer-motion";
import styled from "styled-components";
import Seo from "../components/Seo";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isMobileAtom, userAtom } from "../atom";
import { useEffect, useState, useCallback } from "react";
import AboutMessage from "../components/AboutMessage";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  background-image: ${(props) =>
    props.$isMobile ? "" : "url(/img/background/home.jpeg)"};
  background-position: right 8% bottom 13%;
  background-size: 400px;
  background-repeat: no-repeat;
  height: 100vh;
  margin-bottom: 100px;
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
  width: max-content;
  font-size: ${(props) => (props.$isMobile ? "3.5rem" : "4rem")};
  font-weight: 900;
  span {
    margin-left: 15px;
    background: linear-gradient(to right top, #55efc4, #6c5ce7);
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
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
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
  const userData = useRecoilValue(userAtom);
  const isMobile = useRecoilValue(isMobileAtom);
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
    if (userData) {
      setUser(userData);
    }
  }, [userData]);
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
        <Container $isMobile={isMobile} id="main">
          <ContainerTitle $isMobile={isMobile}>
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
        <AboutMessage
          title="다양한 그림 종류"
          messageFirst={false}
          message="ArtifyThumbs에서는 게임 일러스트, 캐릭터 일러스트, 유튜브 썸네일, 프로필 사진, 프로필 배너 등 많은 그림들을 받을 수 있습니다."
          image="/img/AboutImage/various.jpeg"
          imageAlt="various"
        />

        <AboutMessage
          title="간편한 신청"
          messageFirst={true}
          message="쉽게 가입하고 원하는 그림을 신청하세요. 좋은 퀄리티로 빠르게 받아 볼 수 있습니다."
          image="/img/AboutImage/convenient.jpeg"
          imageAlt="convenient"
        />
        {/* <AboutMessage
          title="실시간 채팅"
          message="매우 빠른 무제한 실시간 채팅을 이용해 보세요. 간편하게 당신이 원하는 그림에 대해 설명해 보세요."
          messageFirst={false}
          image="/img/AboutImage/chats.jpeg"
          imageAlt={"realtime - chats"}
        /> */}
      </Wrapper>
    </>
  );
};

export default Home;
