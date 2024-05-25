import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";
import {
  Avatar,
  Back,
  Container,
  Header,
  Introduction,
  Name,
  Wrapper,
} from "./at_teams";
import { useRecoilValue } from "recoil";
import { isMobileAtom } from "../../atom";

const Dawn = () => {
  const isMobile = useRecoilValue(isMobileAtom);
  return (
    <Wrapper $isMobile={isMobile}>
      <Container $isMobile={isMobile}>
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
      </Container>
    </Wrapper>
  );
};

export default Dawn;
