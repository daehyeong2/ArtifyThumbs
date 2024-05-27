import Seo from "../components/Seo";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import {
  faDownload,
  faPlus,
  faTrashCan,
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
  DeleteMessage,
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
  MessageAvatar,
  MessageButton,
  MessageContainer,
  MessageContent,
  MessageDate,
  MessageFile,
  MessageForm,
  MessageImage,
  MessageImageContainer,
  MessageImageTitle,
  MessageInput,
  MessageList,
  MessageUpload,
  MessageUploadIcon,
  MessageUser,
  MessageUsername,
  Notification,
  Overlay,
  Switch,
  Title,
  Tooltip,
  TooltipContainer,
  TopBar,
  Wrapper,
  cutString,
  messageButtonVariants,
  messageImageVariants,
  parseISOString,
  screenVariants,
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
import { isMobileAtom, userAtom, widthAtom } from "../atom";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";

const Message = styled.li`
  display: flex;
  gap: 8px;
  justify-content: ${(props) => (props.$isMe ? "flex-start" : "flex-end")};
  ${MessageContent} {
    margin-top: ${(props) =>
      !props.$removeAvatar ? (!props.$isMe ? "0" : "20px") : "0"};
    margin-left: ${(props) => (props.$removeAvatar ? "48px" : "0")};
  }
`;

const FileInput = styled.input`
  display: none;
`;

let socket = null;

const DetailOrderManagement = () => {
  const user = auth.currentUser;
  const userData = useRecoilValue(userAtom);
  const [orderer, setOrderer] = useState(null);
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
          const applyData = { ...data, orderer: userSnap.docs[0].data() };
          const userQuery = query(
            collection(db, "users"),
            where("userId", "==", applyData.orderer.userId)
          );
          const user = (await getDocs(userQuery)).docs[0].data();
          setOrderer(user);
          setApply(applyData);
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

  const threeMB = 1024 * 1024 * 3;

  const onSubmit = (data) => {
    if (!data.message) return;
    setValue("message", "");
    setFocus("message");
    if (!user || !userData.isAdmin) {
      alert("권한 없음");
      return navigate("/");
    }
    const now = new Date().toISOString();
    window.removeEventListener("beforeunload", async () => {
      if (chatFile) {
        await deleteObject(chatFile.ref);
      }
    });
    socket.emit(
      "chat_message",
      {
        message: data.message,
        isMe: false,
        imageUrl: chatFile?.imageUrl ?? "",
        timestamp: now,
      },
      orderId
    );
    paint_message(data.message, false, chatFile?.imageUrl ?? "", now);
  };

  const paint_message = useCallback(
    (message, isMe, imageUrl, timestamp) => {
      setChats((prev) => [...prev, { message, isMe, imageUrl, timestamp }]);
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
          paint_message(data.message, data.isMe, data.imageUrl, data.timestamp);
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
        socket.on("delete_message", async (chat) => {
          setChats((prevChats) => {
            console.log(prevChats, chat);
            if (prevChats.some((item) => _.isEqual(item, chat))) {
              return prevChats.filter((item) => !_.isEqual(item, chat));
            } else {
              setApply((prevApply) => ({
                ...prevApply,
                chats: prevApply.chats.filter((item) => !_.isEqual(item, chat)),
              }));
              return prevChats;
            }
          });
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

        if (file.size > threeMB)
          return alert("파일은 3MB 이하만 업로드 가능합니다.");

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

      if (file.size > threeMB)
        return alert("파일은 3MB 이하만 업로드 가능합니다.");

      try {
        const locationRef = ref(storage, `chats/${orderId}/${Date.now()}`);
        const result = await uploadBytes(locationRef, file);
        const resultUrl = await getDownloadURL(result.ref);
        window.addEventListener("beforeunload", async () => {
          if (chatFile) {
            await deleteObject(locationRef);
          }
        });
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
  const onDeleteMessage = async (chat) => {
    if (!window.confirm("이 메시지를 정말로 삭제하시겠습니까?")) return;
    socket.emit("delete_message", chat);
    if (chats.includes(chat)) {
      setChats((prev) => prev.filter((item) => item !== chat));
      if (typeof chat.imageUrl === "string" && chat.imageUrl !== "") {
        try {
          const baseUrl =
            "https://firebasestorage.googleapis.com/v0/b/artifythumbs-37528.appspot.com/o/";
          const path = chat.imageUrl.replace(baseUrl, "").split("?")[0];
          const decodedPath = decodeURIComponent(path);
          const imageRef = ref(storage, decodedPath);
          await deleteObject(imageRef);
        } catch (e) {
          console.error(e);
        }
      }
    } else if (apply.chats.includes(chat)) {
      setApply((prev) => ({
        ...prev,
        chats: prev.chats.filter((item) => item !== chat),
      }));
      if (typeof chat.imageUrl === "string" && chat.imageUrl !== "") {
        try {
          const baseUrl =
            "https://firebasestorage.googleapis.com/v0/b/artifythumbs-37528.appspot.com/o/";
          const path = chat.imageUrl.replace(baseUrl, "").split("?")[0];
          const decodedPath = decodeURIComponent(path);
          const imageRef = ref(storage, decodedPath);
          await deleteObject(imageRef);
        } catch (e) {
          console.error(e);
        }
      }
    }
  };
  const [screen, setScreen] = useState("chat");
  const [isBack, setIsBack] = useState(false);
  const width = useRecoilValue(widthAtom);
  const isMobile = useRecoilValue(isMobileAtom);
  const isSmall = !(width > 1295);
  const isXSmall = !(width > 1140);
  const switchPrev = () => {
    setIsBack(true);
    switch (screen) {
      case "chat":
        setScreen("detail");
        break;
      case "draft":
        setScreen("chat");
        break;
      default:
        setScreen("chat");
        break;
    }
  };
  const switchNext = () => {
    setIsBack(false);
    switch (screen) {
      case "detail":
        setScreen("chat");
        break;
      case "chat":
        setScreen("draft");
        break;
      default:
        setScreen("chat");
        break;
    }
  };
  useEffect(() => {
    if (apply) {
      if (screen === "chat") {
        setTimeout(() => {
          scrollDown();
        }, 310);
      }
    }
  }, [apply, screen]);
  useEffect(() => {
    if (apply) {
      if (isXSmall) {
        setTimeout(() => {
          scrollDown();
        }, 300);
      } else {
        setTimeout(() => {
          scrollDown();
        }, 100);
      }
    }
  }, [apply, isMobile, isSmall, isXSmall]);
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
      <Wrapper $isMobile={isMobile} $isSmall={isSmall} $isXSmall={isXSmall}>
        {apply ? (
          <>
            <TopBar $isMobile={isMobile}>
              {screen === "chat" ? (
                <Switch onClick={switchPrev} $isMobile={isMobile}>
                  주문 정보
                </Switch>
              ) : screen === "draft" ? (
                <Switch onClick={switchPrev} $isMobile={isMobile}>
                  채팅
                </Switch>
              ) : (
                <div style={{ width: "44px" }} />
              )}
              <Back $isSmall={isSmall} to="/order-management">
                &larr; 뒤로가기
              </Back>
              {screen === "detail" ? (
                <Switch onClick={switchNext} $isMobile={isMobile}>
                  채팅
                </Switch>
              ) : screen === "chat" ? (
                <Switch onClick={switchNext} $isMobile={isMobile}>
                  참고 사진
                </Switch>
              ) : (
                <div style={{ width: "44px" }} />
              )}
            </TopBar>
            <AnimatePresence mode="popLayout" custom={isBack}>
              {(!isXSmall && !isMobile) || (isMobile && screen === "detail") ? (
                <Detail
                  key="detail"
                  variants={screenVariants}
                  initial="entry"
                  animate="center"
                  exit="exit"
                  custom={isBack}
                  $isMobile={isMobile}
                  $isSmall={isSmall}
                  $isXSmall={isXSmall}
                >
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
                      신청 날짜: {parseISOString(apply.appliedAt)}
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
              ) : null}
              {(!isXSmall && !isMobile) ||
              (isXSmall && !isMobile) ||
              (isMobile && screen === "chat") ? (
                <Chat
                  key="chat"
                  $isMobile={isMobile}
                  variants={screenVariants}
                  custom={isBack}
                  initial="entry"
                  animate="center"
                  exit="exit"
                >
                  <MessageList ref={ulRef}>
                    {apply.chats.length > 0 || chats.length > 0 ? (
                      <>
                        {apply.chats.map((chat, index) => {
                          return (
                            <Message
                              key={index}
                              $isMe={chat.isMe}
                              $removeAvatar={
                                index === 0
                                  ? false
                                  : apply.chats[index - 1].isMe
                              }
                            >
                              {(index === 0
                                ? true
                                : !apply.chats[index - 1].isMe) &&
                                chat.isMe && (
                                  <MessageUser>
                                    <MessageAvatar
                                      src={orderer.photoURL ?? "/img/user.jpeg"}
                                    />
                                    <MessageUsername>
                                      {apply.orderer.username}
                                    </MessageUsername>
                                  </MessageUser>
                                )}
                              <MessageContainer>
                                {!chat.isMe ? (
                                  <MessageDate>
                                    {parseISOString(chat.timestamp)}
                                  </MessageDate>
                                ) : null}
                                <MessageContent $isMe={!chat.isMe}>
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
                                </MessageContent>
                                {!chat.isMe ? (
                                  <DeleteMessage
                                    onClick={() => onDeleteMessage(chat)}
                                  >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                  </DeleteMessage>
                                ) : (
                                  <MessageDate>
                                    {parseISOString(chat.timestamp)}
                                  </MessageDate>
                                )}
                              </MessageContainer>
                            </Message>
                          );
                        })}
                        {chats.map((chat, index) => {
                          return (
                            <Message
                              key={index}
                              $isMe={chat.isMe}
                              $removeAvatar={
                                index === 0 ? false : chats[index - 1].isMe
                              }
                            >
                              {(index === 0 ? true : !chats[index - 1].isMe) &&
                                chat.isMe && (
                                  <MessageUser>
                                    <MessageAvatar
                                      src={orderer.photoURL ?? "/img/user.jpeg"}
                                    />
                                    <MessageUsername>
                                      {apply.orderer.username}
                                    </MessageUsername>
                                  </MessageUser>
                                )}
                              <MessageContainer>
                                {!chat.isMe ? (
                                  <MessageDate>
                                    {parseISOString(chat.timestamp)}
                                  </MessageDate>
                                ) : null}
                                <MessageContent $isMe={!chat.isMe}>
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
                                </MessageContent>
                                {!chat.isMe ? (
                                  <DeleteMessage
                                    onClick={() => onDeleteMessage(chat)}
                                  >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                  </DeleteMessage>
                                ) : (
                                  <MessageDate>
                                    {parseISOString(chat.timestamp)}
                                  </MessageDate>
                                )}
                              </MessageContainer>
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
                          <MessageImageTitle>
                            함께 전송할 사진
                          </MessageImageTitle>
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
              ) : null}
              {(isXSmall && !isMobile) ||
              (!isXSmall && !isMobile) ||
              (isMobile && screen === "draft") ? (
                <Drafts
                  key="draft"
                  $isMobile={isMobile}
                  $isXSmall={isXSmall}
                  variants={screenVariants}
                  custom={isBack}
                  initial="entry"
                  animate="center"
                  exit="exit"
                >
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
                          <DraftLazyImage
                            src={draft.imageUrl}
                            alt="draftImage"
                          />
                          <DraftDesc>{draft.title}</DraftDesc>
                        </Draft>
                      );
                    })}
                  </DraftList>
                </Drafts>
              ) : null}
            </AnimatePresence>
          </>
        ) : (
          <></>
        )}
      </Wrapper>
    </>
  );
};

export default DetailOrderManagement;
