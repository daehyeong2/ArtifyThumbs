import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { faCheck, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { reRenderAtom, userAtom } from "../atom";
import Seo from "../components/Seo";
import { doc, updateDoc } from "firebase/firestore";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  updatePassword,
  updateProfile,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  height: 100%;
`;

const SettingBox = styled.div`
  display: flex;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    div {
      gap: 4px;
      position: relative;
    }
  }
`;

const SettingInfo = styled.span`
  position: absolute;
  bottom: -23px;
  display: flex;
  gap: 8px;
  width: 100%;
  span {
    color: #0984e3;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SettingLabel = styled.label``;

const SettingInput = styled.input`
  width: 400px;
  font-size: 16px;
  padding: 5px 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  outline: none;
  transition: border 0.1s ease-in-out;
  background-color: ${(props) => (props.$disabled ? "rgba(0,0,0,0.08)" : "")};
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &:focus {
    border: 1px solid #0984e3;
  }
`;

const AvatarContainer = styled(motion.label)`
  margin-left: auto;
  position: relative;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;
const AvatarOverlay = styled(motion.div)`
  position: absolute;
  width: 152px;
  height: 152px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const AvatarIcon = styled(motion(FontAwesomeIcon))`
  margin-left: 10px;
  color: black;
  font-size: 50px;
`;

const avatarVariants = {
  initial: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const SaveButton = styled.button`
  position: absolute;
  right: 15px;
  bottom: 15px;
  background-color: ${(props) => (props.$disabled ? "#a5b1c2" : "#0984e3")};
  border-radius: 15px;
  padding: 8px 10px;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  color: white;
  font-size: 16px;
  border: none;
  transition: opacity 0.1s ease-in-out;
  &:hover {
    opacity: ${(props) => (props.$disabled ? 1 : 0.8)};
  }
`;

const AvatarInput = styled.input`
  display: none;
`;

const SaveText = styled(motion.span)`
  position: absolute;
  bottom: -30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 5px 8px;
  border-radius: 8px;
  width: max-content;
  font-size: 14px;
  color: white;
  border: 2px solid #0a5f3288;
  background-color: #1ec25a;
  display: flex;
  gap: 5px;
`;

const saveTextVariants = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const ProfileSettings = () => {
  let user = auth.currentUser;
  const userData = useRecoilValue(userAtom);
  const setReRender = useSetRecoilState(reRenderAtom);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isSaved, setIsSaved] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState("");
  const [avatarIsLoading, setAvatarIsLoading] = useState(false);
  const [saveIsHidden, setSaveIsHidden] = useState(true);
  const [isSent, setIsSent] = useState(false);
  const [lastEmail, setLastEmail] = useState("");
  const [lastUsername, setLastUsername] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [lastPassword, setLastPassword] = useState("");
  useEffect(() => {
    if (!user || !userData) return;
    setEmail(user.email);
    setUsername(user.displayName);
    setLastEmail(user.email);
    setUsername(user.displayName);
    setAvatar(user.photoURL);
    setIsVerified(user.emailVerified);
  }, [user, userData]);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isSaved) {
        // 기본 이벤트를 방지하고 사용자에게 경고 메시지를 표시합니다.
        event.preventDefault();
        event.returnValue =
          "변경사항이 저장되지 않았습니다. 페이지를 떠나시겠습니까?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isSaved]);
  const onChange = (e) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        if (lastEmail !== e.target.value) {
          setIsVerified(false);
        } else {
          setIsVerified(true);
        }
        break;
      case "username":
        setUsername(e.target.value);
        if (lastUsername !== e.target.value) setIsSaved(false);
        else setIsSaved(true);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "newPassword":
        setNewPassword(e.target.value);
        if (lastPassword !== e.target.value) setIsSaved(false);
        else setIsSaved(true);
        break;
      default:
        break;
    }
  };
  const onSave = async () => {
    if (isSaved || isLoading) return;
    if (!password || !username) return alert("필수 항목을 모두 입력해 주세요.");
    setLoading(true);
    try {
      if (lastPassword !== newPassword) {
        const isError = await reauthenticate(password);
        if (isError) return;
      }
      if (lastPassword !== newPassword) {
        await updatePassword(user, newPassword);
        setLastPassword(newPassword);
        setPassword(newPassword);
        setNewPassword("");
      }
      if (lastUsername !== username) {
        await updateProfile(user, { displayName: username });
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { username });
        setLastUsername(username);
      }
      setIsSaved(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const onUpload = async (e) => {
    const { files } = e.target;
    if (!user || avatarIsLoading) return;
    if (files && files.length === 1) {
      try {
        setAvatarIsLoading(true);
        const file = files[0];
        const locationRef = ref(storage, `avatars/${user.uid}`);
        const result = await uploadBytes(locationRef, file);
        const avatarUrl = await getDownloadURL(result.ref);
        await updateProfile(user, { photoURL: avatarUrl });
        setAvatar(avatarUrl);
        setAvatarFile("");
        setSaveIsHidden(false);
        setReRender((prev) => !prev);
        setTimeout(() => {
          setSaveIsHidden(true);
        }, 3000);
      } catch (e) {
        console.error(e);
      } finally {
        setAvatarIsLoading(false);
      }
    }
  };
  const onSend = async () => {
    if (isCooldown) {
      return alert(
        "이메일은 60초에 한번씩 전송할 수 있습니다, 잠시 후에 다시 시도해 주세요."
      );
    }
    let isError = null;
    try {
      isError = await reauthenticate(password);
      if (isError) return;
      await verifyBeforeUpdateEmail(user, email, {
        url: "http://localhost:3000/success-email-verification",
      });
      alert("이메일을 전송했습니다.");
      setIsCooldown(true);
      setTimeout(() => {
        setIsCooldown(false);
      }, 60000);
    } catch (e) {
      console.error(e);
    } finally {
      if (!isError) setIsSent(true);
    }
  };
  const reauthenticate = async (password) => {
    if (!user) {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        isSent ? email : user.email,
        password
      );
      user = userCredential.user;
      return;
    }
    const credential = EmailAuthProvider.credential(
      isSent ? email : user.email,
      password
    );
    try {
      await reauthenticateWithCredential(user, credential);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("해당 이메일은 이미 다른 계정에서 사용 중 입니다.");
      } else if (error.code === "auth/invalid-credential") {
        alert("기존 비밀번호가 일치하지 않습니다.");
      } else if (error.code === "auth/requires-recent-login") {
        alert("다시 로그인 해주세요.");
      } else if (error.code === "auth/missing-password") {
        alert("비밀번호를 입력해 주세요.");
      } else {
        alert(error.message);
      }
      return true;
    }
  };
  return (
    <Wrapper>
      <Seo
        title="프로필 설정"
        description="당신의 공개 프로필 정보를 수정하세요."
      />
      <SettingBox>
        <div>
          <div>
            <SettingLabel htmlFor="username">이름 (필수)</SettingLabel>
            <SettingInput
              value={username}
              type="text"
              id="username"
              autoComplete="off"
              placeholder="이름을 입력해 주세요."
              onChange={onChange}
              disabled={isLoading}
              $disabled={isLoading}
              required
            />
          </div>
          <div>
            <SettingLabel htmlFor="password">기존 비밀번호 (필수)</SettingLabel>
            <SettingInput
              value={password}
              type="password"
              id="password"
              autoComplete="off"
              placeholder="기존 비밀번호를 입력해 주세요."
              onChange={onChange}
              disabled={isLoading}
              $disabled={isLoading}
              required
            />
          </div>
          <div>
            <SettingLabel htmlFor="newPassword">
              새 비밀번호 (선택)
            </SettingLabel>
            <SettingInput
              value={newPassword}
              type="password"
              id="newPassword"
              autoComplete="off"
              placeholder="새 비밀번호를 입력해 주세요."
              onChange={onChange}
              disabled={isLoading}
              $disabled={isLoading}
            />
          </div>
          <div>
            <SettingLabel htmlFor="email">이메일 (필수)</SettingLabel>
            <SettingInput
              value={email}
              type="email"
              id="email"
              autoComplete="off"
              placeholder="이메일을 입력해 주세요."
              onChange={onChange}
              disabled={isLoading || !user?.emailVerified}
              $disabled={isLoading || !user?.emailVerified}
              required
            />
            {!isVerified && (
              <SettingInfo>
                <>
                  이메일 인증이 필요합니다.{" "}
                  <span onClick={onSend}>
                    {isSent ? "이메일 재전송" : "이메일 인증 링크 보내기"}
                  </span>
                </>
              </SettingInfo>
            )}
          </div>
        </div>
        <AvatarContainer
          htmlFor="avatarInput"
          initial="initial"
          whileHover="hover"
        >
          <Avatar src={avatar} />
          <AnimatePresence>
            {!saveIsHidden && (
              <SaveText
                variants={saveTextVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.2 }}
                exit="exit"
              >
                <FontAwesomeIcon icon={faCheck} />
                저장됨
              </SaveText>
            )}
          </AnimatePresence>
          <AvatarOverlay
            transition={{ duration: 0.2 }}
            variants={avatarVariants}
          >
            <AvatarIcon icon={faUserEdit} />
          </AvatarOverlay>
        </AvatarContainer>
        <AvatarInput
          disabled={avatarIsLoading}
          value={avatarFile}
          onChange={onUpload}
          id="avatarInput"
          type="file"
          accept="image/*"
        />
      </SettingBox>
      <SaveButton disabled={isSaved} $disabled={isSaved} onClick={onSave}>
        {isLoading ? "저장하는 중.." : "저장하기"}
      </SaveButton>
    </Wrapper>
  );
};

export default ProfileSettings;
