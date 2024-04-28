import styled from "styled-components";
import Seo from "../components/Seo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axiosInstance from "../axiosInstance";

const Wrapper = styled.div`
  padding: 100px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

const Container = styled.div`
  position: relative;
  margin-top: 30px;
  border: 2px solid rgba(0, 0, 0, 0.15);
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 30px;
  width: 1000px;
  min-height: 700px;
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
  grid-template-rows: 0.7fr 1fr 3fr 0.5fr;
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
  width: 100%;
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

const ApplyBox = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ApplyMessage = styled.h3`
  grid-column: span 2;
  color: rgba(0, 0, 0, 0.4);
`;

const ErrorMessage = styled.p`
  line-height: 1.2;
  font-size: 0.9rem;
  font-weight: 600;
  color: #d63031;
`;

const Procedure = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { state } = useLocation();
  const [currentPlan, setCurrentPlan] = useState(state);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axiosInstance
      .post(`${process.env.REACT_APP_BACKEND_URL}/orders/apply`, data)
      .then((res) => {
        if (res.status === 200) {
          alert("신청을 성공했습니다.");
          navigate(`/apply-list/${res.data.orderId}`);
        } else {
          alert("신청을 실패했습니다.");
        }
      });
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
              <Select
                {...register("plan", {
                  required: true,
                  onChange: (event) => {
                    setCurrentPlan(event.target.value);
                  },
                })}
                value={currentPlan}
              >
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
                {...register("title", { required: true, maxLength: 30 })}
                type="text"
                placeholder="그림 제목을 입력해주세요."
              />
              {errors.title && (
                <ErrorMessage>제목을 30글자 이내로 입력해주세요.</ErrorMessage>
              )}
            </InputContainer>
            <InputContainer $isFull={true}>
              <Label>그림 상세내용</Label>
              <Textarea
                type="text"
                {...register("content", {
                  required: true,
                  minLength: 10,
                  maxLength:
                    currentPlan === "standard"
                      ? 500
                      : currentPlan === "pro" && 1500,
                })}
                placeholder="원하는 그림에 대해 최대한 상세하게 설명해주세요!&#10;(예시: 하늘색 배경에 귀여운 남자아이를 그려주세요. 참고사진 올려드릴게요.)"
              />
              {errors.content && (
                <ErrorMessage>
                  그림 상세내용은{" "}
                  {currentPlan === "standard"
                    ? "기본 플랜 기준"
                    : currentPlan === "pro" && "프로 플랜 기준"}{" "}
                  10글자 이상{" "}
                  {currentPlan === "standard"
                    ? 500
                    : currentPlan === "pro" && 1500}
                  글자 이내로 입력해주세요.
                </ErrorMessage>
              )}
            </InputContainer>
            <ApplyBox>
              <ApplyMessage>
                ※ 참고 사진은 신청을 완료하신 후, 세부 페이지에서 추가 하실 수
                있습니다.
              </ApplyMessage>
              <ApplyButton>신청하기</ApplyButton>
            </ApplyBox>
          </Form>
        </Container>
      </Wrapper>
    </>
  );
};

export default Procedure;
