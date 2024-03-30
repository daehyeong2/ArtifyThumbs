import styled from "styled-components";
import NavBar from "../components/NavBar";
import Seo from "../components/Seo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
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
`;

const Plan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 440px;
  height: 250px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 30px;
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
    svg {
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

const Order = () => {
  return (
    <>
      <Seo title="신청하기" />
      <NavBar />
      <Container>
        <ContainerTitle>신청하기</ContainerTitle>
        <Plans>
          <Plan>
            <PlanTitle>기본</PlanTitle>
            <PlanInfo>
              <PlanFeatures>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                  </svg>
                  그림 1장
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                  </svg>
                  실시간 채팅
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                  </svg>
                  1주일 안에 완성
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                  </svg>
                  시안 최대 6장
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                  </svg>
                  요구사항 최대 200글자
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                  </svg>
                  기본의 모든 조건
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                  </svg>
                  3일 안에 완성
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                  </svg>
                  시안 최대 12장
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                  </svg>
                  요구사항 최대 500글자
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
      </Container>
    </>
  );
};

export default Order;
