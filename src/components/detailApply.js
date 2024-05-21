import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 140px;
  display: grid;
  grid-template-columns: minmax(500px, 1fr) 1.5fr 0.5fr;
`;

export const Back = styled(Link)`
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

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  box-sizing: border-box;
  padding: 0 100px;
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
  height: 180px;
  overflow-wrap: break-word;
  overflow-y: auto;
`;

export const Chat = styled.div`
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

export const MessageList = styled.ul`
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
  transition: background-color 0.2s;
  border: none;
`;

export const messageButtonVariants = {
  initial: {
    backgroundColor: "#0984e3",
  },
  hover: {
    backgroundColor: "#0097e6",
  },
};

export const Drafts = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  height: 765px;
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
  height: 70vh;
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
  padding: 60px 25px;
  box-sizing: border-box;
  border-radius: 15px;
`;

export const BigImage = styled.img`
  height: 100%;
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
  position: absolute;
  left: 30px;
  top: 15px;
  font-size: 28px;
  font-weight: bold;
`;

export const ApplyManage = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 15px;
  width: 100%;
`;

export const DeleteApply = styled.div`
  padding: 8px 13px;
  font-weight: bold;
  background-color: #ea2027;
  border-radius: 10px;
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
`;

export const ImageMessage = styled(motion.div)`
  background-image: url(${(props) => props.$src});
  background-position: center;
  background-size: cover;
  width: 400px;
  height: 200px;
  border-radius: 15px;
  cursor: pointer;
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
