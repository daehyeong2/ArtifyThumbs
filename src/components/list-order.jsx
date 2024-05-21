import { Link } from "react-router-dom";
import styled from "styled-components";

const Order = styled(Link)`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 150px 1fr 100px;
  gap: 20px;
  background-color: white;
  cursor: pointer;
  color: black;
  text-decoration: none;
`;

const OrderImage = styled.img`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const OrderInfo = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  padding: 10px 0;
`;

const OrderTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

const OrderDescription = styled.p`
  font-size: 14px;
  line-height: 1.1;
  word-break: break-all;
`;

const OrderDate = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
`;

const OrderStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const Plan = styled.div`
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 14px;
  color: white;
  background-color: ${(props) => (props.$isPro ? "#ff7675" : "#0984e3")};
`;

const Status = styled.div`
  font-size: 13px;
  span {
    font-weight: bold;
    color: ${(props) => (props.$isCompleted ? "#20bf6b" : "#ff3838")};
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

const ListOrder = ({ order }) => {
  return (
    <Order to={`/apply-list/${order.id}`}>
      <OrderImage src={order.result} alt={order.title} />
      <OrderInfo>
        <OrderTitle>
          {order.title.length > 15
            ? `${order.title.slice(0, 15)}...`
            : order.title}
        </OrderTitle>
        <OrderDescription>
          {order.description.length > 120
            ? `${order.description.slice(0, 120)}...`
            : order.description}
        </OrderDescription>
        <OrderDate>{parseISOString(order.appliedAt)}</OrderDate>
      </OrderInfo>
      <OrderStatus>
        <Plan $isPro={order.plan === "pro"}>
          {order.plan === "pro" ? "프로" : "기본"}
        </Plan>
        <Status $isCompleted={order.isCompleted}>
          상태: <span>{order.isCompleted ? "완료됨" : "대기 중"}</span>
        </Status>
      </OrderStatus>
    </Order>
  );
};

export default ListOrder;
