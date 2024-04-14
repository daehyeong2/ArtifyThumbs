import styled from "styled-components";
import Seo from "../components/Seo";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getOrders } from "../api";
import { useQuery } from "react-query";

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
  padding: 30px;
  box-sizing: border-box;
`;

const Order = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
`;

const OrderPreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;
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
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 600px;
`;

const OrderNumber = styled.div`
  font-size: 16px;
  font-weight: 600;
  background-color: white;
  padding: 10px 10px;
  display: flex;
  justify-content: center;
`;

const OrderTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  background-color: white;
  padding: 10px 15px;
  color: ${(props) =>
    props.$isComplete === "header"
      ? "black"
      : props.$isComplete
      ? "#00b894"
      : "#ff7675"};
`;

const OrderDate = styled.div`
  font-size: 16px;
  font-weight: 600;
  background-color: white;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
`;

const OrderStatus = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) =>
    props.$isComplete === "header"
      ? "black"
      : props.$isComplete
      ? "green"
      : "red"};
  background-color: white;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
`;

const OrderHeader = styled.li`
  display: grid;
  grid-template-columns: 60px 3fr 170px 100px;
  background-color: #d9d9d9;
  padding: 0 1px;
  padding-bottom: 1px;
  gap: 1px;
  box-sizing: border-box;
  position: sticky;
  top: 0;
`;

const OrderLink = styled(Link)`
  display: grid;
  grid-template-columns: 60px 3fr 170px 100px;
  background-color: rgba(0, 0, 0, 0.15);
  padding: 0 1px;
  padding-bottom: 1px;
  gap: 1px;
  box-sizing: border-box;
  text-decoration: none;
  color: black;
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

function parseISOString(string) {
  const strDate = string.substring(0, 10);
  const [y, m, d] = strDate.split("-");
  return `${y}년 ${+m}월 ${+d}일`;
}

const OrderManagement = () => {
  const [hoverItem, setHoverItem] = useState(null);
  const { data: orders } = useQuery("order-list", getOrders);
  let hoverData;
  if (hoverItem !== null) {
    hoverData = orders.data.find((order) => order._id === hoverItem);
  } else {
    hoverData = null;
  }
  return (
    <>
      <Seo title="주문 관리" />
      <Wrapper>
        <Container>
          <Title>주문 관리</Title>
          <Order>
            <OrderPreview>
              {hoverData ? (
                <>
                  <PreviewImage src={hoverData.result} />
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
                  <PreviewImage src="/img/smallLogo.jpeg" />
                  <PreviewTitle>주문을 선택해주세요.</PreviewTitle>
                  <PreviewDescription>
                    주문 위에 마우스를 올려보세요!
                  </PreviewDescription>
                </>
              )}
            </OrderPreview>
            <OrderList>
              <OrderHeader>
                <OrderNumber>번호</OrderNumber>
                <OrderTitle $isComplete="header">제목</OrderTitle>
                <OrderDate>신청 날짜</OrderDate>
                <OrderStatus $isComplete="header">상태</OrderStatus>
              </OrderHeader>
              {orders?.data.map((order, index) => (
                <li
                  key={order._id}
                  onMouseEnter={() => setHoverItem(order._id)}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  <OrderLink to={`/order-management/${order._id}`}>
                    <OrderNumber>{orders?.data.length - index}</OrderNumber>
                    <OrderTitle $isComplete={order.isComplete}>
                      {order.title}
                    </OrderTitle>
                    <OrderDate>{parseISOString(order.applyedAt)}</OrderDate>
                    <OrderStatus $isComplete={order.isComplete}>
                      {order.isComplete ? "제출 됨" : "준비 중"}
                    </OrderStatus>
                  </OrderLink>
                </li>
              ))}
            </OrderList>
          </Order>
        </Container>
      </Wrapper>
    </>
  );
};

export default OrderManagement;
