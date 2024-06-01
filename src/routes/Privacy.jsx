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

const Privacy = () => {
  return (
    <Wrapper>
      <Seo
        title="개인정보 처리 방침"
        description="ArtifyThumbs의 개인정보 처리 방침을 확인하세요."
      />
      <Container>
        <Title>개인정보 처리방침</Title>
      </Container>
    </Wrapper>
  );
};

export default Privacy;
