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
            <OrderList>
              <OrderHeader>
                <OrderNumber>번호</OrderNumber>
                <OrderTitle $isComplete="header">제목</OrderTitle>
                <OrderDate>문의 날짜</OrderDate>
                <OrderStatus $isComplete="header">상태</OrderStatus>
              </OrderHeader>
              {inquiries?.map((inquiry, index) => (
                <li
                  key={inquiry.id}
                  onMouseEnter={() => setHoverItem(inquiry.id)}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  <OrderLink to={`/inquiry-management/${inquiry.id}`}>
                    <OrderNumber>{inquiries.length - index}</OrderNumber>
                    <OrderTitle $isComplete={inquiry.isAnswered}>
                      {inquiry.title}
                    </OrderTitle>
                    <OrderDate>{parseISOString(inquiry.createdAt)}</OrderDate>
                    <OrderStatus $isComplete={inquiry.isAnswered}>
                      {inquiry.isAnswered ? "답변 됨" : "대기 중"}
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

export default InquiryManagement;
