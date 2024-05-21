import styled from "styled-components";
import Seo from "../components/Seo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 140px;
  box-sizing: border-box;
  gap: 80px;
`;

const ContainerTitle = styled.h1`
  font-size: 4rem;
  font-weight: 900;
`;

const Plans = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
  margin-bottom: 100px;
`;

const Plan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 440px;
  height: 250px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 29px;
  box-sizing: border-box;
  border-radius: 20px;
  transition: 0.1s;
  &:hover {
    box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.13);
  }
`;

const PlanTitle = styled.h2`
  font-size: 2rem;
  font-weight: 900;
`;

const PlanInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PlanFeatures = styled.ul`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-auto-flow: column;
  gap: 10px;
  li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    path {
      width: 15px;
      height: 15px;
      fill: #00b894;
    }
  }
`;

const PlanBuy = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PlanPrice = styled.h3`
  font-size: 1rem;
  font-weight: 900;
  color: #0984e3;
`;

const PlanButton = styled(motion.button)`
  padding: 8px 20px;
  border: none;
  color: white;
  font-size: 18px;
  border-radius: 20px;
  cursor: pointer;
`;

const planButtonVariants = {
  initial: {
    backgroundColor: "#0984e3",
    transition: {
      duration: 0.05,
    },
  },
  hover: {
    backgroundColor: "#0097e6",
    transition: {
      duration: 0.05,
    },
  },
};

const Detail = styled.ul`
  min-width: 400px;
  width: 40vw;
  display: grid;
  grid-template-rows: repeat(100px, 1fr);
  margin-bottom: 60px;
`;

const DetailItem = styled.li`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  grid-template-rows: repeat(auto-fill, 55px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const DetailInfo = styled.span`
  font-size: 15px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: #0984e3;
    font-weight: bold;
  }
  h3 {
    color: #7158e2;
    font-weight: bold;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }
  svg {
    color: white;
    background-color: #0984e3;
    padding: 5px 6px;
    border-radius: 50%;
    font-size: 12px;
  }
  &:first-child {
    font-weight: bold;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const DetailTitle = styled.h1`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Order = () => {
  return (
    <>
      <Seo title="신청하기" />
      <Container>
        <ContainerTitle>신청하기</ContainerTitle>
        <Plans>
          <Plan>
            <PlanTitle>기본</PlanTitle>
            <PlanInfo>
              <PlanFeatures>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  그림 1장
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  실시간 채팅
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  1주일 안에 완성
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  참고 사진 최대 6장
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  요구사항 최대 500글자
                </li>
              </PlanFeatures>
              <PlanBuy>
                <PlanPrice>4,900원</PlanPrice>
                <Link to="/apply/procedure" state="standard">
                  <PlanButton
                    variants={planButtonVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    신청하기
                  </PlanButton>
                </Link>
              </PlanBuy>
            </PlanInfo>
          </Plan>
          <Plan>
            <PlanTitle>프로</PlanTitle>
            <PlanInfo>
              <PlanFeatures>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  기본의 모든 조건
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  요구사항 최대 1,500글자
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  3일 안에 완성
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  참고 사진 최대 12장
                </li>
              </PlanFeatures>
              <PlanBuy>
                <PlanPrice>8,900원</PlanPrice>
                <Link to="/apply/procedure" state="pro">
                  <PlanButton
                    variants={planButtonVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    신청하기
                  </PlanButton>
                </Link>
              </PlanBuy>
            </PlanInfo>
          </Plan>
        </Plans>
        <Detail>
          <DetailTitle>세부사항</DetailTitle>
          <DetailItem>
            <DetailInfo />
            <DetailInfo>기본</DetailInfo>
            <DetailInfo>프로</DetailInfo>
          </DetailItem>
          <DetailItem>
            <DetailInfo>요금</DetailInfo>
            <DetailInfo>
              <span>4,900</span>원
            </DetailInfo>
            <DetailInfo>
              <span>8,900</span>원
            </DetailInfo>
          </DetailItem>
          <DetailItem>
            <DetailInfo>요구사항</DetailInfo>
            <DetailInfo>
              <span>500</span>글자
            </DetailInfo>
            <DetailInfo>
              <span>1,500</span>글자
            </DetailInfo>
          </DetailItem>
          <DetailItem>
            <DetailInfo>완성 기간</DetailInfo>
            <DetailInfo>
              <span>1</span>주일 이내
            </DetailInfo>
            <DetailInfo>
              <span>3</span>일 이내
            </DetailInfo>
          </DetailItem>
          <DetailItem>
            <DetailInfo>실시간 채팅</DetailInfo>
            <DetailInfo>
              <FontAwesomeIcon icon={faCheck} />
            </DetailInfo>
            <DetailInfo>
              <FontAwesomeIcon icon={faCheck} />
            </DetailInfo>
          </DetailItem>
          <DetailItem>
            <DetailInfo>채팅 메시지 (최대 개수)</DetailInfo>
            <DetailInfo>
              <h3>무제한</h3>
            </DetailInfo>
            <DetailInfo>
              <h3>무제한</h3>
            </DetailInfo>
          </DetailItem>
          <DetailItem>
            <DetailInfo>이미지 메시지 (최대 개수)</DetailInfo>
            <DetailInfo>
              <h3>무제한</h3>
            </DetailInfo>
            <DetailInfo>
              <h3>무제한</h3>
            </DetailInfo>
          </DetailItem>
          <DetailItem>
            <DetailInfo>참고사진 첨부</DetailInfo>
            <DetailInfo>
              <FontAwesomeIcon icon={faCheck} />
            </DetailInfo>
            <DetailInfo>
              <FontAwesomeIcon icon={faCheck} />
            </DetailInfo>
          </DetailItem>
          <DetailItem>
            <DetailInfo>참고 사진(최대 장수)</DetailInfo>
            <DetailInfo>
              <span>6</span>장
            </DetailInfo>
            <DetailInfo>
              <span>12</span>장
            </DetailInfo>
          </DetailItem>
          <DetailItem>
            <DetailInfo>그림 (장수)</DetailInfo>
            <DetailInfo>
              <span>1</span>장
            </DetailInfo>
            <DetailInfo>
              <span>1</span>장
            </DetailInfo>
          </DetailItem>
        </Detail>
      </Container>
    </>
  );
};

export default Order;
