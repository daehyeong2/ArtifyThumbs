import styled from "styled-components";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isBlockedAtom, userAtom } from "../atom";
import Seo from "../components/Seo";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
  verifyBeforeUpdateEmail,
} from "firebase/auth";

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
  margin-top: 5px;
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

const SettingButton = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: opacity 0.05s ease-in-out;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  width: fit-content;
  cursor: pointer;
  font-size: 16px;
  padding: 8px 10px;
  margin-top: 3px;
`;

const ProfileSettings = () => {
  let user = auth.currentUser;
  const userData = useRecoilValue(userAtom);
  const setIsBlocked = useSetRecoilState(isBlockedAtom);
  const [email, setEmail] = useState("");
  const [isSaved, setIsSaved] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [lastEmail, setLastEmail] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [lastPassword, setLastPassword] = useState("");
  const [passwordCooldown, setPasswordCooldown] = useState(false);
  useEffect(() => {
    if (!user || !userData) return;
    setEmail(user.email);
    setLastEmail(user.email);
    setIsVerified(user.emailVerified);
  }, [user, userData]);
  const onChange = (e) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        if (lastEmail !== e.target.value) {
          setIsVerified(false);
          setIsSent(false);
        } else {
          setIsVerified(true);
        }
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "newPassword":
        setNewPassword(e.target.value);
        if (lastPassword !== e.target.value) {
          setIsBlocked(true);
          setIsSaved(false);
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
    if (!password) return alert("필수 항목을 모두 입력해 주세요.");
    setLoading(true);
    try {
      if (lastPassword !== newPassword) {
        const isError = await reauthenticate(password);
        if (isError) return;
        await updatePassword(user, newPassword);
        setLastPassword(newPassword);
        setPassword(newPassword);
        setNewPassword("");
      }
      setIsBlocked(false);
      setIsSaved(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const onSend = async () => {
    if (isCooldown) {
      return alert(
        "이메일은 60초에 한번씩 전송할 수 있습니다, 잠시 후에 다시 시도해 주세요."
      );
    }
    setIsVerified(false);
    let isError = null;
    try {
      isError = await reauthenticate(password, true, isSent);
      if (isError) return;
      await verifyBeforeUpdateEmail(user, email, {
        url: "http://localhost:3000/success-email-verification",
      });
      alert("인증 이메일을 전송했습니다.");
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
  const reauthenticate = async (password, showAlert = true, reSend) => {
    if (!user) {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        reSend ? lastEmail : isSent ? email : lastEmail,
        password
      );
      user = userCredential.user;
      return;
    }
    const credential = EmailAuthProvider.credential(
      isSent ? email : user.email,
      password
    ); // 비밀번호 재설정 기능 추가 예정
    try {
      const userCredential = await reauthenticateWithCredential(
        user,
        credential
      );
      user = userCredential.user;
    } catch (error) {
      if (!showAlert) return true;
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
  const onVerify = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      if (e.code === "auth/invalid-credential")
        return alert("아직 인증되지 않았습니다.");
      else {
        return alert(`에러 발생: ${e.code}`);
      }
    }
    alert("이메일이 변경됐습니다.");
    setIsVerified(true);
    setLastEmail(email);
    setIsSent(false);
  };
  const onResetPassword = async () => {
    if (passwordCooldown)
      return alert(
        "비밀번호 재설정 메일은 30초에 한번씩 전송할 수 있습니다. 잠시만 기다려주세요."
      );
    if (!window.confirm("비밀번호 재설정 메일을 전송하시겠습니까?")) return;
    try {
      await sendPasswordResetEmail(auth, lastEmail);
      alert("이메일로 비밀번호 재설정 요청이 전송됐습니다.");
      setPasswordCooldown(true);
      setTimeout(() => {
        setPasswordCooldown(false);
      }, 30000);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Wrapper>
      <Seo title="계정 설정" description="당신의 계정 정보를 수정하세요." />
      <SettingBox>
        <div>
          <div>
            <SettingLabel htmlFor="password">기존 비밀번호 (필수)</SettingLabel>
            <SettingInput
              value={password}
              type="password"
              id="password"
              autoComplete="off"
              placeholder="기존 비밀번호를 입력해 주세요."
              onChange={onChange}
              disabled={isLoading || isSent}
              $disabled={isLoading || isSent}
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
              disabled={isLoading || isSent}
              $disabled={isLoading || isSent}
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
                    {isSent
                      ? isCooldown
                        ? "이메일 재전송 (대기 중)"
                        : "이메일 재전송"
                      : isCooldown
                      ? "이메일 인증 링크 보내기 (대기중)"
                      : "이메일 인증 링크 보내기"}
                  </span>
                  {isSent && <span onClick={onVerify}>인증 완료</span>}
                </>
              </SettingInfo>
            )}
          </div>
          <div>
            <SettingLabel>비밀번호 재설정</SettingLabel>
            <SettingButton onClick={onResetPassword}>
              비밀번호 재설정
            </SettingButton>
          </div>
        </div>
      </SettingBox>
      <SaveButton
        disabled={!isVerified || isSaved}
        $disabled={!isVerified || isSaved}
        onClick={onSave}
      >
        {isLoading ? "저장하는 중.." : "저장하기"}
      </SaveButton>
    </Wrapper>
  );
};

export default ProfileSettings;
