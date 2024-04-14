import Seo from "../components/Seo";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getInquiry } from "../api";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 800px;
  height: 500px;
  border: 1px solid #74b9ff;
  border-radius: 15px;
  position: relative;
  box-shadow: 15px -15px #74b9ff;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  padding: 40px;
  &:hover {
    border-color: #a29bfe;
    box-shadow: 20px -20px #a29bfe;
  }
`;

const Back = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 18px;
  position: absolute;
  left: -3px;
  top: -14px;
  background-color: white;
  padding: 3px 5px;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 35px;
  font-weight: bold;
`;

const Email = styled.h2`
  font-size: 18px;
  margin-top: 30px;
`;

const Description = styled.p`
  margin-top: 40px;
  line-height: 1.1;
`;

const DetailInquiry = () => {
  const { inquiryId } = useParams();
  const {
    data: { data },
    isLoading,
  } = useQuery(["inquiry", inquiryId], () => getInquiry(inquiryId));
  return (
    <>
      <Seo title={isLoading ? "로딩 중.." : data.title} />
      {!isLoading ? (
        <Wrapper>
          <Container>
            <Back to="/inquiry-management">&larr; 뒤로가기</Back>
            <Title>{data.title}</Title>
            <Email>이메일: {data.email}</Email>
            <Description>{data.content}</Description>
          </Container>
        </Wrapper>
      ) : null}
    </>
  );
};

export default DetailInquiry;
