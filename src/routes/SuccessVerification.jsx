import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Seo from "../components/Seo";
import {} from "react-router";
import { useSearchParams } from "react-router-dom";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 130px;
  color: #20bf6b;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
`;

const Description = styled.h2`
  font-size: 24px;
`;

const SuccessVerification = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  return (
    <Wrapper>
      <Seo
        title="인증됐습니다!"
        description="이메일 정보가 변경됐습니다. (이 창은 이제 닫아도 됩니다.)"
      />
      <Icon icon={faCheckCircle} />
      <Title>인증됐습니다!</Title>
      <Description>
        {type === "verification"
          ? "이메일이 인증됐습니다."
          : "이메일 정보가 변경됐습니다."}{" "}
        (이 창은 이제 닫아도 됩니다.)
      </Description>
    </Wrapper>
  );
};

export default SuccessVerification;
