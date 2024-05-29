import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  padding-left: ${(props) => (props.$isXSmall ? "30px" : "40px")};
  padding-right: ${(props) => (props.$isMobile ? "30px" : 0)};
  padding-top: 120px;
  padding-bottom: ${(props) => (props.$isSmall ? "30px" : 0)};
  display: ${(props) => (props.$isMobile ? "flex" : "grid")};
  justify-content: center;
  grid-template-columns: ${(props) =>
      props.$isXSmall
        ? ""
        : props.$isSmall
        ? "minmax(200px, 1fr)"
        : "minmax(400px, 500px)"} 1.5fr 0.5fr;
  grid-template-rows: 1fr ${(props) => (props.$isXSmall ? "200px" : "")};
`;

export const Back = styled(Link)`
  font-size: 1.1rem;
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;

export const Detail = styled(motion.div)`
  display: ${(props) =>
    !props.$isMobile && props.$isXSmall ? "none" : "flex"};
  flex-direction: column;
  gap: 25px;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;
  position: relative;
`;

export const DetailResult = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 15px;
  position: relative;
`;

export const DetailImage = styled(motion.img)`
  border: 1px solid rgba(0, 0, 0, 0.08);
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 15px;
  cursor: ${(props) => (props.$isCompleted ? "pointer" : "default")};
`;

export const DetailDesc = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

export const DetailTitle = styled.h2`
  font-size: 1.7rem;
  line-height: 1.2;
  white-space: normal;
  word-break: break-all;
`;

export const DetailInfoes = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const DetailInfo = styled.span`
  font-size: 1rem;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.08);
`;

export const DetailType = styled.span`
  font-size: 1.2rem;
  padding: 5px 10px;
  border-radius: 8px;
  position: absolute;
  right: 10px;
  background-color: ${(props) => (props.$isPro ? "#ff7675" : "#0984e3")};
  color: white;
`;

export const DetailMetaData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DetailData = styled.span`
  font-size: 1.1rem;
  width: 100%;
  color: rgba(0, 0, 0, 0.25);
  font-weight: bold;
`;

export const DetailDescription = styled.p`
  font-size: 1.03rem;
  color: rgba(0, 0, 0, 0.75);
  line-height: 1.25;
  height: ${(props) => (props.$isSmall ? "125px" : "180px")};
  overflow-wrap: break-word;
  overflow-y: auto;
`;

export const Chat = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.01);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  max-height: ${(props) => (props.$isMobile ? "83vh" : "765px")};
  min-width: ${(props) => (props.$isMobile ? "100%" : "630px")};
  overflow: hidden;
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const MessageList = styled.ul`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: ${(props) =>
    !props.$isMobile && props.$isXSmall ? "445px" : ""};
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MessageForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  position: relative;
`;

export const MessageInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  min-width: 100px;
  font-size: 1.1rem;
  &:focus-within {
    outline: none;
    border-color: #0984e3;
  }
`;

export const MessageButton = styled(motion.button)`
  padding: 10px 15px;
  border-radius: 15px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  border: none;
  svg {
    font-size: 18px;
  }
`;

export const messageButtonVariants = {
  initial: {
    backgroundColor: "#0984e3",
  },
  hover: {
    backgroundColor: "#0097e6",
  },
};

export const Drafts = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  max-height: ${(props) =>
    props.$isMobile ? "700px" : props.$isXSmall ? "565px" : "765px"};
  min-width: 200px;
  width: 100%;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DraftTitle = styled.h2`
  box-sizing: border-box;
  top: -20px;
  width: 100%;
  font-size: 1.5rem;
  background-color: white;
  color: black;
  font-weight: bold;
  z-index: 1;
`;

export const Draft = styled(motion.li)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
  box-sizing: border-box;
  cursor: pointer;
`;

export const DraftImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
`;

export const DraftDesc = styled.p`
  font-size: 1.1rem;
  line-height: 1.25;
  font-size: 1.2rem;
`;

export const DownloadContainer = styled.label`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const Download = styled(FontAwesomeIcon)`
  border: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 1.5rem;
  background-color: white;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
`;

export const Notification = styled.p`
  text-align: center;
  font-size: 17px;
  color: rgba(0, 0, 0, 0.8);
`;

export const DraftList = styled.ul`
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

export const TooltipContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const Tooltip = styled(motion.div)`
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

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 3;
  cursor: pointer;
`;

export const ImageViewer = styled(motion.div)`
  position: fixed;
  max-height: 600px;
  height: 100%;
  max-width: 900px;
  min-width: 330px;
  width: 58vw;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 4;
  background-color: white;
  padding: 60px 25px;
  padding-top: 25px;
  box-sizing: border-box;
  border-radius: 15px;
  @media (max-width: 665px) {
    min-height: 50vh;
  }
`;

export const BigImage = styled.img`
  height: 90%;
  width: 100%;
  object-fit: cover;
  background-color: white;
  border-radius: 13px;
  border: 2px solid #1b9cfc;
`;

export const ImageButtons = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 15px;
  right: 25px;
  bottom: 12px;
  width: 100%;
`;

export const ImageDownload = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  color: white;
  gap: 15px;
  background-color: #0984e3;
  padding: 8px 13px;
  border-radius: 10px;
  cursor: pointer;
`;

export const DeleteImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  color: white;
  gap: 15px;
  background-color: #ea2027;
  padding: 8px 13px;
  border-radius: 10px;
  cursor: pointer;
`;

export const ImageDownloadIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
`;

export const tooltipVariants = {
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

export function parseISOString(string) {
  const strDate = string.substring(0, 10);
  const [y, m, d] = strDate.split("-");
  return `${y}년 ${+m}월 ${+d}일`;
}

export const DraftUploadButton = styled.label`
  position: absolute;
  right: 38px;
  bottom: 30px;
`;

export const UploadIcon = styled(FontAwesomeIcon)`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 8px;
  font-size: 2.2rem;
  background-color: white;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  word-break: break-all;
  width: 100%;
  text-align: start;
`;

export const ApplyManage = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 15px;
  width: 100%;
`;

export const DeleteApply = styled.div`
  padding: 8px 13px;
  font-weight: bold;
  background-color: #ea2027;
  border-radius: 10px;
  width: fit-content;
  color: white;
  cursor: pointer;
`;

export const MessageFile = styled.input`
  display: none;
`;

export const MessageUpload = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px;
  border-radius: 50%;
  border: 1px solid
    ${(props) => (props.$added ? "white" : "rgba(0, 0, 0, 0.2)")};
  background-color: ${(props) => (props.$added ? "#ea2027" : "white")};
  color: ${(props) => (props.$added ? "white" : "black")};
  cursor: pointer;
  transition: border 0.1s ease-in-out;
  &:hover {
    border: 1px solid ${(props) => (props.$added ? "white" : "#0097e6")};
  }
`;

export const MessageUploadIcon = styled(FontAwesomeIcon)`
  width: 27px;
  height: 27px;
`;

export const MessageImageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: -310px;
  height: 300px;
  width: fit-content;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 30px;
  padding-top: 15px;
  gap: 15px;
  border-radius: 15px;
  box-sizing: border-box;
  background-color: #efefef;
  @media (max-width: 665px) {
    height: 260px;
    top: -270px;
  }
`;

export const MessageImageTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

export const MessageImage = styled.div`
  border-radius: 15px;
  width: 200px;
  height: 100%;
  background-image: url(${(props) => props.$src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: 1px solid #0097e6;
  transition: 0.1s ease-in-out;
  opacity: 1;
  @media (max-width: 665px) {
    width: 150px;
  }
`;

export const ImageMessage = styled(motion.div)`
  background-image: url(${(props) => props.$src});
  background-position: center;
  background-size: cover;
  width: 400px;
  height: 200px;
  border-radius: 15px;
  cursor: pointer;
  @media (max-width: 665px) {
    width: 200px;
  }
`;
export const cutString = (text, index) => {
  if (text.length > index) {
    return `${text.slice(0, index)}...`;
  }
  return text;
};

export const messageImageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
  hover: {
    opacity: 0.8,
  },
};

export const MessageDate = styled.p`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  height: fit-content;
  margin: 6px 5px;
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
  writing-mode: ${(props) => (props.$small ? "vertical-rl" : "horizontal-tb")};
`;

export const MessageContent = styled.span`
  display: flex;
  flex-direction: column;
  word-break: break-all;
  line-height: 1.1;
  gap: 10px;
  max-width: 400px;
  font-size: 1.1rem;
  padding: 10px 15px;
  border-radius: 15px;
  width: fit-content;
  background-color: ${(props) =>
    !props.$isMe ? "rgba(0, 0, 0, 0.06)" : "#0984e3"};
  color: ${(props) => (!props.$isMe ? "black" : "white")};
  @media (max-width: 665px) {
    font-size: 1rem;
    max-width: 200px;
  }
`;

export const MessageContainer = styled(motion.div)`
  display: flex;
  align-items: end;
  &:hover p {
    opacity: 1;
  }
  &:hover button {
    width: 40px;
    padding: 0px 13px;
    opacity: 1;
    margin-left: 3px;
  }
`;

export const DeleteMessage = styled.button`
  border: none;
  background-color: #d63031;
  border-radius: 6px;
  height: 100%;
  width: 0;
  padding: 0;
  opacity: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  svg {
    font-size: 18px;
    color: white;
  }
`;

export const MessageUser = styled.div`
  position: relative;
`;

export const MessageAvatar = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

export const MessageUsername = styled.span`
  font-size: 14px;
  position: absolute;
  top: 0;
  margin-left: 10px;
  width: max-content;
  direction: rtl;
  text-align: left;
`;

export const BottomBar = styled.section`
  grid-column: span 2;
  display: ${(props) =>
    !props.$isMobile && props.$isXSmall ? "flex" : "none"};
  gap: 20px;
  padding: 15px 0;
  max-height: 100%;
`;

export const BottomBarImage = styled(motion.img)`
  object-fit: cover;
  object-position: center;
  height: 100%;
  width: 300px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: ${(props) => (props.$isCompleted ? "pointer" : "default")};
`;

export const BottomBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

export const BottomBarTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  word-break: break-all;
`;

export const BottomBarDescription = styled.p`
  line-height: 1.2;
  font-size: 16px;
  word-break: break-all;
  padding-right: 10px;
  box-sizing: border-box;
  overflow-y: auto;
`;

export const BottomBarImageContainer = styled.div`
  position: relative;
`;

export const DetailTags = styled.div`
  display: flex;
  gap: 10px;
  position: relative;
  width: 100%;
`;

export const BottomBarPlan = styled.div`
  padding: 8px 10px;
  border-radius: 8px;
  color: white;
  background-color: ${(props) => (props.$isPro ? "#ff7675" : "#0984e3")};
  font-size: 16px;
  position: absolute;
  right: 15px;
`;

export const BottomContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 250px;
  gap: 10px;
  max-height: 84px;
`;

export const BottomBarManage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
  padding-right: 15px;
  box-sizing: border-box;
  height: fit-content;
`;

export const BottomBarDetail = styled.span`
  color: rgba(0, 0, 0, 0.4);
  font-weight: bold;
  font-size: 16px;
`;

export const TopBar = styled.div`
  display: ${(props) => (props.$isMobile ? "flex" : "block")};
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  position: absolute;
  left: 0;
  padding: 0 ${(props) => (props.$isMobile ? "33px" : "73px")};
  top: ${(props) => (props.$isMobile ? "77px" : "95px")};
  width: 100%;
  box-sizing: border-box;
`;

export const Switch = styled.button`
  padding: 5px 8px;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background-color: #3498ff;
  color: white;
  cursor: pointer;
  display: ${(props) => (props.$isMobile ? "block" : "none")};
`;

export const screenVariants = {
  entry: (back) => ({
    x: back ? -500 : 500,
    opacity: 0,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
    },
  },
  exit: (back) => ({
    x: back ? 500 : -500,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  }),
};
