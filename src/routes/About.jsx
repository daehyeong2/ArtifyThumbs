import styled from "styled-components";
import Seo from "../components/Seo";
import TopButton from "../components/TopButton";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-top: 140px;
  gap: 80px;
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContainerTitle = styled.h1`
  width: 100%;
  font-size: 4rem;
  font-weight: 900;
  display: flex;
  justify-content: center;
  gap: 10px;
  span {
    background: linear-gradient(to right top, #6c5ce7, #74b9ff);
    color: transparent;
    background-clip: text;
  }
`;

const ContainerSubtitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 900;
  line-height: 25px;
`;

const Introduction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InfoTitle = styled.h1`
  font-weight: bold;
  font-size: 2rem;
`;

const InfoContent = styled.p`
  font-weight: 700px;
  font-size: 1.1rem;
`;

const About = () => {
  return (
    <>
      <TopButton />
      <Seo title="소개" />
      <Container>
        <TopBar>
          <ContainerTitle>
            <span>ArtifyThumbs</span>에 대해
          </ContainerTitle>
          <ContainerSubtitle>
            ArtifyThumbs는 이미지를 신청하고 좋은 퀄리티의 이미지를 빠르게 받을
            수 있는 서비스입니다.
          </ContainerSubtitle>
        </TopBar>
        <Introduction>
          <Info>
            <InfoTitle>무엇을 할 수 있나요?</InfoTitle>
            <InfoContent>
              ArtifyThumbs에서는 싼 가격에 원하는 사진을 신청하고 금방 받아볼 수
              있어요.
            </InfoContent>
          </Info>
          <Info>
            <InfoTitle>
              AritfyThumbs를 이용해야 하는 이유는 무엇인가요?
            </InfoTitle>
            <InfoContent>
              저희는 가격이 저렴하고 신청도 간편해요! 그리고 좋은 퀄리티의
              사진을 빠르게 받아볼 수 있죠.
            </InfoContent>
          </Info>
          <Info>
            <InfoTitle>어떻게 이용하나요?</InfoTitle>
            <InfoContent>
              ArtifyThumbs에 가입하고 원하는 사진을 신청하면 됩니다. 신청 할
              때는 간단한 시안이 필요해요!
            </InfoContent>
          </Info>
        </Introduction>
      </Container>
    </>
  );
};

export default About;
