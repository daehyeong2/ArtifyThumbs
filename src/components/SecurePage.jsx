import { Navigate } from "react-router";
import { useRecoilValue } from "recoil";
import { userAtom, userIsLoadedAtom } from "../atom";

const SecurePage = ({ element, authenticatedOnly, guestOnly, adminOnly }) => {
  const user = useRecoilValue(userAtom);
  const userIsLoaded = useRecoilValue(userIsLoadedAtom);
  if (!userIsLoaded) {
    return;
  }
  if (authenticatedOnly && !user) {
    alert("로그인이 필요한 서비스입니다.");
    return <Navigate to="/signin" replace />;
  } else if (guestOnly && user) {
    alert("로그인 중일 때는 사용하실 수 없습니다.");
    return <Navigate to="/" replace />;
  } else if (adminOnly && user?.role !== "admin") {
    alert("접근 권한이 없습니다.");
    return <Navigate to="/" />;
  }

  return element;
};

export default SecurePage;
