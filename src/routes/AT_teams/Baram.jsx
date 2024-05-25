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

const Baram = () => {
  const isMobile = useRecoilValue(isMobileAtom);
  return (
    <Wrapper $isMobile={isMobile}>
      <Container $isMobile={isMobile}>
        <Back to="/about">
          <FontAwesomeIcon icon={faRotateBack} />
          뒤로가기
        </Back>
        <Header>
          <Avatar $src="/img/workers/wind.jpeg" />
          <Name>바람</Name>
        </Header>
        <Introduction>
          <span>소개글:</span> 하루 24시간중 12시간을 자니까 100년을 산다면
          50년을 자는겁니다.
        </Introduction>
      </Container>
    </Wrapper>
  );
};

export default Baram;
