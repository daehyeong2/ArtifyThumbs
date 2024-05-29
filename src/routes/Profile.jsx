import { useRecoilValue } from "recoil";
import Seo from "../components/Seo";
import { auth, db } from "../firebase";
import { isMobileAtom, userAtom, widthAtom } from "../atom";
import { useState } from "react";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import styled from "styled-components";
import { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import ListOrder from "../components/list-order";
import ListMobileOrder from "../components/list-mobile-order";

const Wrapper = styled.div`
  padding: 70px 30px;
  padding-top: ${(props) => (props.$isSmall ? "70px" : "160px")};
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 100px ${(props) => (props.$isSmall ? "400px" : "")} 1fr;
  grid-template-columns: 1fr ${(props) => (props.$isSmall ? "" : "5fr")};
  gap: 0 20px;
  min-width: ${(props) => (props.$isMobile ? "" : "600px")};
  min-height: 400px;
  width: ${(props) => (props.$isMobile ? "100%" : "fit-content")};
  height: ${(props) => (props.$isSmall ? "100%" : "70vh")};
`;

const Title = styled.h1`
  font-size: 43px;
  font-weight: bold;
  grid-column: ${(props) => (props.$isSmall ? "" : "span 2")};
  display: flex;
  align-items: center;
`;

const Account = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$isSmall ? "30px" : "50px")};
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const AvatarContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  position: relative;
  justify-content: center;
`;

const AvatarTooltip = styled(motion.span)`
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #969fa5;
  color: white;
  font-size: 13px;
  padding: 8px 10px;
  border-radius: 5px;
  width: fit-content;
`;

const Avatar = styled(Link)`
  display: flex;
  justify-content: center;
`;

const AvatarImage = styled.img`
  object-fit: cover;
  object-position: center;
  max-width: 200px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const Username = styled.h2`
  width: 100%;
  font-size: 22px;
  font-weight: bold;
  text-align: ${(props) => (props.$isSmall ? "center" : "start")};
`;

const UserInfoes = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const UserInfo = styled.li`
  font-size: 16px;
  line-height: 1.3;
  text-align: ${(props) => (props.$isSmall ? "center" : "start")};
  span {
    color: #0984e3;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Orders = styled.ul`
  max-height: ${(props) => (props.$isMobile ? "600px" : "55vh")};
  height: min-content;
  display: flex;
  flex-direction: column;
  margin: 0 ${(props) => (props.$isMobile ? "auto" : 0)};
  gap: ${(props) => (props.$isMobile ? "10px" : "1px")};
  padding: 0 ${(props) => (props.$isMobile ? "5px" : 0)};
  background-color: ${(props) =>
    props.$isMobile ? "white" : "rgba(0, 0, 0, 0.2)"};
  overflow-y: auto;
  max-width: ${(props) => (props.$isMobile ? "400px" : "800px")};
`;

const ApplyMessage = styled.h2`
  font-size: 18px;
  display: flex;
  width: 300px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
`;

const GoApply = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const OrdersTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const parseISOString = (string) => {
  const strDate = string.substring(0, 10);
  const [y, m, d] = strDate.split("-");
  return (
    <>
      <span>{y}</span>년 <span>{+m}</span>월 <span>{+d}</span>일
    </>
  );
};

const tooltipVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const Profile = () => {
  const user = auth.currentUser;
  const userData = useRecoilValue(userAtom);
  const [orders, setOrders] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const fetchOrders = useCallback(async () => {
    if (!user || !userData) return;
    const orderQuery = query(
      collection(db, "orders"),
      where("orderer", "==", userData.userId),
      orderBy("isCompleted", "desc"),
      orderBy("appliedAt", "desc"),
      limit(20)
    );
    const orderSnap = await getDocs(orderQuery);
    if (!orderSnap.empty) {
      const orderData = orderSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(orderData);
    }
  }, [user, userData]);
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  const width = useRecoilValue(widthAtom);
  const isMobile = useRecoilValue(isMobileAtom);
  const isSmall = !(width > 950);
  return (
    <>
      <Seo title="프로필" description="당신의 계정 프로필을 확인해 보세요!" />
      <Wrapper $isSmall={isSmall}>
        <Container $isMobile={isMobile} $isSmall={isSmall}>
          <Title $isSmall={isSmall}>프로필</Title>
          <Account $isSmall={isSmall}>
            <User>
              {user && (
                <>
                  <AvatarContainer>
                    <Avatar to="/settings/profile">
                      <AvatarImage
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                        src={user.photoURL}
                        alt={user.displayName}
                      />
                    </Avatar>
                    <AnimatePresence>
                      {isHover && (
                        <AvatarTooltip
                          variants={tooltipVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                        >
                          프로필 사진 변경하기
                        </AvatarTooltip>
                      )}
                    </AnimatePresence>
                  </AvatarContainer>
                  <Username $isSmall={isSmall}>{user.displayName}</Username>
                </>
              )}
            </User>
            <UserInfoes>
              <UserInfo $isSmall={isSmall}>
                총 주문 수: <span>{orders.length}</span>건
              </UserInfo>
              <UserInfo $isSmall={isSmall}>
                계정 가입일:
                <br />
                {userData &&
                  parseISOString(new Date(userData.createdAt).toISOString())}
              </UserInfo>
            </UserInfoes>
          </Account>
          {isMobile && <OrdersTitle>내 그림</OrdersTitle>}
          {orders?.length > 0 ? (
            <Orders $isMobile={isMobile}>
              {orders.map((order) =>
                isMobile ? (
                  <ListMobileOrder key={order.id} order={order} />
                ) : (
                  <ListOrder key={order.id} order={order} />
                )
              )}
            </Orders>
          ) : (
            <ApplyMessage>
              🪄 이런! 신청한 그림이 없어요!
              <GoApply to="/apply">🚀 신청하러 가기 🚀</GoApply>
            </ApplyMessage>
          )}
        </Container>
      </Wrapper>
    </>
  );
};

export default Profile;
