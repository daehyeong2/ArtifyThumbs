import styled from "styled-components";
import Seo from "../components/Seo";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  height: 100vh;
  box-sizing: border-box;
  padding-top: 140px;
  display: grid;
  grid-template-columns: minmax(500px, 1fr) 1.5fr 0.5fr;
`;

const Back = styled(Link)`
  position: absolute;
  top: 108px;
  left: 100px;
  font-size: 1.1rem;
  text-decoration: none;
  color: black;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  box-sizing: border-box;
  padding: 0 100px;
  position: relative;
`;

const DetailResult = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
  }
`;

const DetailDesc = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const DetailTitle = styled.h2`
  font-size: 2rem;
`;

const DetailInfoes = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const DetailInfo = styled.span`
  font-size: 1rem;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.08);
`;

const DetailType = styled.span`
  font-size: 1.2rem;
  padding: 5px 10px;
  border-radius: 8px;
  position: absolute;
  right: 10px;

  background-color: ${(props) => (props.$isPro ? "#ff7675" : "#0984e3")};
  color: white;
`;

const DetailDate = styled.span`
  font-size: 1.1rem;
  width: 100%;
  color: rgba(0, 0, 0, 0.25);
  font-weight: bold;
  margin-top: 20px;
`;

const DetailDescription = styled.p`
  font-size: 1.03rem;
  color: rgba(0, 0, 0, 0.75);
  line-height: 1.25;
`;

const Chat = styled.div`
  background-color: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  height: 95%;
  padding-bottom: 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
`;

const MessageList = styled.ul`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 20px;
`;

const Message = styled.li`
  display: flex;
  justify-content: ${(props) => (props.$isMe ? "flex-end" : "flex-start")};
  span {
    font-size: 1.1rem;
    padding: 10px 15px;
    border-radius: 15px;
    width: fit-content;
    background-color: ${(props) =>
      props.$isMe ? "#0984e3" : "rgba(0, 0, 0, 0.1)"};
    color: ${(props) => (props.$isMe ? "white" : "black")};
  }
`;

const MessageForm = styled.form`
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 1.1rem;
`;

const MessageButton = styled(motion.button)`
  padding: 10px 15px;
  border-radius: 15px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border: none;
`;

const messageButtonVariants = {
  initial: {
    backgroundColor: "#0984e3",
  },
  hover: {
    backgroundColor: "#0097e6",
  },
};

const Drafts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  height: 95%;
  overflow-y: auto;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const DraftTitle = styled.h2`
  position: sticky;
  box-sizing: border-box;
  top: -20px;
  width: 100%;
  padding: 10px 0;
  font-size: 1.5rem;
  background-color: white;
  color: black;
  font-weight: bold;
  z-index: 1;
`;

const Draft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;
`;

const DraftImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
`;

const DraftDesc = styled.p`
  font-size: 1.1rem;
  line-height: 1.25;
  font-size: 1.2rem;
`;

const DetailApply = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <Seo title="제목" />
      <Wrapper>
        <Back to="/apply-list">&larr; 뒤로가기</Back>
        <Detail>
          <DetailResult>
            <img
              src="https://cdn.discordapp.com/attachments/1206468979779174464/1215248645272764436/a014f81ec5c4ff4a.png?ex=65fc0f7f&is=65e99a7f&hm=38f64bae5caf9170ddb6f5a8ce6129f60117fcdd9ca28e785220887d59f898c6&"
              alt="ApplyImage"
            ></img>
          </DetailResult>
          <DetailDesc>
            <DetailTitle>발로란트 매드무비</DetailTitle>
            <DetailInfoes>
              <DetailInfo>1장</DetailInfo>
              <DetailInfo>썸네일</DetailInfo>
              <DetailType $isPro={true}>프로</DetailType>
            </DetailInfoes>
            <DetailDescription>
              ArtifyThumbs라는 글자를 화면 정중앙에 넣어주시고 챔피언스 밴달을
              들고 있는 것을 강조해주세요.
            </DetailDescription>
          </DetailDesc>
          <DetailDate>신청 날짜: 2024년 3월 9일</DetailDate>
        </Detail>
        <Chat>
          <MessageList>
            <Message $isMe={true}>
              <span>안녕하세요</span>
            </Message>
            <Message $isMe={false}>
              <span>안녕하세요 무슨 일이죠?</span>
            </Message>
            <Message $isMe={true}>
              <span>안녕하세요</span>
            </Message>
            <Message $isMe={true}>
              <span>안녕하세요</span>
            </Message>
            <Message $isMe={true}>
              <span>안녕하세요</span>
            </Message>
            <Message $isMe={true}>
              <span>안녕하세요</span>
            </Message>
            <Message $isMe={true}>
              <span>안녕하세요</span>
            </Message>
            <Message $isMe={true}>
              <span>안녕하세요</span>
            </Message>
            <Message $isMe={true}>
              <span>안녕하세요</span>
            </Message>
            <Message $isMe={true}>
              <span>안녕하세요</span>
            </Message>
            <Message $isMe={true}>
              <span>안녕하세요</span>
            </Message>
            <Message $isMe={true}>
              <span>안녕하세요</span>
            </Message>
            <Message $isMe={true}>
              <span>안녕하세요</span>
            </Message>
            <Message $isMe={true}>
              <span>안녕하세요</span>
            </Message>
          </MessageList>
          <MessageForm onSubmit={handleSubmit(onSubmit)}>
            <MessageInput
              {...register("message", { required: true })}
              type="text"
              placeholder="메시지를 입력하세요"
            />
            <MessageButton
              variants={messageButtonVariants}
              initial="initial"
              whileHover="hover"
              transition={{ duration: 0.05 }}
            >
              보내기
            </MessageButton>
          </MessageForm>
        </Chat>
        <Drafts>
          <DraftTitle>올린 시안 (3/5)</DraftTitle>
          <Draft>
            <DraftImage
              src="https://i.ytimg.com/vi/6eLGnF2te14/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLChES_ydzSlxbthBRr31PJgqUjYJQ"
              alt="draftImage"
            />
            <DraftDesc>전체적인 느낌입니다.</DraftDesc>
          </Draft>
          <Draft>
            <DraftImage
              src="https://i.ytimg.com/vi/Yg67c29njo8/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA8gsCkqO8kaVbHzOXB8sk-imFXOw"
              alt="draftImage"
            />
            <DraftDesc>이런 것도 나쁘진 않습니다.</DraftDesc>
          </Draft>
          <Draft>
            <DraftImage
              src="https://i.ytimg.com/vi/3msjZ7jGpLg/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD6XJ4Z7Di7APHcfTVZ6Iy8_JM6_Q"
              alt="draftImage"
            />
            <DraftDesc>이런 느낌이 좋습니다.</DraftDesc>
          </Draft>
        </Drafts>
      </Wrapper>
    </>
  );
};

export default DetailApply;
