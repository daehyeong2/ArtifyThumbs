import { Link } from "react-router-dom";
import styled from "styled-components";

const Order = styled(Link)`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  gap: 10px;
  padding: 15px;
  color: black;
  text-decoration: none;
  box-sizing: border-box;
`;

const OrderImage = styled.img`
  object-fit: cover;
  object-position: center;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 200px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

const Date = styled.h3`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
`;

const Desc = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Status = styled.span`
  font-size: 14px;
  span {
    color: ${(props) => (props.$isCompleted ? "green" : "red")};
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

const ListMobileOrder = ({ order }) => {
  return (
    <Order to={`/apply-list/${order.id}`}>
      <OrderImage src={order.result} alt={order.title} />
      <Title>
        {order.title.length > 25
          ? `${order.title.slice(0, 25)}...`
          : order.title}
      </Title>
      <Desc>
        <Date>{parseISOString(order.appliedAt)}</Date>
        <Status $isCompleted={order.isCompleted}>
          상태: <span>{order.isCompleted ? "완료 됨" : "준비 중"}</span>
        </Status>
      </Desc>
    </Order>
  );
};

export default ListMobileOrder;
