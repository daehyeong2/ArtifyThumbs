import styled from "styled-components";
import Seo from "../components/Seo";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { parseISOString } from "../components/detailApply";
import { useRecoilValue } from "recoil";
import { isMobileAtom, widthAtom } from "../atom";

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding-top: 90px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  height: 700px;
  gap: 50px;
  padding: ${(props) => (props.$isMobile ? 0 : "30px")};
  box-sizing: border-box;
`;

const Order = styled.div`
  display: ${(props) => (props.$isSmall ? "block" : "grid")};
  grid-template-columns: 1fr 2fr;
  gap: 30px;
`;

const OrderPreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PreviewImage = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${(props) => props.$src});
  background-size: ${(props) => (props.$contain ? "contain" : "cover")};
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 15px;
`;

const PreviewTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
`;

const PreviewDescription = styled.p`
  line-height: 1.1;
  height: 180px;
  width: 460px;
  overflow-wrap: break-word;
  overflow-y: auto;
`;

const PreviewTags = styled.ul`
  display: flex;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  li {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 5px 10px;
    border-radius: 8px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 600;
`;

const OrderList = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 600px;
  height: 100%;
`;

const OrderHeader = styled.header`
  display: grid;
  grid-template-columns: 60px 2fr 1fr 70px;
  place-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-weight: bold;
`;

const OrderNumber = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const OrderTitle = styled.h2`
  font-size: 16px;
`;

const OrderDate = styled.span`
  font-size: 15px;
  font-weight: bold;
`;

const OrderStatus = styled.span`
  font-size: 16px;
  color: ${(props) => (props.$isCompleted ? "#20bf6b" : "#ff3838")};
  font-weight: bold;
`;

const OrderItem = styled(Link)`
  display: grid;
  grid-template-columns: 60px 2fr 1fr 70px;
  color: black;
  text-decoration: none;
  place-items: center;
  padding: 15px 0;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  background-color: ${(props) => (props.$newMessage ? "#fff5d2" : "white")};
`;

const Plan = styled.div`
  background-color: ${(props) => (props.$isPro ? "#ff7675" : "#0984e3")};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  font-size: 18px;
  color: white;
  border-radius: 5px;
  position: absolute;
  right: 30px;
`;

const MobileItem = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  padding: 15px;
  border-radius: 10px;
  color: black;
  text-decoration: none;
  background-color: ${(props) => (props.$newMessage ? "#fff5d2" : "white")};
  margin-top: ${(props) => (props.$isFirst ? "" : "10px")};
`;

const MobileTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

const MobileBottomBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MobileStatus = styled.h3`
  font-size: 14px;
  span {
    font-weight: bold;
    color: ${(props) => (props.$isCompleted ? "green" : "red")};
  }
`;

const MobileDate = styled.span`
  font-size: 14px;
`;

const OrderManagement = () => {
  const [hoverItem, setHoverItem] = useState(null);
  const [orders, setOrders] = useState([]);
  const fetchOrders = useCallback(async () => {
    try {
      const orderQuery = query(
        collection(db, "orders"),
        orderBy("isCompleted", "asc"),
        orderBy("appliedAt", "desc"),
        limit(25)
      );
      const orderSnap = await getDocs(orderQuery);
      if (orderSnap.docs.length > 0) {
        const docs = orderSnap.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setOrders(docs);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  let hoverData;
  if (hoverItem !== null) {
    hoverData = orders?.find((order) => order.id === hoverItem);
  } else {
    hoverData = null;
  }
  const width = useRecoilValue(widthAtom);
  const isSmall = !(width > 1330);
  const isMobile = useRecoilValue(isMobileAtom);
  return (
    <>
      <Seo title="주문 관리" />
      <Wrapper>
        <Container $isMobile={isMobile}>
          <Title>주문 관리</Title>
          <Order $isSmall={isSmall}>
            {!isSmall && (
              <OrderPreview>
                {hoverData ? (
                  <>
                    <PreviewImage $src={hoverData.result} />
                    <PreviewTitle>{hoverData.title}</PreviewTitle>
                    <PreviewTags>
                      {hoverData.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                      <Plan $isPro={hoverData.plan === "pro"}>
                        {hoverData.plan === "pro" ? "프로" : "기본"}
                      </Plan>
                    </PreviewTags>
                    <PreviewDescription>
                      {hoverData.description}
                    </PreviewDescription>
                  </>
                ) : (
                  <>
                    <PreviewImage $src="/img/smallLogo.jpeg" $contain={true} />
                    <PreviewTitle>주문을 선택해주세요.</PreviewTitle>
                    <PreviewDescription>
                      주문 위에 마우스를 올려보세요!
                    </PreviewDescription>
                  </>
                )}
              </OrderPreview>
            )}
            <OrderList
              $isMobile={isMobile}
              onMouseLeave={() => setHoverItem(null)}
            >
              {!isMobile && (
                <OrderHeader>
                  <OrderNumber>번호</OrderNumber>
                  <OrderTitle>제목</OrderTitle>
                  <OrderDate>주문 날짜</OrderDate>
                  <span>상태</span>
                </OrderHeader>
              )}
              {orders.map((order, idx) =>
                isMobile ? (
                  <MobileItem
                    key={order.id}
                    to={`/order-management/${order.id}`}
                    $isFirst={idx === 0}
                    $newMessage={
                      order.chats.length > 0 &&
                      order.chats[order.chats.length - 1].isMe &&
                      !order.chats[order.chats.length - 1].isRead
                    }
                  >
                    <MobileTitle>
                      {order.title.length > 15
                        ? `${order.title.slice(0, 15)}...`
                        : order.title}
                    </MobileTitle>
                    <MobileBottomBar>
                      <MobileStatus $isCompleted={order.isCompleted}>
                        상태:{" "}
                        <span>{order.isCompleted ? "완료됨" : "준비 중"}</span>
                      </MobileStatus>
                      <MobileDate>
                        주문 날짜: {parseISOString(order.appliedAt)}
                      </MobileDate>
                    </MobileBottomBar>
                  </MobileItem>
                ) : (
                  <OrderItem
                    onMouseEnter={() => setHoverItem(order.id)}
                    key={order.id}
                    to={`/order-management/${order.id}`}
                    $isFirst={idx === 0}
                    $newMessage={
                      order.chats.length > 0 &&
                      order.chats[order.chats.length - 1].isMe &&
                      !order.chats[order.chats.length - 1].isRead
                    }
                  >
                    <OrderNumber>{orders.length - idx}</OrderNumber>
                    <OrderTitle>
                      {order.title.length > 15
                        ? `${order.title.slice(0, 15)}...`
                        : order.title}
                    </OrderTitle>
                    <OrderDate>{parseISOString(order.appliedAt)}</OrderDate>
                    <OrderStatus $isCompleted={order.isCompleted}>
                      {order.isCompleted ? "완료됨" : "준비 중"}
                    </OrderStatus>
                  </OrderItem>
                )
              )}
            </OrderList>
          </Order>
        </Container>
      </Wrapper>
    </>
  );
};

export default OrderManagement;
