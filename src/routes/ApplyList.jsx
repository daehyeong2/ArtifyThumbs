import { motion } from "framer-motion";
import styled from "styled-components";
import Seo from "../components/Seo";
import TopButton from "../components/TopButton";

const Container = styled.div`
  height: 100vh;
  box-sizing: border-box;
  padding-top: 140px;
`;

const List = styled.ul`
  display: grid;
  padding: 0 100px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(340px, 1fr));
  gap: 30px;
`;

const Apply = styled(motion.li)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 15px;
  height: 300px;
  border: 1px solid rgba(0, 0, 0, 0.3);
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
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const ApplyType = styled.span`
  font-size: 1.1rem;
  padding: 5px;
  background-color: ${(props) => (props.$isPro ? "#ff7675" : "#0984e3")};
  color: white;
  border-radius: 5px;
  position: absolute;
  right: 12px;
  bottom: 12px;
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
  left: 15px;
  bottom: 15px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
`;

const applyVariants = {
  initial: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.03,
    y: -10,
    height: "330px",
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
        <TopButton />
        <List>
          <Apply variants={applyVariants} initial="initial" whileHover="hover">
            <ApplyResult>
              <img
                src="https://cdn.discordapp.com/attachments/1206468979779174464/1215248645272764436/a014f81ec5c4ff4a.png?ex=65fc0f7f&is=65e99a7f&hm=38f64bae5caf9170ddb6f5a8ce6129f60117fcdd9ca28e785220887d59f898c6&"
                alt="ApplyImage"
              ></img>
            </ApplyResult>
            <ApplyDesc>
              <ApplyTitle>발로란트 매드무비</ApplyTitle>
              <ApplyInfoes>
                <ApplyInfo>1장</ApplyInfo>
                <ApplyInfo>썸네일</ApplyInfo>
              </ApplyInfoes>
            </ApplyDesc>
            <ApplyType $isPro={true}>프로</ApplyType>
            <ApplyDate
              transition={{ duration: 0.15 }}
              variants={applyDateVariants}
            >
              신청 날짜: 2024년 3월 9일
            </ApplyDate>
          </Apply>
          <Apply variants={applyVariants} initial="initial" whileHover="hover">
            <ApplyResult>
              <img
                src="https://cdn.discordapp.com/attachments/1137256407784230943/1215854411612426343/e4e9aba3730626ba.png?ex=65fe43a9&is=65ebcea9&hm=268fa49dc0dc2ef79ecb2a7ac3c7a58fac07a9382ee8ada0749b7bc8fc07dada&"
                alt="ApplyImage"
              />
            </ApplyResult>
            <ApplyDesc>
              <ApplyTitle>발로란트 제트 에이스</ApplyTitle>
              <ApplyInfoes>
                <ApplyInfo>1장</ApplyInfo>
                <ApplyInfo>썸네일</ApplyInfo>
              </ApplyInfoes>
            </ApplyDesc>
            <ApplyType>기본</ApplyType>
            <ApplyDate
              transition={{ duration: 0.15 }}
              variants={applyDateVariants}
            >
              신청 날짜: 2024년 3월 5일
            </ApplyDate>
          </Apply>
        </List>
      </Container>
    </>
  );
};

export default ApplyList;
