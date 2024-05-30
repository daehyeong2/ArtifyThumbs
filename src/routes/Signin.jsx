import styled from "styled-components";
import Seo from "../components/Seo";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import SocialLogin from "../components/social-login";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Overlay = styled.div`
  position: absolute;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  background-image: url("/img/background/home.jpeg");
  background-repeat: no-repeat;
  background-position: 67vw 50vh;
  background-size: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 35px 50px;
  border-radius: 30px;
  transition: 0.2s;
  z-index: 1;
  background-color: white;
  &:hover {
    box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
  }
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
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

const SignInButton = styled.button`
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

const SignUpLink = styled(Link)`
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

const ErrorMessage = styled.p`
  width: 270px;
  line-height: 1.2;
  font-size: 0.8rem;
  font-weight: 600;
  color: #d63031;
`;

const Login = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const PasswordReset = styled(Link)`
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
  text-decoration: none;
  width: fit-content;
`;

const Password = styled.div`
  position: relative;
`;

const PasswordShow = styled.label`
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  top: 0;
  bottom: 0;
  user-select: none;
  svg {
    cursor: pointer;
  }
`;

const errorMap = {
  "auth/invalid-credential": "이메일 또는 비밀번호가 일치하지 않습니다.",
};

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const onSubmit = async (data) => {
    if (isLoading) return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      await auth.currentUser.reload();
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      if (userData.email !== data.email) {
        await updateDoc(userRef, {
          email: data.email,
        });
      }
      window.location.href = "/";
    } catch (e) {
      setError(errorMap[e.code]);
    } finally {
      setLoading(false);
    }
  };
  const toggleShow = () => {
    setPasswordShow((prev) => !prev);
  };
  return (
    <>
      <Seo
        title="로그인"
        description="ArtifyThumbs의 계정에 로그인해서 원하는 그림을 요청해 보세요!"
      />
      <Wrapper>
        <Overlay />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>로그인</FormTitle>
          <InputContainer>
            <Label htmlFor="email">이메일을 입력하세요.</Label>
            <Input
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              placeholder="이메일"
              autoComplete="off"
              id="email"
              name="email"
              type="email"
            ></Input>
            {errors.email && (
              <ErrorMessage>올바른 이메일 형식으로 입력해주세요.</ErrorMessage>
            )}
          </InputContainer>
          <InputContainer>
            <Label htmlFor="password">비밀번호를 입력하세요.</Label>
            <Password>
              <Input
                {...register("password", { required: true, minLength: 8 })}
                placeholder="비밀번호"
                autoComplete="off"
                id="password"
                name="password"
                type={passwordShow ? "text" : "password"}
              ></Input>
              <PasswordShow>
                <FontAwesomeIcon
                  onClick={toggleShow}
                  icon={passwordShow ? faEyeSlash : faEye}
                />
              </PasswordShow>
            </Password>
            <PasswordReset to="/password-reset">
              비밀번호를 잊으셨나요?
            </PasswordReset>
            {errors.password && (
              <ErrorMessage>
                비밀번호는 최소 8자 이상이어야 합니다.
              </ErrorMessage>
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </InputContainer>
          <Login>
            <SignInButton>{isLoading ? "로그인 중.." : "로그인"}</SignInButton>
          </Login>
          <SignUpLink to="/signup">
            계정이 없으신가요? 여기를 클릭하세요.
          </SignUpLink>
          <SocialLogin />
        </Form>
      </Wrapper>
    </>
  );
};

export default Signin;
