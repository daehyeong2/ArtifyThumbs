import styled from "styled-components";
import Seo from "../components/Seo";
import { Link } from "react-router-dom";
import { useState } from "react";

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  height: 100vh;
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
`;

const PreviewTags = styled.ul`
  display: flex;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
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

const OrderManagement = () => {
  const [hoverItem, setHoverItem] = useState(null);
  const orders = [
    {
      id: 2,
      title: "발로란트 제트 매드무비 썸네일",
      date: "2021년 10월 17일",
      imageUrl: "/img/preparing.jpeg",
      isComplete: false,
      tags: ["유튜브 썸네일", "발로란트 매드무비", "제트"],
      description:
        "ArtifyThumbs라는 글자를 화면 정중앙에 넣어주시고 챔피언스 밴달을 들고 있는 것을 강조해주세요.",
    },
    {
      id: 1,
      title: "발로란트 챔피언스 매드무비 썸네일",
      date: "2021년 10월 15일",
      imageUrl:
        "https://cdn.discordapp.com/attachments/1206468979779174464/1215248645272764436/a014f81ec5c4ff4a.png?ex=660e847f&is=65fc0f7f&hm=5f2aff11249937830f001b959df0f885666a9b852917f0828d600f9c35fc4f70&",
      isComplete: true,
      tags: ["유튜브 썸네일", "발로란트 매드무비"],
      description: "테스트 설명",
    },
  ];
  let hoverData;
  if (hoverItem !== null) {
    hoverData = orders.find((order) => order.id === hoverItem);
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
                  <PreviewImage src={hoverData.imageUrl} />
                  <PreviewTitle>{hoverData.title}</PreviewTitle>
                  <PreviewTags>
                    {hoverData.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
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
                <OrderTitle>제목</OrderTitle>
                <OrderDate>신청 날짜</OrderDate>
                <OrderStatus $isComplete="header">상태</OrderStatus>
              </OrderHeader>
              {orders.map((order) => (
                <li
                  key={order.id}
                  onMouseEnter={() => setHoverItem(order.id)}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  <OrderLink to={`/order-management/${order.id}`}>
                    <OrderNumber>{order.id}</OrderNumber>
                    <OrderTitle>{order.title}</OrderTitle>
                    <OrderDate>{order.date}</OrderDate>
                    <OrderStatus $isComplete={order.isComplete}>
                      {order.isComplete ? "완료" : "준비 중"}
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
