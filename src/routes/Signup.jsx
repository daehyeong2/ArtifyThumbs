import styled from "styled-components";
import Seo from "../components/Seo";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 35px 50px;
  border-radius: 30px;
  transition: 0.2s;
  z-index: 1;
  background-color: white;
  &:hover {
    box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
  }
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(2.5px);
  background-image: url("/img/background/login.jpeg");
  background-position: center;
  background-size: cover;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.9);
`;

const Input = styled.input`
  width: 250px;
  height: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  outline: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &:focus-within {
    border: 1px solid #0984e3;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SignUpButton = styled.button`
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

const FormTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const LoginLink = styled(Link)`
  font-size: 0.9rem;
  font-weight: 600;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
  transition: 0.1s;
  &:hover {
    color: #0097e6;
    text-decoration: underline;
  }
`;

const OAuthList = styled.ul`
  display: flex;
  gap: 10px;
  list-style: none;
  padding: 0;
`;

const OAuth = styled.li`
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    color: #0984e3;
    border: 1px solid #0984e3;
  }
`;

const ErrorMessage = styled.p`
  width: 270px;
  line-height: 1.2;
  font-size: 0.8rem;
  font-weight: 600;
  color: #d63031;
`;

const errorMap = {
  "auth/email-already-in-use": "이미 등록된 이메일입니다.",
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const onSubmit = async (data) => {
    if (isLoading) return;
    if (data.passwordConfirmation !== data.password) {
      return setFormError(
        "passwordConfirmation",
        "확인 비밀번호가 일치하지 않습니다.",
        {
          shouldFocus: true,
        }
      );
    }
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(credentials.user, {
        displayName: data.username,
        photoURL: "/img/user.jpeg",
      });
      const userRef = doc(db, "users", credentials.user.uid);
      await setDoc(userRef, {
        username: data.username,
        isAdmin: true,
        createdAt: Date.now(),
        userId: credentials.user.uid,
      });
      window.location.href = "/";
    } catch (e) {
      setError(errorMap[e.code]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Seo
        title="회원가입"
        description="ArtifyThumbs의 계정을 만들어서 원하는 그림을 신청해 보세요!"
      />
      <Wrapper>
        <Overlay />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>회원가입</FormTitle>
          <InputContainer>
            <Label htmlFor="email">이메일을 입력해 주세요.</Label>
            <Input
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
              placeholder="이메일"
              autoComplete="off"
              id="email"
              name="email"
            ></Input>
            {errors.email && (
              <ErrorMessage>올바른 이메일 형식으로 입력해주세요.</ErrorMessage>
            )}
          </InputContainer>
          <InputContainer>
            <Label htmlFor="username">아이디를 입력해 주세요.</Label>
            <Input
              {...register(
                "username",
                { required: true, pattern: /^[a-zA-Z0-9]{4,12}$/ },
                { maxLength: 12 },
                { minLength: 4 }
              )}
              placeholder="아이디"
              autoComplete="off"
              id="username"
              name="username"
              error={errors.username}
            ></Input>
            {errors.username && (
              <ErrorMessage>
                아이디는 4~12자의 영문 대소문자와 숫자로만 입력해주세요.
              </ErrorMessage>
            )}
          </InputContainer>
          <InputContainer>
            <Label htmlFor="password">비밀번호를 입력해 주세요.</Label>
            <Input
              {...register(
                "password",
                {
                  required: true,
                  pattern: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/,
                },
                { maxLength: 16 },
                { minLength: 8 }
              )}
              placeholder="비밀번호"
              autoComplete="off"
              id="password"
              name="password"
              type="password"
            ></Input>
            {errors.password && (
              <ErrorMessage>
                비밀번호는 영문 대소문자와 숫자를 포함한 8~16자로 입력해주세요.
              </ErrorMessage>
            )}
          </InputContainer>
          <InputContainer>
            <Label htmlFor="passwordConfirmation">
              비밀번호를 다시 입력해 주세요.
            </Label>
            <Input
              {...register(
                "passwordConfirmation",
                {
                  required: true,
                  pattern: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/,
                },
                { maxLength: 16 },
                { minLength: 8 }
              )}
              placeholder="비밀번호 확인"
              autoComplete="off"
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
            ></Input>
            {errors.passwordConfirmation && (
              <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
            )}
          </InputContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <SignUpButton>
            {isLoading ? "가입하는 중.." : "가입하기"}
          </SignUpButton>
          <LoginLink to="/signin">계정이 이미 있으신가요?</LoginLink>
          <OAuthList>
            <OAuth>
              <FontAwesomeIcon icon={faDiscord} />
            </OAuth>
            <OAuth>
              <FontAwesomeIcon icon={faGoogle} />
            </OAuth>
          </OAuthList>
        </Form>
      </Wrapper>
    </>
  );
};

export default Signup;
