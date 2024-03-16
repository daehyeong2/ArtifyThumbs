import styled from "styled-components";
import Seo from "../components/Seo";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

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
  &:hover {
    box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
  }
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

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <Seo title="회원가입" />
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>회원가입</FormTitle>
          <InputContainer>
            <Label htmlFor="email">이메일을 입력하세요.</Label>
            <Input
              {...register("email", { required: true })}
              placeholder="이메일"
              autoComplete="off"
              id="email"
              name="email"
            ></Input>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="username">아이디를 입력하세요.</Label>
            <Input
              {...register("username", { required: true })}
              placeholder="아이디"
              autoComplete="off"
              id="username"
              name="username"
            ></Input>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="password">비밀번호를 입력하세요.</Label>
            <Input
              {...register("password", { required: true })}
              placeholder="비밀번호"
              autoComplete="off"
              id="password"
              name="password"
              type="password"
            ></Input>
          </InputContainer>
          <SignUpButton>가입하기</SignUpButton>
          <LoginLink to="/signin">계정이 이미 있으신가요?</LoginLink>
          <OAuthList>
            <OAuth>
              <i className="fa-brands fa-discord"></i>
            </OAuth>
            <OAuth>
              <i className="fa-brands fa-google"></i>
            </OAuth>
          </OAuthList>
        </Form>
      </Wrapper>
    </>
  );
};

export default Signup;
