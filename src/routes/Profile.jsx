import { useRecoilValue } from "recoil";
import Seo from "../components/Seo";
import { auth, db } from "../firebase";
import { userAtom } from "../atom";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import styled from "styled-components";
import { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import ListOrder from "../components/list-order";

const Wrapper = styled.div`
  padding-top: 160px;
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr 3fr;
  gap: 0 10px;
  min-width: 600px;
  min-height: 400px;
  width: 65vw;
  height: 70vh;
`;

const Title = styled.h1`
  font-size: 43px;
  font-weight: bold;
  grid-column: span 2;
  display: flex;
  align-items: center;
`;

const Account = styled.section`
  display: flex;
  flex-direction: column;
  gap: 50px;
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
  width: 100%;
  display: flex;
  justify-content: center;
`;

const AvatarImage = styled.img`
  object-fit: cover;
  object-position: center;
  max-width: 200px;
  width: 90%;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const Username = styled.h2`
  width: 100%;
  font-size: 22px;
  font-weight: bold;
`;

const UserInfoes = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const UserInfo = styled.li`
  font-size: 16px;
  line-height: 1.3;
  span {
    color: #0984e3;
  }
`;

const Orders = styled.ul`
  max-height: 55vh;
  height: min-content;
  display: flex;
  flex-direction: column;
  gap: 1px;
  background-color: rgba(0, 0, 0, 0.2);
  overflow-y: auto;
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
      orderBy("appliedAt", "desc")
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
  return (
    <>
      <Seo title="프로필" description="당신의 계정 프로필을 확인해 보세요!" />
      <Wrapper>
        <Container>
          <Title>프로필</Title>
          <Account>
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
                  <Username>{user.displayName}</Username>
                </>
              )}
            </User>
            <UserInfoes>
              <UserInfo>
                총 주문 수: <span>{orders.length}</span>건
              </UserInfo>
              <UserInfo>
                계정 가입일:
                <br />
                {userData &&
                  parseISOString(new Date(userData.createdAt).toISOString())}
              </UserInfo>
            </UserInfoes>
          </Account>
          <Orders>
            {orders.map((order) => (
              <ListOrder key={order.id} order={order} />
            ))}
          </Orders>
        </Container>
      </Wrapper>
    </>
  );
};

export default Profile;
