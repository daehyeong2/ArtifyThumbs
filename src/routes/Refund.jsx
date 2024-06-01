import styled from "styled-components";
import Seo from "../components/Seo";

const Wrapper = styled.div`
  min-height: 100vh;
  padding-top: 120px;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
`;

const Refund = () => {
  return (
    <Wrapper>
      <Seo
        title="취소 및 환불정책"
        description="ArtifyThumbs의 취소 및 환불정책을 확인하세요."
      />
      <Container>
        <Title>취소 및 환불정책</Title>
      </Container>
    </Wrapper>
  );
};

export default Refund;
