import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import styled from "styled-components";
import { Link } from "react-scroll";
import { useState } from "react";

const Top = styled(motion.div)`
  position: fixed;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: 1px solid #dbdbdb;
  background-color: #f4f4f4;
  right: 35px;
  bottom: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    width: 40px;
    height: 40px;
  }
`;

const topVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.1,
    },
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1,
    },
  },
};

const TopButton = () => {
  const { scrollY } = useScroll();
  const [isTopButtonVisible, setIsTopButtonVisible] = useState(0);
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsTopButtonVisible(latest > 120);
  });
  return (
    <Link to="main" smooth={true} duration={300}>
      <AnimatePresence>
        {isTopButtonVisible && (
          <Top
            variants={topVariants}
            initial="initial"
            animate="animate"
            exit="initial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
            </svg>
          </Top>
        )}
      </AnimatePresence>
    </Link>
  );
};

export default TopButton;
