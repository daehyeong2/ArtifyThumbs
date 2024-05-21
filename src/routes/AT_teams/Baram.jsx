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

const Baram = () => {
  return (
    <Wrapper>
      <Back to="/about">
        <FontAwesomeIcon icon={faRotateBack} />
        뒤로가기
      </Back>
      <Header>
        <Avatar $src="/img/workers/wind.jpeg" />
        <Name>바람</Name>
      </Header>
      <Introduction>
        <span>소개글:</span> 하루 24시간중 12시간을 자니까 100년을 산다면 50년을
        자는겁니다.
      </Introduction>
    </Wrapper>
  );
};

export default Baram;
