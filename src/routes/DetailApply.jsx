import styled from "styled-components";
import Seo from "../components/Seo";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axiosInstance from "../axiosInstance";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../atom";
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  min-height: 100vh;
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
  &:hover {
    text-decoration: underline;
  }
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
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 15px;
  position: relative;
`;

const DetailImage = styled(motion.img)`
  border: 1px solid rgba(0, 0, 0, 0.08);
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  cursor: ${(props) => (props.$isCompleted ? "pointer" : "default")};
`;

const DetailDesc = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const DetailTitle = styled.h2`
  font-size: 1.7rem;
  line-height: 1.2;
  white-space: normal;
  word-break: break-all;
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

const DetailMetaData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DetailData = styled.span`
  font-size: 1.1rem;
  width: 100%;
  color: rgba(0, 0, 0, 0.25);
  font-weight: bold;
`;

const DetailDescription = styled.p`
  font-size: 1.03rem;
  color: rgba(0, 0, 0, 0.75);
  line-height: 1.25;
  height: 180px;
  overflow-wrap: break-word;
  overflow-y: auto;
`;

const Chat = styled.div`
  background-color: rgba(0, 0, 0, 0.01);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  height: 765px;
  overflow: hidden;
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const MessageList = styled.ul`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
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
      props.$isMe ? "#0984e3" : "rgba(0, 0, 0, 0.06)"};
    color: ${(props) => (props.$isMe ? "white" : "black")};
  }
`;

const MessageForm = styled.form`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 1.1rem;
  &:focus-within {
    outline: none;
    border-color: #0984e3;
  }
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
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  height: calc(100vh - 160px);
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const DraftTitle = styled.h2`
  box-sizing: border-box;
  top: -20px;
  width: 100%;
  font-size: 1.5rem;
  background-color: white;
  color: black;
  font-weight: bold;
  z-index: 1;
`;

const Draft = styled(motion.li)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
  box-sizing: border-box;
  cursor: pointer;
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

const DownloadContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const Download = styled.i`
  border: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 1.5rem;
  background-color: white;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
`;

const Notification = styled.p`
  text-align: center;
  font-size: 17px;
  color: rgba(0, 0, 0, 0.8);
`;

const DraftUploadButton = styled.div`
  position: absolute;
  right: 38px;
  bottom: 30px;
`;

const DraftList = styled.ul`
  display: flex;
  flex-direction: column;
  height: 95%;
  gap: 20px;
  overflow-y: auto;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const UploadIcon = styled(FontAwesomeIcon)`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 8px;
  font-size: 2.2rem;
  background-color: white;
  cursor: pointer;
`;

const TooltipContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  position: relative;
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  width: max-content;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 8px;
  z-index: 1;
  bottom: -35px;
  font-size: 16px;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 3;
  cursor: pointer;
`;

const ImageViewer = styled(motion.div)`
  position: fixed;
  height: 68vh;
  width: 58vw;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
  background-color: white;
  padding: 25px;
  padding-bottom: 60px;
  box-sizing: border-box;
  border-radius: 15px;
`;

const BigImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  background-color: white;
  border-radius: 13px;
  border: 2px solid #1b9cfc;
`;

const ImageDownload = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  color: white;
  gap: 15px;
  right: 25px;
  bottom: 12px;
  background-color: #0984e3;
  padding: 8px 13px;
  border-radius: 10px;
  cursor: pointer;
`;

const ImageDownloadIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
`;

const tooltipVariants = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
  hover: {
    opacity: 1,
  },
};

function parseISOString(string) {
  const strDate = string.substring(0, 10);
  const [y, m, d] = strDate.split("-");
  return `${y}년 ${+m}월 ${+d}일`;
}

let socket = null;

const DetailApply = () => {
  const ulRef = useRef(null);
  const { register, handleSubmit, setValue, setFocus } = useForm();
  const { applyId } = useParams();
  const [apply, setApply] = useState(null);
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance
      .post(`${process.env.REACT_APP_BACKEND_URL}/orders/get`, {
        id: applyId,
      })
      .then((data) => {
        setApply(data.data.order);
      });
  }, [applyId, setApply]);
  const [chats, setChats] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);

  const onSubmit = (data) => {
    setValue("message", "");
    setFocus("message");
    const token = localStorage.getItem("token");
    if (!token) {
      alert("권한 없음");
      navigate("/");
      setUser(null);
      return;
    }
    socket.emit(
      "chat_message",
      { message: data.message, isMe: true, jwt: token },
      applyId
    );
    paint_message(data.message, true);
  };

  const paint_message = useCallback(async (message, isMe) => {
    await setChats((prev) => [...prev, { message, isMe }]);
    if (isMe) {
      scrollDown();
    }
  }, []);

  useEffect(() => {
    if (apply) {
      socket = io.connect(process.env.REACT_APP_BACKEND_URL);
      socket.emit("chat_room", applyId);
      socket.on("chat_message", (data) => {
        paint_message(data.message, data.isMe);
      });
      socket.on("error", (error) => {
        alert(`에러 발생: ${error}`);
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [apply, applyId, paint_message]);

  function scrollDown() {
    if (ulRef.current) {
      const ulElement = ulRef.current;
      ulElement.scrollTop = ulElement.scrollHeight;
    }
  }
  useEffect(() => {
    if (apply) {
      scrollDown();
    }
  }, [apply]);
  return (
    <>
      <Seo title={apply?.title ? apply.title : "로딩 중.."} />
      <AnimatePresence>
        {currentImage && (
          <>
            <Overlay
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCurrentImage(null)}
            />
            <ImageViewer layoutId={currentImage}>
              <BigImage src={currentImage} alt="bigImage" />
              <ImageDownload>
                <ImageDownloadIcon icon={faDownload} />
                <span>다운로드</span>
              </ImageDownload>
            </ImageViewer>
          </>
        )}
      </AnimatePresence>
      <Wrapper>
        {apply ? (
          <>
            <Back to="/apply-list">&larr; 뒤로가기</Back>
            <Detail>
              <DetailResult>
                <DetailImage
                  $isCompleted={apply.isCompleted}
                  onClick={
                    apply.isCompleted
                      ? () => setCurrentImage(apply.result)
                      : null
                  }
                  layoutId={apply.result}
                  src={apply.result}
                  alt="ApplyImage"
                ></DetailImage>
                {apply.isCompleted && (
                  <DownloadContainer>
                    <TooltipContainer initial="initial" whileHover="hover">
                      <Download className="fa-solid fa-download" />
                      <Tooltip
                        transition={{ duration: 0.2 }}
                        variants={tooltipVariants}
                      >
                        다운로드
                      </Tooltip>
                    </TooltipContainer>
                  </DownloadContainer>
                )}
              </DetailResult>
              <DetailDesc>
                <DetailTitle>{apply.title}</DetailTitle>
                <DetailInfoes>
                  {apply.tags.map((tag) => {
                    return <DetailInfo key={tag}>{tag}</DetailInfo>;
                  })}
                  <DetailType $isPro={apply.plan === "pro"}>
                    {apply.plan === "pro" ? "프로" : "기본"}
                  </DetailType>
                </DetailInfoes>
                <DetailDescription>{apply.description}</DetailDescription>
              </DetailDesc>
              <DetailMetaData>
                <DetailData>
                  신청 날짜: {parseISOString(apply.applyedAt)}
                </DetailData>
                <DetailData>신청인: {apply.orderer.username}</DetailData>
              </DetailMetaData>
            </Detail>
            <Chat>
              <MessageList ref={ulRef}>
                {apply.chats.length > 0 || chats.length > 0 ? (
                  <>
                    {apply.chats.map((chat, index) => {
                      return (
                        <Message key={index} $isMe={chat.isMe}>
                          <span>{chat.message}</span>
                        </Message>
                      );
                    })}
                    {chats.map((chat, index) => {
                      return (
                        <Message key={index} $isMe={chat.isMe}>
                          <span>{chat.message}</span>
                        </Message>
                      );
                    })}
                  </>
                ) : (
                  <Notification>
                    🦄 멋진 결과를 위해 대화를 시작해보세요! 🦄
                  </Notification>
                )}
              </MessageList>
              <MessageForm onSubmit={handleSubmit(onSubmit)}>
                <MessageInput
                  {...register("message", { required: true })}
                  type="text"
                  autoComplete="off"
                  placeholder="메시지를 입력하세요."
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
              <DraftTitle>
                보낸 참고 사진 ({apply.drafts.length}/
                {apply.plan === "pro" ? "12" : "6"})
              </DraftTitle>
              <DraftList>
                {apply.drafts.map((draft) => {
                  return (
                    <Draft
                      onClick={() => setCurrentImage(draft.imageUrl)}
                      layoutId={draft.imageUrl}
                    >
                      <DraftImage src={draft.imageUrl} alt="draftImage" />
                      <DraftDesc>{draft.title}</DraftDesc>
                    </Draft>
                  );
                })}
              </DraftList>
              {(apply.plan === "pro" ? 12 : 6) > apply.drafts.length && (
                <DraftUploadButton>
                  <TooltipContainer initial="initial" whileHover="hover">
                    <UploadIcon icon={faUpload} />
                    <Tooltip
                      variants={tooltipVariants}
                      transition={{ duration: 0.2 }}
                    >
                      업로드
                    </Tooltip>
                  </TooltipContainer>
                </DraftUploadButton>
              )}
            </Drafts>
          </>
        ) : (
          <></>
        )}
      </Wrapper>
    </>
  );
};

export default DetailApply;
