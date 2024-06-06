import styled from "styled-components";
import Seo from "../components/Seo";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 120px;
`;

const Overlay = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: -1;
  position: absolute;
  width: 250px;
  height: 250px;
  background-image: url("/img/smallLogo.jpeg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 250px;
  opacity: 0.2;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  padding: 0 40px;
  font-weight: 700;
  margin-bottom: 60px;
`;

const List = styled.ul`
  display: ${(props) => (props.$isExist ? "grid" : "flex")};
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 0 40px;
  padding-bottom: 60px;
`;

const ApplyLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ApplyImage = styled.div`
  width: 100%;
  height: 205px;
  background-image: url(${(props) => props.$src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px 10px 0 0;
  transition: scale 0.2s ease-in-out;
  background-color: white;
`;

const Apply = styled.li`
  overflow: hidden;
  height: 300px;
  display: grid;
  grid-template-rows: 1fr 0.2fr;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  box-shadow: 3px 3px 7px 2px rgba(0, 0, 0, 0.15);
  transition: 0.2s;
  position: relative;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
    ${ApplyImage} {
      scale: 1.1;
    }
  }
`;

const LoadMore = styled.button`
  height: 300px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  box-shadow: 2px 2px 7px 2px rgba(0, 0, 0, 0.15);
  background-color: #f4f4f4;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: 0.2s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 5px 5px 7px 2px rgba(0, 0, 0, 0.15);
  }
`;

const LoadMoreTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const LoadMoreIcon = styled(FontAwesomeIcon)`
  font-size: 100px;
`;

const ApplyDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
  background-color: white;
  gap: 20px;
  padding: 20px;
`;

const ApplyTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
`;

const ApplyInfoes = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ApplyStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Status = styled.span`
  color: ${(props) => (props.$isComplete ? "green" : "red")};
  font-weight: bold;
`;

const ApplyDate = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

const ApplyMessage = styled.h2`
  font-size: 18px;
  display: flex;
  width: 300px;
  flex-direction: column;
  margin-top: 120px;
  align-items: center;
  gap: 10px;
`;

const GoApply = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const ApplyHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ApplyPlan = styled.div`
  font-size: 1.1rem;
  padding: 4px 8px;
  border-radius: 8px;
  position: absolute;
  right: 0;
  background-color: ${(props) => (props.$isPro ? "#ff7675" : "#0984e3")};
  color: white;
`;

const ApplyNewMessage = styled(motion.div)`
  position: absolute;
  top: 15px;
  right: 15px;
  border-radius: 5px;
  background-color: #fdcb6e;
  font-weight: bold;
  color: white;
  padding: 5px 8px;
  font-size: 14px;
  z-index: 10;
`;

const applyMessageVariants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: 1.03,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 0.3,
    },
  },
};

function parseISOString(string) {
  const strDate = string.substring(0, 10);
  const [y, m, d] = strDate.split("-");
  return `${y}년 ${+m}월 ${+d}일`;
}

const ApplyList = () => {
  const user = auth.currentUser;
  const [orders, setOrders] = useState([]);
  const [loadMoreVisible, setLoadMoreVisible] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);

  const pageSize = 1;

  const fetchOrders = useCallback(
    async (pageSize, startAfterDoc, date) => {
      if (!user) return;
      let orderQuery;
      if (startAfterDoc) {
        orderQuery = query(
          collection(db, "orders"),
          where("orderer", "==", user.uid),
          orderBy("isCompleted", "desc"),
          orderBy("appliedAt", "desc"),
          startAfter(startAfterDoc),
          limit(pageSize)
        );
      } else {
        orderQuery = query(
          collection(db, "orders"),
          where("orderer", "==", user.uid),
          orderBy("isCompleted", "desc"),
          orderBy("appliedAt", "desc"),
          limit(pageSize)
        );
      }
      const querySnapshot = await getDocs(orderQuery);
      if (querySnapshot.docs.length === 0) {
        return setLoadMoreVisible(false);
      } else {
        const docs = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        if (docs.length === pageSize) {
          setLoadMoreVisible(true);
        } else {
          setLoadMoreVisible(false);
        }
        return {
          data: docs,
          lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
        };
      }
    },
    [user]
  );
  const loadMore = async () => {
    const result = await fetchOrders(pageSize, lastVisible, Date.now());
    if (!result) return;
    const { data: nextPageData, lastVisible: nextLastVisible } = result;
    setOrders((prev) => [...prev, ...nextPageData]);
    setLastVisible(nextLastVisible);
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchOrders(pageSize, null, Date.now());
      if (!result) return;
      const { data, lastVisible } = result;
      setOrders((prev) => [...prev, ...data]);
      setLastVisible(lastVisible);
    };
    fetchData();
  }, [fetchOrders]);
  return (
    <>
      <Seo title="신청 목록" />
      <Container>
        <Overlay />
        <Title>내 신청 목록</Title>
        {orders && (
          <List $isExist={orders.length > 0}>
            {orders.length > 0 ? (
              <>
                {orders.map((apply, index) => {
                  return (
                    <ApplyLink key={index} to={`/apply-list/${apply.id}`}>
                      <Apply>
                        {apply.chats[apply.chats.length - 1] &&
                        !apply.chats[apply.chats.length - 1]?.isMe &&
                        !apply.chats[apply.chats.length - 1]?.isRead ? (
                          <ApplyNewMessage
                            variants={applyMessageVariants}
                            initial="initial"
                            animate="animate"
                          >
                            새로운 메시지
                          </ApplyNewMessage>
                        ) : null}
                        <ApplyImage $src={apply.result} alt="result" />
                        <ApplyDesc>
                          <ApplyHeader>
                            <ApplyTitle>
                              {apply.title.length > 8
                                ? `${apply.title.slice(0, 8)}...`
                                : apply.title}
                            </ApplyTitle>
                            <ApplyPlan $isPro={apply.plan === "pro"}>
                              {apply.plan === "pro" ? "프로" : "기본"}
                            </ApplyPlan>
                          </ApplyHeader>
                          <ApplyInfoes>
                            <ApplyStatus>
                              상태:{" "}
                              <Status $isComplete={apply.isCompleted}>
                                {apply.isCompleted ? "완료됨" : "준비중"}
                              </Status>
                            </ApplyStatus>
                            <ApplyDate>
                              신청 날짜: {parseISOString(apply.appliedAt)}
                            </ApplyDate>
                          </ApplyInfoes>
                        </ApplyDesc>
                      </Apply>
                    </ApplyLink>
                  );
                })}
                {loadMoreVisible && (
                  <LoadMore onClick={loadMore}>
                    <LoadMoreIcon icon={faPlus} />
                    <LoadMoreTitle>더 불러오기</LoadMoreTitle>
                  </LoadMore>
                )}
              </>
            ) : (
              <ApplyMessage>
                🪄 이런! 신청한 그림이 없어요!
                <GoApply to="/apply">🚀 신청하러 가기 🚀</GoApply>
              </ApplyMessage>
            )}
          </List>
        )}
      </Container>
    </>
  );
};

export default ApplyList;
