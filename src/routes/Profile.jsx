import { useRecoilValue } from "recoil";
import Seo from "../components/Seo";
import { auth, db } from "../firebase";
import { userAtom } from "../atom";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import styled from "styled-components";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  padding-top: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  height: 100vh;
`;

const AvatarContainer = styled(motion(Link))`
  position: relative;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;
const AvatarOverlay = styled(motion.div)`
  position: absolute;
  width: 102px;
  height: 102px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const AvatarIcon = styled(motion(FontAwesomeIcon))`
  margin-left: 10px;
  color: black;
  font-size: 42px;
`;

const Username = styled.h1`
  display: flex;
  gap: 13px;
  font-size: 30px;
  font-weight: bold;
  align-items: center;
  margin-bottom: 20px;
  svg {
    font-size: 28px;
    color: black;
    cursor: pointer;
    &:hover {
      color: #0984e3;
    }
  }
`;
const Role = styled.div`
  padding: 8px 10px;
  background-color: ${(props) => (props.$isAdmin ? "#ff7675" : "#0984e3")};
  color: white;
  border-radius: 15px;
  font-size: 22px;
`;

const Infoes = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 35px;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  gap: 40px;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const InfoTitle = styled.h3``;

const InfoValue = styled.span`
  font-size: 20px;
  span {
    background: linear-gradient(to right top, #2e86de, #f368e0);
    color: transparent;
    background-clip: text;
    font-weight: bold;
  }
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

const avatarVariants = {
  initial: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const Profile = () => {
  const user = auth.currentUser;
  const userData = useRecoilValue(userAtom);
  const [orders, setOrders] = useState([]);
  const fetchOrders = useCallback(async () => {
    if (!user || !userData) return;
    const orderQuery = query(
      collection(db, "orders"),
      where("orderer", "==", userData.userId),
      orderBy("applyedAt", "desc")
    );
    const orderSnap = await getDocs(orderQuery);
    if (!orderSnap.empty) {
      const orderData = orderSnap.docs.map((doc) => doc.data());
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
        {user && userData && (
          <>
            <AvatarContainer
              to="/settings/profile"
              initial="initial"
              whileHover="hover"
            >
              <Avatar src={user.photoURL} />
              <AvatarOverlay
                transition={{ duration: 0.2 }}
                variants={avatarVariants}
              >
                <AvatarIcon icon={faUserEdit} />
              </AvatarOverlay>
            </AvatarContainer>
            <Username>
              {user.displayName}{" "}
              <Link to="/settings/profile">
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <Role $isAdmin={userData.isAdmin}>
                {userData.isAdmin ? "운영자" : "유저"}
              </Role>
            </Username>
            <Infoes>
              <InfoBar>
                <InfoBox>
                  <InfoTitle>주문 수</InfoTitle>
                  <InfoValue>
                    <span>{orders.length}</span>건
                  </InfoValue>
                </InfoBox>
                <InfoBox>
                  <InfoTitle>가입일</InfoTitle>
                  <InfoValue>
                    {parseISOString(new Date(userData.createdAt).toISOString())}
                  </InfoValue>
                </InfoBox>
              </InfoBar>
            </Infoes>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Profile;
