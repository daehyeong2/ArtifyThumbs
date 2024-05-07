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
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const Container = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 120px;
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
`;

const ApplyLink = styled(Link)`
  text-decoration: none;
  color: inherit;
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
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
  }
`;

const ApplyImage = styled.img`
  width: 100%;
  height: 205px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

const ApplyDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  font-weight: 700;
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
  margin-top: 110px;
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

function parseISOString(string) {
  const strDate = string.substring(0, 10);
  const [y, m, d] = strDate.split("-");
  return `${y}년 ${+m}월 ${+d}일`;
}

const ApplyList = () => {
  const user = auth.currentUser;
  const [orders, setOrders] = useState(null);
  const fetchOrders = useCallback(async () => {
    if (!user) return;
    const orderQuery = query(
      collection(db, "orders"),
      where("orderer", "==", user.uid),
      orderBy("isCompleted", "asc"),
      orderBy("applyedAt", "desc"),
      limit(20)
    );
    const querySnapshot = await getDocs(orderQuery);
    if (querySnapshot.docs.length === 0) {
      setOrders([]);
    } else {
      const docs = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setOrders(docs);
    }
  }, [user]);
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  return (
    <>
      <Seo title="신청 목록" />
      <Container>
        <Title>내 신청 목록</Title>
        {orders && (
          <List $isExist={orders.length > 0}>
            {orders.length > 0 ? (
              orders.map((apply, index) => {
                return (
                  <ApplyLink key={index} to={`/apply-list/${apply.id}`}>
                    <Apply>
                      <ApplyImage src={apply.result} alt="result" />
                      <ApplyDesc>
                        <ApplyHeader>
                          <ApplyTitle>
                            {apply.title.length > 10
                              ? `${apply.title.slice(0, 10)}...`
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
                            신청 날짜: {parseISOString(apply.applyedAt)}
                          </ApplyDate>
                        </ApplyInfoes>
                      </ApplyDesc>
                    </Apply>
                  </ApplyLink>
                );
              })
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
