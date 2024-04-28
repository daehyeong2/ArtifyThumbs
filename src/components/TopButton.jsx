import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import styled from "styled-components";
import { Link } from "react-scroll";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

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
    <Link to="root" smooth={true} duration={300}>
      <AnimatePresence>
        {isTopButtonVisible && (
          <Top
            variants={topVariants}
            initial="initial"
            animate="animate"
            exit="initial"
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </Top>
        )}
      </AnimatePresence>
    </Link>
  );
};

export default TopButton;
