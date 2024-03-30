import styled from "styled-components";
import Seo from "../components/Seo";
import { Link } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 120px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  padding: 0 40px;
  font-weight: 700;
  margin-bottom: 60px;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 0 40px;
`;

const ApplyLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Apply = styled.li`
  overflow: hidden;
  height: 300px;
  display: grid;
  grid-template-rows: 1fr 0.2fr;
  border-radius: 10px;
  box-shadow: 3px 3px 7px 2px rgba(0, 0, 0, 0.15);
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
  }
`;

const ApplyImage = styled.img`
  width: 100%;
  height: 205px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

const ApplyDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const ApplyTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
`;

const ApplyInfoes = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ApplyStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Status = styled.span`
  color: ${(props) => (props.$isComplete ? "green" : "red")};
  font-weight: 700;
`;

const ApplyDate = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

const ApplyList = () => {
  return (
    <>
      <Seo title="신청 목록" />
      <Container>
        <Title>내 신청 목록</Title>
        <List>
          <ApplyLink to="/apply-list/1">
            <Apply>
              <ApplyImage src="https://cdn.discordapp.com/attachments/1206468979779174464/1215248645272764436/a014f81ec5c4ff4a.png?ex=660e847f&is=65fc0f7f&hm=5f2aff11249937830f001b959df0f885666a9b852917f0828d600f9c35fc4f70&" />
              <ApplyDesc>
                <ApplyTitle>발로란트 챔피언스 매드무비</ApplyTitle>
                <ApplyInfoes>
                  <ApplyStatus>
                    상태: <Status $isComplete={true}>완료됨</Status>
                  </ApplyStatus>
                  <ApplyDate>신청 날짜: 2024년 3월 16일</ApplyDate>
                </ApplyInfoes>
              </ApplyDesc>
            </Apply>
          </ApplyLink>
          <ApplyLink to="/apply-list/2">
            <Apply>
              <ApplyImage src="https://cdn.discordapp.com/attachments/1137256407784230943/1215854411612426343/e4e9aba3730626ba.png?ex=6619f329&is=66077e29&hm=8a2058348e10c22671c0235b248e7396aee951d61618ae8f3eeac3ff09666301&" />
              <ApplyDesc>
                <ApplyTitle>발로란트 제트 매드무비</ApplyTitle>
                <ApplyInfoes>
                  <ApplyStatus>
                    상태: <Status $isComplete={true}>완료됨</Status>
                  </ApplyStatus>
                  <ApplyDate>신청 날짜: 2024년 3월 15일</ApplyDate>
                </ApplyInfoes>
              </ApplyDesc>
            </Apply>
          </ApplyLink>
          <ApplyLink to="/apply-list/3">
            <Apply>
              <ApplyImage src="/img/preparing.jpeg" />
              <ApplyDesc>
                <ApplyTitle>발로란트 아이소 매드무비</ApplyTitle>
                <ApplyInfoes>
                  <ApplyStatus>
                    상태: <Status $isComplete={false}>준비 중</Status>
                  </ApplyStatus>
                  <ApplyDate>신청 날짜: 2024년 3월 13일</ApplyDate>
                </ApplyInfoes>
              </ApplyDesc>
            </Apply>
          </ApplyLink>
        </List>
      </Container>
    </>
  );
};

export default ApplyList;
