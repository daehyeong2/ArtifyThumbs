import { motion } from "framer-motion";
import styled from "styled-components";
import Seo from "./Seo";

const Wrapper = styled(motion.div)`
  width: 100vw;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const Logo = styled.img`
  height: 70px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
`;

const WrapperVariants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0.65,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      type: "just",
      duration: 0.4,
    },
  },
};

const LoadingScreen = () => {
  return (
    <Wrapper variants={WrapperVariants} initial="initial" animate="animate">
      <Seo title="로딩 중.." />
      <Logo src="/img/smallLogo.jpeg" />
      <Title>로딩 중..</Title>
    </Wrapper>
  );
};

export default LoadingScreen;
