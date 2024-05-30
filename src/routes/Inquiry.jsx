import styled from "styled-components";
import Seo from "../components/Seo";
import { useForm } from "react-hook-form";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Link } from "react-scroll";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useRecoilValue } from "recoil";
import { isMobileAtom } from "../atom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const InquirySection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-width: 800px;
  width: 100%;
  padding: 0 15px;
  padding-bottom: ${(props) => (props.$isMobile ? "100px" : "")};
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: ${(props) => (props.$isMobile ? "430px" : "500px")};
  width: 100%;
  padding: ${(props) => (props.$isMobile ? "30px" : "50px")};
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border-radius: 20px;
  transition: 0.1s;
  &:hover {
    box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.13);
  }
`;

const Title = styled.h1`
  font-size: ${(props) => (props.$isMobile ? "35px" : "40px")};
  font-weight: 600;
`;

const Form = styled.form`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 45px ${(props) => (props.$isMobile ? "45px" : "")} 1fr 45px;
  gap: 13px;
`;

const Input = styled.input`
  width: 100%;
  height: 45px;
  padding: 15px;
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  outline: none;
  box-sizing: border-box;
  grid-column: ${(props) => (props.$isMobile ? "span 2" : "")};
  &:focus-within {
    border: 1px solid #0984e3;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-size: 16px;
  padding: 10px 15px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  outline: none;
  resize: none;
  grid-column: span 2;
  &:focus-within {
    border: 1px solid #0984e3;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 45px;
  background-color: #0984e3;
  color: white;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  transition: 0.1s;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  grid-column: span 2;
  cursor: pointer;
  &:hover {
    background-color: #0097e6;
  }
`;

const QnA = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  min-height: 100vh;
  padding: 0 10px;
  padding-top: 200px;
  max-width: 700px;
  width: 100%;
  box-sizing: border-box;
`;

const QnAContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const QnAItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Q = styled.h2`
  font-size: ${(props) => (props.$isMobile ? "21px" : "25px")};
  font-weight: 600;
`;

const A = styled.p`
  font-size: ${(props) => (props.$isMobile ? "17px" : "20px")};
  line-height: 1.2;
`;

const Message = styled(motion.div)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: ${(props) => (props.$isMobile ? "22px" : "24px")};
  font-weight: 600;
  margin-top: 20px;
  cursor: pointer;
  i {
    font-size: 25px;
  }
`;

const ErrorMessage = styled.span`
  color: #ff3838;
  font-size: 14px;
  font-weight: bold;
`;

const MessageVariants = {
  initial: {
    y: 20,
  },
  animate: {
    y: 0,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      type: "just",
      duration: 0.45,
    },
  },
  scrolled: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const Inquiry = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const handleScroll = useCallback((latest) => {
    setCurrentScrollY(latest);
  }, []);
  useMotionValueEvent(scrollY, "change", handleScroll);
  const onSubmit = async (data) => {
    if (
      isLoading ||
      !data.title ||
      !data.email ||
      !data.content ||
      data.content.length > 2500
    )
      return;
    try {
      setLoading(true);
      const now = new Date();
      await addDoc(collection(db, "inquiries"), {
        email: data.email,
        title: data.title,
        content: data.content,
        isAnswered: false,
        createdAt: now.toISOString(),
      });
      alert("문의가 접수됐습니다. (답변은 이메일로 전송됩니다.)");
      navigate("/");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const isMobile = useRecoilValue(isMobileAtom);
  return (
    <>
      <Seo
        title="문의하기"
        description="ArtifyThumbs에 대해 모르는 것을 문의해 보세요."
      />
      <Wrapper>
        <InquirySection $isMobile={isMobile}>
          <Container $isMobile={isMobile}>
            <Title $isMobile={isMobile}>문의하기</Title>
            <Form $isMobile={isMobile} onSubmit={handleSubmit(onSubmit)}>
              <Input
                $isMobile={isMobile}
                type="text"
                autoComplete="off"
                placeholder="문의 제목을 입력해 주세요."
                required
                {...register("title", { required: true })}
              />
              <Input
                $isMobile={isMobile}
                type="email"
                autoComplete="off"
                placeholder="이메일을 입력해 주세요."
                required
                {...register("email", {
                  required: true,
                  match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
              />
              <TextArea
                autoComplete="off"
                placeholder="문의 내용을 입력해 주세요."
                required
                {...register("content", { required: true, maxLength: 2500 })}
              />
              {errors.content && (
                <ErrorMessage>
                  문의 내용은 최대 2,500자 이내로 작성해 주세요.
                </ErrorMessage>
              )}
              <Button>
                {isLoading ? "문의를 등록하는 중.." : "문의 등록하기"}
              </Button>
            </Form>
          </Container>
          <Link to="qna" smooth={true} duration={500}>
            <Message
              variants={MessageVariants}
              initial="initial"
              animate={currentScrollY > 80 ? "scrolled" : "animate"}
              $isMobile={isMobile}
            >
              <FontAwesomeIcon icon={faArrowDown} />
              자주 묻는 질문
              <FontAwesomeIcon icon={faArrowDown} />
            </Message>
          </Link>
        </InquirySection>
        <QnA id="qna">
          <Title $isMobile={isMobile}>자주 묻는 질문</Title>
          <QnAContainer>
            <QnAItem>
              <Q $isMobile={isMobile}>Q. 문의한 내용은 어떻게 확인하나요?</Q>
              <A $isMobile={isMobile}>
                A. 문의한 내용은 이메일로 확인하실 수 있습니다. 문의한 내용에
                대한 답변은 최대 7일 이내에 이메일로 보내드립니다.
              </A>
            </QnAItem>
            <QnAItem>
              <Q $isMobile={isMobile}>Q. 어떤 종류의 문의를 해야하나요?</Q>
              <A $isMobile={isMobile}>
                A. 궁금한 점이나 서비스 피드백, 에러 신고 등 무엇이든 문의 하실
                수 있습니다.
              </A>
            </QnAItem>
            <QnAItem>
              <Q $isMobile={isMobile}>Q. 이메일 정보는 안전한가요?</Q>
              <A $isMobile={isMobile}>
                A. 네, 입력하신 이메일은 단순 회신용으로만 사용됩니다.
              </A>
            </QnAItem>
          </QnAContainer>
        </QnA>
      </Wrapper>
    </>
  );
};

export default Inquiry;
