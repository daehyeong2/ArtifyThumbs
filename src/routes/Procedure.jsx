import styled from "styled-components";
import Seo from "../components/Seo";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
  padding: 100px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const Container = styled.div`
  position: relative;
  margin-top: 30px;
  border: 2px solid rgba(0, 0, 0, 0.15);
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 30px;
  width: 1000px;
  height: 700px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 50px;
  transition: 0.1s;
  &:hover {
    box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.25);
  }
`;

const Back = styled(Link)`
  position: absolute;
  top: -20px;
  left: 3px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background-color: white;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: 0.1s;
  color: black;
  text-decoration: none;
  &:hover {
    border: 1px solid #0984e3;
  }
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 600;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr 1fr 3fr 0.5fr;
  gap: 20px;
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.div`
  grid-column: ${(props) => (props.$isFull ? "span 2" : "span 1")};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: 600;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 18px;
  border-radius: 10px;
  border: 2px solid #17c0eb;
  height: 50px;
  outline: none;
  cursor: pointer;
  transition: 0.1s;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &:hover {
    border: 2px solid #0984e3;
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 18px;
  border-radius: 10px;
  border: 2px solid #17c0eb;
  outline: none;
  transition: 0.1s;
  height: 50px;
  box-sizing: border-box;
  &:hover {
    border: 2px solid #0984e3;
  }
`;

const Textarea = styled.textarea`
  height: 100%;
  padding: 10px;
  font-size: 18px;
  border-radius: 10px;
  border: 2px solid #17c0eb;
  outline: none;
  transition: 0.1s;
  resize: none;
  box-sizing: border-box;
  &:hover {
    border: 2px solid #0984e3;
  }
`;

const ApplyButton = styled.button`
  padding: 10px;
  font-size: 20px;
  grid-column: span 2;
  border-radius: 10px;
  background-color: #0984e3;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background-color: #0097e6;
  }
`;

const Procedure = () => {
  const { register, handleSubmit } = useForm();
  const { state } = useLocation();
  const plan = useRef(null);
  useEffect(() => {
    plan.current.value = state;
  }, [state]);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <Seo title="신청하기" />
      <Wrapper>
        <Container>
          <Back to="/apply">&larr; 뒤로가기</Back>
          <Title>신청하기</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
              <Label>플랜 선택</Label>
              <Select {...register("plan", { required: true })} ref={plan}>
                <option value="standard">기본</option>
                <option value="pro">프로</option>
              </Select>
            </InputContainer>
            <InputContainer>
              <Label>그림 종류</Label>
              <Select {...register("kind", { required: true })}>
                <option value="youtube-thumbnail">유튜브 썸네일</option>
                <option value="banner">프로필 배너</option>
                <option value="profile">프로필 사진</option>
                <option value="game-illustration">게임 일러스트</option>
                <option value="character-design">캐릭터 디자인</option>
                <option value="etc">기타</option>
              </Select>
            </InputContainer>
            <InputContainer $isFull={true}>
              <Label>그림 제목</Label>
              <Input
                {...register("title", { required: true })}
                type="text"
                placeholder="그림 제목을 입력해주세요."
              />
            </InputContainer>
            <InputContainer $isFull={true}>
              <Label>그림 상세내용</Label>
              <Textarea
                type="text"
                {...register("content", { required: true })}
                placeholder="원하는 그림에 대해 최대한 상세하게 설명해주세요!&#10;(예시: 하늘색 배경에 귀여운 남자아이를 그려주세요. 참고사진 올려드릴게요.)"
              />
            </InputContainer>
            <ApplyButton>신청하기</ApplyButton>
          </Form>
        </Container>
      </Wrapper>
    </>
  );
};

export default Procedure;
