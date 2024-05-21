import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 0 200px;
  padding-top: 140px;
`;

const Back = styled(Link)`
  text-decoration: none;
  background-color: #0984e3;
  color: white;
  font-size: 15px;
  border-radius: 5px;
  cursor: pointer;
  padding: 6px 10px;
  gap: 5px;
  svg {
    margin-right: 3px;
  }
`;

const Header = styled.header`
  margin-top: 30px;
  display: flex;
  gap: 15px;
  align-items: center;
`;

const Avatar = styled.div`
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

const Name = styled.h1`
  font-size: 50px;
  font-weight: bold;
`;

const Introduction = styled.h2`
  margin-top: 30px;
  font-size: 20px;
  span {
    font-weight: bold;
  }
`;

const Dawn = () => {
  return (
    <Wrapper>
      <Back to="/about">
        <FontAwesomeIcon icon={faRotateBack} />
        뒤로가기
      </Back>
      <Header>
        <Avatar $src="/img/workers/dawn.jpeg" />
        <Name>새벽</Name>
      </Header>
      <Introduction>
        <span>소개글:</span> 어쩌다가 여기에 끌려왔을까요? 살려주세요 ㅠㅠ
        하지만 퀄리티는 보장 해드립니다. 믿고 맡겨주세요.
      </Introduction>
    </Wrapper>
  );
};

export default Dawn;
