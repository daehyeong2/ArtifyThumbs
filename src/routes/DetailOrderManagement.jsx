import Seo from "../components/Seo";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import {
  Back,
  BigImage,
  Chat,
  Detail,
  DetailData,
  DetailDesc,
  DetailDescription,
  DetailImage,
  DetailInfo,
  DetailInfoes,
  DetailMetaData,
  DetailResult,
  DetailTitle,
  DetailType,
  Download,
  DownloadContainer,
  Draft,
  DraftDesc,
  DraftImage,
  DraftList,
  DraftTitle,
  Drafts,
  ImageDownload,
  ImageDownloadIcon,
  ImageViewer,
  MessageButton,
  MessageForm,
  MessageInput,
  MessageList,
  Notification,
  Overlay,
  Tooltip,
  TooltipContainer,
  Wrapper,
  messageButtonVariants,
  parseISOString,
  tooltipVariants,
} from "../components/detailApply";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atom";
import styled from "styled-components";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Message = styled.li`
  display: flex;
  justify-content: ${(props) => (props.$isMe ? "flex-start" : "flex-end")};
  span {
    font-size: 1.1rem;
    padding: 10px 15px;
    border-radius: 15px;
    width: fit-content;
    background-color: ${(props) =>
      props.$isMe ? "rgba(0, 0, 0, 0.06)" : "#0984e3"};
    color: ${(props) => (props.$isMe ? "black" : "white")};
  }
`;

const FileInput = styled.input`
  display: none;
`;

let socket = null;

const DetailOrderManagement = () => {
  const user = auth.currentUser;
  const userData = useRecoilValue(userAtom);
  const ulRef = useRef(null);
  const { register, handleSubmit, setValue, setFocus } = useForm();
  const { orderId } = useParams();
  const [apply, setApply] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchOrder = useCallback(async () => {
    if (!user) return;
    const docRef = doc(db, "orders", orderId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (userData.isAdmin || data.orderer === user.uid) {
        const userQuery = query(
          collection(db, "users"),
          where("userId", "==", data.orderer),
          limit(1)
        );
        const userSnap = await getDocs(userQuery);
        if (userSnap.docs.length !== 0) {
          setApply({ ...data, orderer: userSnap.docs[0].data() });
        } else {
          alert("신청인 정보가 없습니다.");
          navigate("/");
        }
      } else {
        alert("권한 없음");
        navigate("/");
      }
    } else {
      alert("없는 주문입니다.");
      navigate("/");
    }
  }, [orderId, navigate, user, userData]);
  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);
  const [chats, setChats] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);

  const onSubmit = (data) => {
    setValue("message", "");
    setFocus("message");
    if (!user || !userData.isAdmin) {
      alert("권한 없음");
      return navigate("/");
    }
    socket.emit(
      "chat_message",
      { message: data.message, isMe: false },
      orderId
    );
    paint_message(data.message, false);
  };

  const paint_message = useCallback(
    (message, isMe) => {
      setChats((prev) => [...prev, { message, isMe }]);
      const ulElement = ulRef.current;
      setTimeout(() => {
        if (
          !isMe ||
          ulElement.scrollHeight -
            (ulElement.scrollTop + ulElement.clientHeight) <
            200
        ) {
          scrollDown();
        }
      }, 10);
    },
    [ulRef]
  );

  useEffect(() => {
    if (apply) {
      user.getIdToken().then((token) => {
        socket = io.connect(process.env.REACT_APP_BACKEND_URL, {
          query: { token },
        });
        socket.emit("chat_room", orderId);
        socket.on("chat_message", (data) => {
          paint_message(data.message, data.isMe);
        });
        socket.on("error", (error) => {
          alert(`에러 발생: ${error}`);
        });
        socket.on("chats", (data) => {
          console.log("recieve a data", data);
          setChats(data);
          setTimeout(() => {
            scrollDown();
          }, 10);
        });
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [apply, orderId, paint_message, user]);

  function scrollDown() {
    if (ulRef.current) {
      const ulElement = ulRef.current;
      ulElement.scrollTop = ulElement.scrollHeight + 59;
    }
  }
  useEffect(() => {
    if (apply) {
      scrollDown();
    }
  }, [apply]);
  const onChangeFile = async (e) => {
    const { files } = e.target;
    if (isLoading || !user || !userData.isAdmin) return;
    if (files && files.length === 1) {
      try {
        setLoading(true);
        const file = files[0];
        const locatoinRef = ref(storage, `results/${orderId}`);
        const result = await uploadBytes(locatoinRef, file);
        const resultUrl = await getDownloadURL(result.ref);
        setImageUrl(resultUrl);
        if (currentImage) {
          setCurrentImage(resultUrl);
        }
        const docRef = doc(db, "orders", orderId);
        await updateDoc(docRef, { result: resultUrl, isCompleted: true });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };
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
              <ImageDownload htmlFor="bigUploadInput">
                <ImageDownloadIcon icon={faUpload} />
                <span>{isLoading ? "업로드 중.." : "업로드"}</span>
                <FileInput
                  onChange={onChangeFile}
                  id="bigUploadInput"
                  type="file"
                  accept="image/*"
                />
              </ImageDownload>
            </ImageViewer>
          </>
        )}
      </AnimatePresence>
      <Wrapper>
        {apply ? (
          <>
            <Back to="/order-management">&larr; 뒤로가기</Back>
            <Detail>
              <DetailResult>
                <DetailImage
                  $isCompleted={imageUrl ? true : apply.isCompleted}
                  onClick={
                    imageUrl
                      ? () => setCurrentImage(imageUrl)
                      : apply.isCompleted
                      ? () => setCurrentImage(apply.result)
                      : null
                  }
                  key={imageUrl ?? apply.result}
                  layoutId={imageUrl ?? apply.result}
                  src={imageUrl ?? apply.result}
                  alt="ApplyImage"
                ></DetailImage>
                <DownloadContainer htmlFor="uploadInput">
                  <TooltipContainer initial="initial" whileHover="hover">
                    <Download icon={faUpload} />
                    <FileInput
                      onChange={onChangeFile}
                      id="uploadInput"
                      type="file"
                      accept="image/*"
                    />
                    <Tooltip
                      transition={{ duration: 0.2 }}
                      variants={tooltipVariants}
                    >
                      {isLoading ? "업로드 중.." : "업로드"}
                    </Tooltip>
                  </TooltipContainer>
                </DownloadContainer>
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
                받은 참고 사진 ({apply.drafts.length}/
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
            </Drafts>
          </>
        ) : (
          <></>
        )}
      </Wrapper>
    </>
  );
};

export default DetailOrderManagement;
