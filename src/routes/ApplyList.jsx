import { motion } from "framer-motion";
import styled from "styled-components";
import Seo from "../components/Seo";
import { Link } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 140px;
`;

const List = styled.ul`
  display: grid;
  padding: 0 100px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-auto-rows: minmax(400px, 1fr);
  gap: 30px;
`;

const ApplyLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Apply = styled(motion.li)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 15px;
  height: 90%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.01);
  position: relative;
  cursor: pointer;
`;

const ApplyResult = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ApplyTitle = styled.h2`
  font-size: 1.5rem;
`;

const ApplyInfoes = styled.div`
  display: flex;
  gap: 15px;
`;

const ApplyInfo = styled.span`
  font-size: 1rem;
  padding: 5px 7px;
  background-color: rgba(0, 0, 0, 0.07);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const ApplyType = styled.span`
  font-size: 1.1rem;
  padding: 5px 7px;
  background-color: ${(props) => (props.$isPro ? "#ff7675" : "#0984e3")};
  color: white;
  border-radius: 5px;
`;

const ApplyDesc = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 14px;
  flex: 1;
  gap: 20px;
  padding: 0 10px;
`;

const ApplyDate = styled(motion.span)`
  font-size: 0.9rem;
  position: absolute;
  left: 10px;
  bottom: 55px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
`;

const ApplyDescription = styled.p`
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.6);
  line-height: 1.2;
`;

const ApplyBottom = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  bottom: 12px;
  box-sizing: border-box;
  padding: 0 10px;
`;

const applyVariants = {
  initial: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.03,
    y: -10,
    height: "95%",
    transition: {
      duration: 0.2,
    },
  },
};

const applyDateVariants = {
  initial: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "linear",
    },
  },
};

const ApplyList = () => {
  return (
    <>
      <Seo title="신청 목록" />
      <Container>
        <List>
          <ApplyLink to="/apply-list/1">
            <Apply
              variants={applyVariants}
              initial="initial"
              whileHover="hover"
              transition={{ duration: 0.2 }}
            >
              <ApplyResult>
                <img
                  src="https://cdn.discordapp.com/attachments/1206468979779174464/1215248645272764436/a014f81ec5c4ff4a.png?ex=65fc0f7f&is=65e99a7f&hm=38f64bae5caf9170ddb6f5a8ce6129f60117fcdd9ca28e785220887d59f898c6&"
                  alt="ApplyImage"
                ></img>
              </ApplyResult>
              <ApplyDesc>
                <ApplyTitle>발로란트 매드무비</ApplyTitle>
                <ApplyDescription>
                  ArtifyThumbs라는 글자를 화면 정중앙에 넣어주시고 챔피언스
                  밴달을 들고 있는 것을 강조해주세요.
                </ApplyDescription>
              </ApplyDesc>
              <ApplyBottom>
                <ApplyInfoes>
                  <ApplyInfo>1장</ApplyInfo>
                  <ApplyInfo>썸네일</ApplyInfo>
                </ApplyInfoes>
                <ApplyType $isPro={true}>프로</ApplyType>
              </ApplyBottom>
              <ApplyDate
                transition={{ duration: 0.15 }}
                variants={applyDateVariants}
              >
                신청 날짜: 2024년 3월 9일
              </ApplyDate>
            </Apply>
          </ApplyLink>
          <ApplyLink to="/apply-list/1">
            <Apply
              variants={applyVariants}
              initial="initial"
              whileHover="hover"
              transition={{ duration: 0.2 }}
            >
              <ApplyResult>
                <img
                  src="https://cdn.discordapp.com/attachments/1206468979779174464/1215248645272764436/a014f81ec5c4ff4a.png?ex=65fc0f7f&is=65e99a7f&hm=38f64bae5caf9170ddb6f5a8ce6129f60117fcdd9ca28e785220887d59f898c6&"
                  alt="ApplyImage"
                ></img>
              </ApplyResult>
              <ApplyDesc>
                <ApplyTitle>발로란트 매드무비</ApplyTitle>
                <ApplyDescription>
                  ArtifyThumbs라는 글자를 화면 정중앙에 넣어주시고 챔피언스
                  밴달을 들고 있는 것을 강조해주세요.
                </ApplyDescription>
              </ApplyDesc>
              <ApplyBottom>
                <ApplyInfoes>
                  <ApplyInfo>1장</ApplyInfo>
                  <ApplyInfo>썸네일</ApplyInfo>
                </ApplyInfoes>
                <ApplyType $isPro={true}>프로</ApplyType>
              </ApplyBottom>
              <ApplyDate
                transition={{ duration: 0.15 }}
                variants={applyDateVariants}
              >
                신청 날짜: 2024년 3월 9일
              </ApplyDate>
            </Apply>
          </ApplyLink>
          <ApplyLink to="/apply-list/1">
            <Apply
              variants={applyVariants}
              initial="initial"
              whileHover="hover"
              transition={{ duration: 0.2 }}
            >
              <ApplyResult>
                <img
                  src="https://cdn.discordapp.com/attachments/1206468979779174464/1215248645272764436/a014f81ec5c4ff4a.png?ex=65fc0f7f&is=65e99a7f&hm=38f64bae5caf9170ddb6f5a8ce6129f60117fcdd9ca28e785220887d59f898c6&"
                  alt="ApplyImage"
                ></img>
              </ApplyResult>
              <ApplyDesc>
                <ApplyTitle>발로란트 매드무비</ApplyTitle>
                <ApplyDescription>
                  ArtifyThumbs라는 글자를 화면 정중앙에 넣어주시고 챔피언스
                  밴달을 들고 있는 것을 강조해주세요.
                </ApplyDescription>
              </ApplyDesc>
              <ApplyBottom>
                <ApplyInfoes>
                  <ApplyInfo>1장</ApplyInfo>
                  <ApplyInfo>썸네일</ApplyInfo>
                </ApplyInfoes>
                <ApplyType $isPro={true}>프로</ApplyType>
              </ApplyBottom>
              <ApplyDate
                transition={{ duration: 0.15 }}
                variants={applyDateVariants}
              >
                신청 날짜: 2024년 3월 9일
              </ApplyDate>
            </Apply>
          </ApplyLink>
          <ApplyLink to="/apply-list/1">
            <Apply
              variants={applyVariants}
              initial="initial"
              whileHover="hover"
              transition={{ duration: 0.2 }}
            >
              <ApplyResult>
                <img
                  src="https://cdn.discordapp.com/attachments/1206468979779174464/1215248645272764436/a014f81ec5c4ff4a.png?ex=65fc0f7f&is=65e99a7f&hm=38f64bae5caf9170ddb6f5a8ce6129f60117fcdd9ca28e785220887d59f898c6&"
                  alt="ApplyImage"
                ></img>
              </ApplyResult>
              <ApplyDesc>
                <ApplyTitle>발로란트 매드무비</ApplyTitle>
                <ApplyDescription>
                  ArtifyThumbs라는 글자를 화면 정중앙에 넣어주시고 챔피언스
                  밴달을 들고 있는 것을 강조해주세요.
                </ApplyDescription>
              </ApplyDesc>
              <ApplyBottom>
                <ApplyInfoes>
                  <ApplyInfo>1장</ApplyInfo>
                  <ApplyInfo>썸네일</ApplyInfo>
                </ApplyInfoes>
                <ApplyType $isPro={true}>프로</ApplyType>
              </ApplyBottom>
              <ApplyDate
                transition={{ duration: 0.15 }}
                variants={applyDateVariants}
              >
                신청 날짜: 2024년 3월 9일
              </ApplyDate>
            </Apply>
          </ApplyLink>
          <ApplyLink to="/apply-list/2">
            <Apply
              variants={applyVariants}
              initial="initial"
              whileHover="hover"
              transition={{ duration: 0.2 }}
            >
              <ApplyResult>
                <img
                  src="https://cdn.discordapp.com/attachments/1137256407784230943/1215854411612426343/e4e9aba3730626ba.png?ex=65fe43a9&is=65ebcea9&hm=268fa49dc0dc2ef79ecb2a7ac3c7a58fac07a9382ee8ada0749b7bc8fc07dada&"
                  alt="ApplyImage"
                />
              </ApplyResult>
              <ApplyDesc>
                <ApplyTitle>발로란트 제트 에이스</ApplyTitle>
                <ApplyDescription>
                  제트 궁을 킨 상태로 에이스 문구가 나오고 주변을 흐리게
                  처리해주세요.
                </ApplyDescription>
              </ApplyDesc>
              <ApplyBottom>
                <ApplyInfoes>
                  <ApplyInfo>1장</ApplyInfo>
                  <ApplyInfo>썸네일</ApplyInfo>
                </ApplyInfoes>

                <ApplyType>기본</ApplyType>
              </ApplyBottom>
              <ApplyDate
                transition={{ duration: 0.15 }}
                variants={applyDateVariants}
              >
                신청 날짜: 2024년 3월 5일
              </ApplyDate>
            </Apply>
          </ApplyLink>
        </List>
      </Container>
    </>
  );
};

export default ApplyList;
