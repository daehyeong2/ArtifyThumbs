import styled from "styled-components";
import Seo from "../components/Seo";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 140px;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 100px 50px;
  padding-top: 50px;
  width: 300px;
  height: fit-content;
  border-radius: 30px;
  transition: 0.2s;
  z-index: 1;
  background-color: white;
  &:hover {
    box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
  }
`;

const ResetButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #0984e3;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #0097e6;
  }
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 15px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  padding: 8px 10px;
  box-sizing: border-box;
  outline: none;
  font-size: 16px;
`;

const FormTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  width: 100%;
  line-height: 1.2;
  font-size: 0.8rem;
  font-weight: 600;
  color: #d63031;
`;

const LoginLink = styled(Link)`
  margin-top: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
  transition: 0.1s;
  width: fit-content;
  &:hover {
    color: #0097e6;
    text-decoration: underline;
  }
`;

const PasswordReset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const onSubmit = async (data) => {
    if (isLoading) return;
    if (isCooldown)
      return alert(
        "비밀번호 재설정 메일은 30초에 한번씩 전송할 수 있습니다. 잠시만 기다려주세요."
      );
    if (!window.confirm("비밀번호 재설정 메일을 전송하시겠습니까?")) return;
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, data.email);
      alert("이메일로 비밀번호 재설정 요청이 전송됐습니다.");
      setIsCooldown(true);
      setTimeout(() => setIsCooldown(false), 30000);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Seo
        title="비밀번호 재설정"
        description="이메일을 입력해서 비밀번호를 재설정하세요."
      />
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>비밀번호 재설정</FormTitle>
          <Label htmlFor="email">이메일 (필수)</Label>
          <Input
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
            placeholder="이메일"
            autoComplete="off"
            id="email"
            name="email"
            type="email"
          ></Input>
          {errors.email && (
            <ErrorMessage>올바른 이메일 형식으로 입력해 주세요.</ErrorMessage>
          )}
          <ResetButton>
            {isLoading ? "비밀번호 재설정 중.." : "비밀번호 재설정"}
          </ResetButton>
          <LoginLink to="/signin">비밀번호가 기억나셨나요?</LoginLink>
        </Form>
      </Wrapper>
    </>
  );
};

export default PasswordReset;
