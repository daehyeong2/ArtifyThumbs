import { useRouteError } from "react-router";
import NavBar from "./NavBar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const ErrorCode = styled.h2`
  font-size: 4rem;
`;

const ErrorMessage = styled.h3`
  font-size: 2rem;
  span {
    font-weight: 900;
  }
`;

const BackButton = styled.button`
  padding: 8px 20px;
  background-color: #0984e3;
  border: none;
  color: white;
  font-size: 18px;
  border-radius: 20px;
  cursor: pointer;
`;

const NotFound = () => {
  const error = useRouteError();
  return (
    <>
      <Seo title={`${error.status} - 에러 발생`} />
      <NavBar />
      <Container>
        <ErrorCode>에러 발생! (Code: {error.status})</ErrorCode>
        <ErrorMessage>
          Error Message: <span>{error.statusText}</span>
        </ErrorMessage>
        <Link to="/">
          <BackButton>홈으로 돌아가기</BackButton>
        </Link>
      </Container>
    </>
  );
};

export default NotFound;
