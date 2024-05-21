import styled from "styled-components";
import Seo from "../components/Seo";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

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
  overflow: hidden;
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

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 600;
`;

const OrderList = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 100%;
  height: fit-content;
  gap: 10px;
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
  padding-top: 5px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const OrderTitle = styled.h2`
  font-size: 16px;
`;

function parseISOString(string) {
  const strDate = string.substring(0, 10);
  const [y, m, d] = strDate.split("-");
  return `${y}년 ${+m}월 ${+d}일`;
}

const InquiryManagement = () => {
  const [hoverItem, setHoverItem] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const fetchInquiries = useCallback(async () => {
    try {
      const inquiryQuery = query(
        collection(db, "inquiries"),
        orderBy("isAnswered", "asc"),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      const inquirySnap = await getDocs(inquiryQuery);
      if (inquirySnap.docs.length > 0) {
        const docs = inquirySnap.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setInquiries(docs);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);
  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);
  let hoverData;
  if (hoverItem !== null) {
    hoverData = inquiries.find((inquiry) => inquiry.id === hoverItem);
  } else {
    hoverData = null;
  }
  return (
    <>
      <Seo title="문의 관리" />
      <Wrapper>
        <Container>
          <Title>문의 관리</Title>
          <Order>
            <OrderPreview>
              {hoverData ? (
                <>
                  <PreviewImage src="/img/inquiry.jpeg" />
                  <PreviewTitle>{hoverData.title}</PreviewTitle>
                  <PreviewDescription>{hoverData.content}</PreviewDescription>
                </>
              ) : (
                <>
                  <PreviewImage src="/img/smallLogo.jpeg" />
                  <PreviewTitle>문의를 선택해주세요.</PreviewTitle>
                  <PreviewDescription>
                    문의 위에 마우스를 올려보세요!
                  </PreviewDescription>
                </>
              )}
            </OrderPreview>
            <OrderList onMouseLeave={() => setHoverItem(null)}>
              <OrderHeader>
                <OrderNumber>번호</OrderNumber>
                <OrderTitle>제목</OrderTitle>
                <OrderDate>주문 날짜</OrderDate>
                <span>상태</span>
              </OrderHeader>
              {inquiries.map((order, idx) => (
                <OrderItem
                  onMouseEnter={() => setHoverItem(order.id)}
                  key={order.id}
                  to={`/inquiry-management/${order.id}`}
                >
                  <OrderNumber>{inquiries.length - idx}</OrderNumber>
                  <OrderTitle>
                    {order.title.length > 15
                      ? `${order.title.slice(0, 15)}...`
                      : order.title}
                  </OrderTitle>
                  <OrderDate>{parseISOString(order.createdAt)}</OrderDate>
                  <OrderStatus $isCompleted={order.isAnswered}>
                    {order.isAnswered ? "완료됨" : "준비 중"}
                  </OrderStatus>
                </OrderItem>
              ))}
            </OrderList>
          </Order>
        </Container>
      </Wrapper>
    </>
  );
};

export default InquiryManagement;
