import { Helmet } from "react-helmet";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 200vh;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const ContainerTitle = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  span {
    background: linear-gradient(to right top, #55efc4, #00b894);
    color: transparent;
    background-clip: text;
  }
`;

const ContainerSubtitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 900;
  line-height: 25px;
  color: rgba(0, 0, 0, 0.6);
`;

const ContainerStartButton = styled.button`
  padding: 8px 18px;
  background-color: #0984e3;
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
`;

const Home = () => {
  return (
    <>
      <Helmet>
        <title>홈 | ArtifyThumbs</title>
      </Helmet>
      <Wrapper>
        <Container>
          <ContainerTitle>
            쉽고, <span>완벽한.</span>
          </ContainerTitle>
          <ContainerSubtitle>
            ArtifyThumbs에서 쉽고 빠르게 좋은 그림을 받아보세요.
          </ContainerSubtitle>
          <ContainerStartButton>시작하기</ContainerStartButton>
        </Container>
      </Wrapper>
    </>
  );
};

export default Home;
