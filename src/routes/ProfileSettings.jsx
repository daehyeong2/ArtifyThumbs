import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isBlockedAtom, reRenderAtom, userAtom } from "../atom";
import Seo from "../components/Seo";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
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
    height: 100%;
    div {
      gap: 4px;
      position: relative;
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
  cursor: pointer;
`;

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

const AvatarTooltip = styled(motion.span)`
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #969fa5;
  color: white;
  font-size: 13px;
  padding: 8px 10px;
  border-radius: 5px;
  width: fit-content;
`;

const tooltipVariants = {
  initial: {
    opacity: 0,
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
  const [username, setUsername] = useState("");
  const [isSaved, setIsSaved] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState("");
  const [avatarIsLoading, setAvatarIsLoading] = useState(false);
  const [lastUsername, setLastUsername] = useState("");
  const [isHover, setIsHover] = useState(false);
  const setIsBlocked = useSetRecoilState(isBlockedAtom);
  useEffect(() => {
    if (!user || !userData) return;
    setUsername(user.displayName);
    setLastUsername(user.displayName);
    setAvatar(user.photoURL);
  }, [user, userData]);
  const onChange = (e) => {
    switch (e.target.id) {
      case "username":
        setUsername(e.target.value);
        if (lastUsername !== e.target.value) {
          setIsSaved(false);
          setIsBlocked(true);
        } else {
          setIsBlocked(false);
          setIsSaved(true);
        }
        break;
      default:
        break;
    }
  };
  const onSave = async () => {
    if (isSaved || isLoading) return;
    if (!username) return alert("필수 항목을 모두 입력해 주세요.");
    setLoading(true);
    try {
      if (lastUsername !== username) {
        await updateProfile(user, { displayName: username });
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { username });
        setLastUsername(username);
      }
      setIsBlocked(false);
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
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
          ...userData,
          photoURL: avatarUrl,
        });
        setAvatar(avatarUrl);
        setAvatarFile("");
        setReRender((prev) => !prev);
      } catch (e) {
        console.error(e);
      } finally {
        setAvatarIsLoading(false);
      }
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
        </div>
        <AvatarContainer
          htmlFor="avatarInput"
          initial="initial"
          whileHover="hover"
        >
          <Avatar
            src={avatar}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            alt={userData?.username}
          />
          <AnimatePresence>
            {isHover && (
              <AvatarTooltip
                variants={tooltipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                프로필 사진 변경하기
              </AvatarTooltip>
            )}
          </AnimatePresence>
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
