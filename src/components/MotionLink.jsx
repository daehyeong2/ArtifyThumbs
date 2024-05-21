import React from "react";
import { Link, useNavigate } from "react-router-dom";
import usePrompt from "./usePrompt";
import { useRecoilValue } from "recoil";
import { isBlockedAtom } from "../atom";
import { motion } from "framer-motion";

const MotionLinkk = motion(Link);

function MotionLink({ to, children, ...props }) {
  const isBlocked = useRecoilValue(isBlockedAtom);
  const navigate = useNavigate();
  const confirmNavigation = usePrompt(
    "아직 저장되지 않았습니다. 정말로 페이지를 떠나시겠습니까?",
    isBlocked
  );

  const handleClick = (event) => {
    event.preventDefault();
    confirmNavigation(() => navigate(to));
  };

  return (
    <MotionLinkk to={to} onClick={handleClick} {...props}>
      {children}
    </MotionLinkk>
  );
}

export default MotionLink;
