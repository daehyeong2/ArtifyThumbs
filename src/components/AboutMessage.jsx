import { motion } from "framer-motion";
import styled from "styled-components";
import { isMobileAtom } from "../atom";
import { useRecoilValue } from "recoil";

const About = styled(motion.div)`
  display: flex;
  max-width: ${(props) => (props.$isMobile ? "500px" : "")};
  width: 100%;
  height: fit-content;
  flex-direction: ${(props) => (props.$isMobile ? "column" : "row")};
  justify-content: center;
  padding: 0 20px;
  box-sizing: border-box;
  align-items: center;
  gap: 60px;
  margin-bottom: 150px;
  div {
    width: ${(props) => (props.$isMobile ? "fit-content" : "500px")};
    max-width: ${(props) => (props.$isMobile ? "600px" : "")};
  }
`;

const AboutInfo = styled.div`
  display: ${(props) => (props.$isVisible ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 500px;
`;

const AboutImage = styled.img`
  width: ${(props) => (props.$isMobile ? "100%" : "400px")};
  height: 100%;
  object-fit: contain;
`;

const AboutTitle = styled.h1`
  font-size: 2rem;
`;

const AboutContent = styled.span`
  font-size: 1.1rem;
  line-height: 1.5;
`;

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

const AboutMessage = ({ message, title, image, messageFirst, imageAlt }) => {
  const isMobile = useRecoilValue(isMobileAtom);
  return (
    <About
      variants={AboutVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: "all" }}
      $isMobile={isMobile}
    >
      <AboutInfo $isVisible={!isMobile && messageFirst}>
        <AboutTitle>{title}</AboutTitle>
        <AboutContent>{message}</AboutContent>
      </AboutInfo>
      <AboutImage src={image} alt={imageAlt} $isMobile={isMobile} />
      <AboutInfo $isVisible={isMobile || !messageFirst}>
        <AboutTitle>{title}</AboutTitle>
        <AboutContent>{message}</AboutContent>
      </AboutInfo>
    </About>
  );
};

export default AboutMessage;
