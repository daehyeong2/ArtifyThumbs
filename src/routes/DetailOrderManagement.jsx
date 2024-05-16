import Seo from "../components/Seo";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import {
  faDownload,
  faPlus,
  faUpload,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  ApplyManage,
  Back,
  BigImage,
  Chat,
  DeleteApply,
  DeleteImage,
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
  DraftList,
  DraftTitle,
  Drafts,
  ImageButtons,
  ImageDownload,
  ImageDownloadIcon,
  ImageViewer,
  MessageButton,
  MessageFile,
  MessageForm,
  MessageImage,
  MessageImageContainer,
  MessageImageTitle,
  MessageInput,
  MessageList,
  MessageUpload,
  MessageUploadIcon,
  Notification,
  Overlay,
  Title,
  Tooltip,
  TooltipContainer,
  Wrapper,
  cutString,
  messageButtonVariants,
  messageImageVariants,
  parseISOString,
  tooltipVariants,
} from "../components/detailApply";
import {
  collection,
  deleteDoc,
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
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import ChatLazyImage from "../components/ChatLazyImage";
import DraftLazyImage from "../components/DraftLazyImage";

const Message = styled.li`
  display: flex;
  justify-content: ${(props) => (props.$isMe ? "flex-start" : "flex-end")};
  span {
    display: flex;
    flex-direction: column;
    word-break: break-all;
    line-height: 1.1;
    gap: 10px;
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
  const [openDraft, setOpenDraft] = useState(false);
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
  const [deleteIsLoading, setDeleteLoading] = useState(false);
  const [applyDeleteIsLoading, setApplyDeleteLoading] = useState(false);
  const [chatFile, setChatFile] = useState(null);
  const [file, setFile] = useState("");
  const [openChat, setOpenChat] = useState(null);

  const onSubmit = (data) => {
    if (!data.message) return;
    setValue("message", "");
    setFocus("message");
    if (!user || !userData.isAdmin) {
      alert("권한 없음");
      return navigate("/");
    }
    socket.emit(
      "chat_message",
      { message: data.message, isMe: false, imageUrl: chatFile?.imageUrl },
      orderId
    );
    paint_message(data.message, false, chatFile?.imageUrl);
  };

  const paint_message = useCallback(
    (message, isMe, imageUrl) => {
      setChats((prev) => [...prev, { message, isMe, imageUrl }]);
      const ulElement = ulRef.current;
      setFile("");
      setChatFile(null);
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
  const onDownload = async () => {
    try {
      const response = await fetch(currentImage);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      if (openChat) {
        link.download = `${openChat} (ArtifyThumbs 채팅사진).jpg`;
      } else {
        link.download = `${openDraft} (ArtifyThumbs 참고사진).jpg`;
      }
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  const onDelete = async () => {
    if (!user || !userData.isAdmin) return;
    try {
      setDeleteLoading(true);
      const locationRef = ref(storage, `results/${orderId}`);
      await deleteObject(locationRef);
      const docRef = doc(db, `orders/${orderId}`);
      await updateDoc(docRef, {
        isCompleted: false,
        result: "/img/preparing.jpeg",
      });
    } catch (e) {
      console.error(e);
    } finally {
      setDeleteLoading(false);
      setCurrentImage(null);
      setImageUrl("/img/preparing.jpeg");
    }
  };
  const onCancel = async () => {
    if (applyDeleteIsLoading || !user || !userData.isAdmin) return;
    try {
      const ok = window.confirm(
        "신청을 삭제하시겠습니까? (삭제하시면 복구하실 수 없습니다.)"
      );
      if (ok) {
        setApplyDeleteLoading(true);
        const draftsRef = ref(storage, `drafts/${orderId}/`);
        const drafts = await listAll(draftsRef);
        drafts.items.forEach(async (itemRef) => {
          await deleteObject(itemRef);
        });
        const chatsRef = ref(storage, `chats/${orderId}/`);
        const chats = await listAll(chatsRef);
        chats.items.forEach(async (itemRef) => {
          await deleteObject(itemRef);
        });
        if (apply.isCompleted) {
          const resultRef = ref(storage, `results/${orderId}`);
          await deleteObject(resultRef);
        }
        const docRef = doc(db, `orders/${orderId}`);
        await deleteDoc(docRef);
        navigate("/order-management");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setApplyDeleteLoading(false);
    }
  };
  const onUpload = async (e) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      const file = files[0];
      try {
        const locationRef = ref(storage, `chats/${orderId}/${Date.now()}`);
        const result = await uploadBytes(locationRef, file);
        const resultUrl = await getDownloadURL(result.ref);
        setChatFile({
          ref: locationRef,
          imageUrl: resultUrl,
        });
      } catch (e) {
        console.error(e);
      }
    }
  };
  const onDeleteImage = useCallback(async () => {
    if (chatFile) {
      await deleteObject(chatFile.ref);
      setFile("");
      return setChatFile(null);
    }
  }, [chatFile]);
  useEffect(() => {
    const deleteFunction = () => {
      onDeleteImage();
    };
    if (chatFile) {
      window.addEventListener("beforeunload", deleteFunction);
    }
    return () => {
      window.removeEventListener("beforeunload", deleteFunction);
    };
  }, [onDeleteImage, chatFile]);
  return (
    <>
      <Seo title={apply?.title ? apply.title : "로딩 중.."} />
      <AnimatePresence>
        {currentImage && (
          <>
            <Overlay
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setOpenDraft(false);
                setOpenChat(false);
                setCurrentImage(null);
              }}
            />
            <ImageViewer layoutId={currentImage}>
              <BigImage src={currentImage} alt="bigImage" />
              <Title>
                {openDraft
                  ? `설명: ${cutString(openDraft, 20)}`
                  : openChat
                  ? `채팅: ${cutString(openChat, 20)}`
                  : `제목: ${cutString(apply.title, 20)}`}
              </Title>
              <ImageButtons>
                {!openChat && !openDraft && (
                  <DeleteImage onClick={onDelete}>
                    <ImageDownloadIcon icon={faXmark} />
                    <span>
                      {deleteIsLoading ? "삭제하는 중.." : "삭제하기"}
                    </span>
                  </DeleteImage>
                )}
                <ImageDownload
                  onClick={openDraft || openChat ? onDownload : null}
                  htmlFor={openDraft || openChat ? "" : "bigUploadInput"}
                >
                  <ImageDownloadIcon
                    icon={openDraft || openChat ? faDownload : faUpload}
                  />
                  <span>
                    {openDraft || openChat
                      ? "다운로드"
                      : isLoading
                      ? "업로드 중.."
                      : "업로드"}
                  </span>
                  <FileInput
                    onChange={onChangeFile}
                    id="bigUploadInput"
                    type="file"
                    accept="image/*"
                  />
                </ImageDownload>
              </ImageButtons>
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
                  $isCompleted={
                    imageUrl && imageUrl !== "/img/preparing.jpeg"
                      ? true
                      : apply.isCompleted
                  }
                  onClick={
                    imageUrl && imageUrl !== "/img/preparing.jpeg"
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
              <ApplyManage>
                <DeleteApply onClick={onCancel}>
                  {applyDeleteIsLoading
                    ? "신청 삭제하는 중.."
                    : "신청 삭제하기"}
                </DeleteApply>
              </ApplyManage>
            </Detail>
            <Chat>
              <MessageList ref={ulRef}>
                {apply.chats.length > 0 || chats.length > 0 ? (
                  <>
                    {apply.chats.map((chat, index) => {
                      return (
                        <Message key={index} $isMe={chat.isMe}>
                          <span>
                            {chat.message}
                            {chat.imageUrl && (
                              <ChatLazyImage
                                onClick={() => {
                                  setOpenChat(chat.message);
                                  setCurrentImage(chat.imageUrl);
                                }}
                                src={chat.imageUrl}
                              />
                            )}
                          </span>
                        </Message>
                      );
                    })}
                    {chats.map((chat, index) => {
                      return (
                        <Message key={index} $isMe={chat.isMe}>
                          <span>
                            {chat.message}
                            {chat.imageUrl && (
                              <ChatLazyImage
                                onClick={() => {
                                  setOpenChat(chat.message);
                                  setCurrentImage(chat.imageUrl);
                                }}
                                src={chat.imageUrl}
                              />
                            )}
                          </span>
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
                <AnimatePresence>
                  {chatFile && (
                    <MessageImageContainer
                      variants={messageImageVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      exit="exit"
                    >
                      <MessageImageTitle>함께 전송할 사진</MessageImageTitle>
                      <MessageImage $src={chatFile.imageUrl} />
                    </MessageImageContainer>
                  )}
                </AnimatePresence>
                <MessageUpload
                  $added={Boolean(chatFile)}
                  onClick={chatFile ? onDeleteImage : null}
                  htmlFor={chatFile ? "" : "chatImage"}
                >
                  <MessageUploadIcon icon={chatFile ? faXmark : faPlus} />
                </MessageUpload>
                <MessageFile
                  value={file}
                  onChange={onUpload}
                  type="file"
                  accept="image/*"
                  id="chatImage"
                />
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
                {apply.drafts.map((draft, idx) => {
                  return (
                    <Draft
                      onClick={() => {
                        setOpenDraft(draft.title);
                        setCurrentImage(draft.imageUrl);
                      }}
                      layoutId={draft.imageUrl}
                      key={idx}
                    >
                      <DraftLazyImage src={draft.imageUrl} alt="draftImage" />
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
