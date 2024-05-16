import { deleteUser, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { motion } from "framer-motion";
import Seo from "./Seo";
import { deleteDoc, doc } from "firebase/firestore";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  position: relative;
`;

const Icon = styled(motion.img)`
  width: 150px;
  height: 150px;
  object-fit: cover;
  object-position: center;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;

const Button = styled.button`
  border: none;
  font-size: 18px;
  color: white;
  background-color: #0984e3;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const LogOut = styled.div`
  width: fit-content;
  color: red;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid red;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 18px;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: red;
    color: white;
  }
`;

const logoVariants = {
  initial: {
    y: 0,
  },
  animate: {
    y: -25,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 0.7,
    },
  },
};

const ReSend = styled.span`
  color: #0984e3;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Verification = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const Buttons = styled.div`
  position: absolute;
  bottom: 30px;
  margin: 0 auto;
  display: flex;
  gap: 15px;
`;

const Line = styled.div`
  width: 2px;
  height: 30px;
  background-color: #0984e3;
`;

const Secession = styled.div`
  width: fit-content;
  color: red;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid red;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 18px;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: red;
    color: white;
  }
`;

const EmailVerification = () => {
  const user = auth.currentUser;
  const [isSent, setIsSent] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const onSend = async () => {
    if (isCooldown) {
      return alert(
        "이메일은 60초에 한번씩 전송할 수 있습니다, 잠시 후에 다시 시도해 주세요."
      );
    }
    try {
      await sendEmailVerification(user, {
        url: `http://localhost:3000/success-email-verification`,
      });
      alert(`이메일(${user.email})로 인증 링크가 전송됐습니다.`);
      setIsSent(true);
      setIsCooldown(true);
      setTimeout(() => {
        setIsCooldown(false);
      }, 60000);
    } catch (e) {
      console.error(e);
    }
  };
  const confirmVerification = async () => {
    await user.reload();
    if (user.emailVerified) {
      alert("인증되었습니다.");
      window.location.href = "/";
    } else {
      alert("아직 인증되지 않았습니다.");
    }
  };
  const onLogOut = async () => {
    await auth.signOut();
    window.location.href = "/";
  };
  const onSecession = async () => {
    const ok = window.confirm("정말로 탈퇴하시겠습니까? (복구할 수 없습니다) ");
    if (!ok) return;
    try {
      setLoading(true);
      const userRef = doc(db, "users", user.uid);
      await deleteDoc(userRef);
      await deleteUser(user);
      window.location.href = "/";
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <Seo title="이메일 인증" description="이메일을 인증해 주세요." />
      <Icon
        variants={logoVariants}
        initial="initial"
        animate="animate"
        src="/img/smallLogo.jpeg"
        alt="Logo"
      />
      <Title>이메일 인증이 필요합니다.</Title>
      <Verification>
        <Button onClick={isSent ? confirmVerification : onSend}>
          {isSent ? "인증 완료" : `이메일(${user.email})로 인증 링크 보내기`}
        </Button>
        {isSent && (
          <span>
            인증 링크가 전송되지 않았나요?{" "}
            <ReSend onClick={onSend}>재전송하기</ReSend>
          </span>
        )}
      </Verification>
      <Buttons>
        <LogOut onClick={onLogOut}>로그아웃</LogOut>
        <Line />
        <Secession onClick={onSecession}>
          {isLoading ? "탈퇴하는 중.." : "탈퇴하기"}
        </Secession>
      </Buttons>
    </Wrapper>
  );
};

export default EmailVerification;
