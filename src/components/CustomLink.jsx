import React from "react";
import { Link, useNavigate } from "react-router-dom";
import usePrompt from "./usePrompt";
import { useRecoilValue } from "recoil";
import { isBlockedAtom } from "../atom";

function CustomLink({ to, children, ...props }) {
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
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}

export default CustomLink;
