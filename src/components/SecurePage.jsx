import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useRecoilValue } from "recoil";
import { userAtom, userIsLoadedAtom } from "../atom";
import LoadingScreen from "./LoadingScreen";

const SecurePage = ({ element, authenticatedOnly, guestOnly, adminOnly }) => {
  const user = auth.currentUser;
  const userData = useRecoilValue(userAtom);
  const userDataIsLoaded = useRecoilValue(userIsLoadedAtom);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return element;
  }
  if (!userDataIsLoaded) {
    return <LoadingScreen />;
  }
  if (authenticatedOnly && !user) {
    alert("로그인이 필요한 서비스입니다.");
    return <Navigate to="/signin" replace />;
  } else if (guestOnly && user) {
    alert("로그인 중일 때는 사용하실 수 없습니다.");
    return <Navigate to="/" replace />;
  } else if (adminOnly && !userData?.isAdmin) {
    alert("접근 권한이 없습니다.");
    return <Navigate to="/" />;
  }

  return element;
};

export default SecurePage;
