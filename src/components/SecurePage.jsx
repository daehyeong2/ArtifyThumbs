import { useRecoilValue } from "recoil";
import { isRequestedAtom, userAtom } from "../atom";
import { Navigate } from "react-router";

const SecurePage = ({ element, authenticatedOnly, guestOnly, adminOnly }) => {
  const user = useRecoilValue(userAtom);
  const isRequested = useRecoilValue(isRequestedAtom);
  if (!isRequested) {
    // 데이터 요청이 완료되지 않은 경우 로딩 상태를 표시합니다.
    return null;
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
