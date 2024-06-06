import styled from "styled-components";
import Seo from "../../components/Seo";

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 0 1rem;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const Container = styled.div`
  margin-top: 40px;
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;

const ContainerTitle = styled.h1`
  font-size: 22px;
  font-weight: bold;
`;

const Ul = styled.ul`
  padding-left: 1rem;
  margin: 1.25rem 0;
  list-style-position: inside;
  list-style-type: disc;
`;

const MiniUl = styled.ul`
  padding-left: 1rem;
  list-style-position: inside;
  list-style-type: disc;
`;

const Li = styled.li`
  margin: 0.75rem 0;
  line-height: 1.5;
  a {
    color: #0984e3;
  }
`;

const MiniTitle = styled.h2`
  font-size: 20px;
  line-height: 1.4;
  font-weight: bold;
  margin: 1.5rem 0;
`;

const MiniDescription = styled.p`
  line-height: 1.5;
`;

const MiniText = styled.h4`
  line-height: 1.5;
  margin: 1.25rem 0;
`;

const Table = styled.table`
  border-collapse: collapse;
`;

const Thead = styled.thead``;

const Th = styled.th`
  padding-bottom: 1rem;
`;

const Tbody = styled.tbody`
  border-left: 2px solid black;
`;

const Tr = styled.tr``;

const Td = styled.td`
  padding: 0.5rem 1.25rem;
  border-right-width: 2px;
  border-bottom-width: 2px;
  border-style: solid;
  border-color: black;
  line-height: 1.1;
  vertical-align: middle;
`;

const Ol = styled.ol`
  padding-left: 1rem;
`;

const Privacy = () => {
  return (
    <Wrapper>
      <Seo
        title="개인정보 처리방침"
        description="ArtifyThumbs의 개인정보 처리 방침을 확인하세요."
      />
      <Title>개인정보 처리방침</Title>
      <Container>
        <ContainerTitle>ArtifyThumbs 개인정보 처리방침</ContainerTitle>
        <Ul>
          <Li>
            유한회사 ArtifyThumbs (이하 "회사"라 합니다)는 『정보통신망 이용촉진
            및 정보보호 등에 관한 법률』, 『개인정보보호법』,
            『통신비밀보호법』, 『전기통신사업법』 등 정보통신서비스제공자가
            준수하여야 할 관련 법령 상의 개인정보보호 규정을 준수하며 최소한의
            정보만을 필요한 시점에 수집하고, 수집하는 정보는 고지한 범위
            내에서만 사용하며, 사전 동의 없이 그 범위를 초과하여 이용하거나
            외부에 공개하지 않는 등 "회원"의 권익 보호에 최선을 다하고 있습니다.
          </Li>
          <Li>
            "회사"는 개인정보취급방침을 통하여 "회원"이 제공하는 개인정보가
            어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한
            조치가 취해지고 있는지 알려드리고 개인정보취급방침을 개정하는 경우
            개정 이유 및 내용에 관하여 웹사이트를 통하여 고지합니다.
          </Li>
          <Li>"회사"는 아래와 같이 개인정보를 보호하고 있습니다.</Li>
        </Ul>
        <MiniTitle>
          1. "회사"는 이용하는 서비스의 형태에 따라 다음과 같은 개인정보를 수집
          및 이용∙제공∙파기하고 있습니다.
        </MiniTitle>
        <Ul>
          <Li>
            필수 수집 정보 : 서비스 아이디, 이메일, (SNS 계정으로 로그인 연동시)
            깃허브 계정을 비롯한 기타 소설 네트워크(SNS) 계정, 서비스 이용기록,
            쿠키, 세션
          </Li>
          <Li>
            선택 수집 정보 : 사진(메타 정보 포함), 성별, 나이, 생년월일, 프로필
            사진, 닉네임, 암호화된 이용자 확인값(CI)
          </Li>
        </Ul>
        <MiniTitle>
          2. 개인정보의 수집 및 이용 목적 – "회사"는 필요한 목적 범위 내에서만
          개인정보를 이용하고 있습니다.
        </MiniTitle>
        <Ul>
          <Li>가. 서비스의 기본 기능의 제공</Li>
          <Ul>
            <Li>
              "회사"는 "회원"의 로그인, 그림 신청 등 기본적인 기능을 제공하기
              위하여 "회원"의 개인정보를 이용합니다.
            </Li>
          </Ul>
          <Li>나. 회원관리</Li>
          <Ul>
            <Li>
              "회사"는 "회원"의 본인확인, 회원 식별, 콘텐츠 접근 권한의 차등
              적용, 고객 문의에 대한 회신, 각종 고지 사항 전달, 불량회원 제한,
              부정이용방지, 분쟁 조정을 위한 기록 보존 등의 목적으로 "회원"의
              개인정보를 이용합니다.
            </Li>
          </Ul>
          <Li>다. 법령 및 약관 등의 이행 및 준수</Li>
          <Ul>
            <Li>
              "회사"는 법령이나 이용약관 등에 반하여 피해를 줄 수 있는 부분을
              방지하기 위해서 정보로 수집된 정보들을 활용할 수 있습니다.
            </Li>
          </Ul>
        </Ul>
        <MiniTitle>
          3. "회사"는 원활한 서비스 제공과 효과적인 업무처리를 위하여 다음과
          같이 개인정보를 처리 위탁하고 있습니다.
        </MiniTitle>
        <MiniDescription>
          "회사"는 수탁자들이 위탁한 개인정보를 안전하게 처리하고 있는지
          지속적으로 관리 감독하고 있으며, 수탁업무가 종료된 때에 수탁자가
          보유하고 있는 개인정보는 즉시 파기하게 하고 있습니다.
        </MiniDescription>
        <MiniText>개인정보 처리 위탁 현황</MiniText>
        {/* <Table>
          <Thead>
            <Tr>
              <Th>구분</Th>
              <Th>수탁자</Th>
              <Th>위탁업무</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>서비스 운영 및 관리</Td>
              <Td>Discord</Td>
              <Td>서비스 운영 및 관리를 위해 활용</Td>
            </Tr>
            <Tr>
              <Td>콘텐츠 제공</Td>
              <Td>Firebase</Td>
              <Td>데이터, 이미지 등의 콘텐츠 제공을 위한 인프라</Td>
            </Tr>
            <Tr>
              <Td>서버 제공</Td>
              <Td>클라우드타입</Td>
              <Td>서비스 운영을 위한 인프라</Td>
            </Tr>
            <Tr>
              <Td>결제 처리</Td>
              <Td>토스페이먼츠</Td>
              <Td>신용카드, 실시간 계좌이체, 가상계좌 등을 통한 결제 처리</Td>
            </Tr>
          </Tbody>
        </Table> */}
        <MiniTitle>
          4. 원칙적으로 "회사"는 수집한 "회원"의 개인정보에 대해 보관해야 되는
          목적이 달성된 후, 즉시 해당 개인정보를 파기하고 있습니다.
        </MiniTitle>
        <MiniDescription>
          "회사"는 회원 가입 시 제공한 정보를 회원 가입시점부터 탈퇴 신청이
          접수된 날까지 보관할 수 있습니다. 개인정보의 파기 절차, 기한 및 방법은
          다음과 같습니다.
        </MiniDescription>
        <Ol>
          <Li>
            1. 회원이 회원탈퇴 요청 후 그 즉시 해당 회원에 대한 모든 정보가
            파기됩니다. 회원에 대한 모든 정보는 회원이 파기 요청을 접수하기
            전까지 보관됩니다. 또한, 사용자의 모든 정보는 안전하게 보관되며
            서비스 이용의 목적 이외의 목적으로는 이용되지 않습니다.
          </Li>
          <Li>
            2. 파기방법
            <Ul>
              <Li>
                전자적 파일 형태의 정보는 기록을 복원할 수 없는 기술적 방법을
                사용하여 영구 삭제합니다.
              </Li>
              <Li>
                종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여
                파기합니다.
              </Li>
            </Ul>
          </Li>
        </Ol>
        <MiniTitle>
          5. "회사"는 "회원"의 안정적인 정보보호를 위한 다양한 노력을 하고
          있습니다.
        </MiniTitle>
        <Ol>
          <Li>
            1. "회원"은 "회사" 서비스에서 직접 자신의 정보를 열람, 정정을 할 수
            있으며, 별도로 개인정보보호책임자에게 서면, 전화, 이메일 등을 통하여
            개인정보의 열람, 정정, 정지를 요청할 수 있습니다. "회원"은 언제든지
            회원가입 시 개인정보의 수집, 이용, 제공 등에 대해 동의한 의사표시를
            철회(회원탈퇴)할 수 있습니다.
          </Li>
          <Li>
            2. "회사"는 개인정보 보호를 위한 기술, 관리로 다음과 같은 물리적
            조치를 취합니다.
          </Li>
        </Ol>
        <MiniUl>
          <Li>
            가. 수집한 개인정보 중 본인임을 인증하는 정보에 대한 암호화 장치
          </Li>
          <Li>
            나. 개인정보 취급자에 대한 지정과 권한의 설정 및 교육, 개인정보의
            안전한 관리
          </Li>
        </MiniUl>
        <MiniTitle>6. 개인정보보호책임자의 성명, 연락처, 소속</MiniTitle>
        <MiniDescription>
          "회사"의 서비스를 이용하면서 발생한 모든 개인정보보호 관련 민원,
          불만처리 등에 관한 사항을 개인정보보호책임자 및 고객센터(문의하기)로
          문의할 수 있고, "회사"는 "회원"의 문의에 신속하고 성실하게
          답변하겠습니다.
        </MiniDescription>
        <Ol>
          <Li>
            1. 개인정보보호 책임자
            <Ol>
              <Li>1. 성명: 권대형</Li>
              <Li>
                2. 연락처:{" "}
                <a href="mailto:artifythumbs@gmail.com">
                  artifythumbs@gmail.com
                </a>
              </Li>
              <Li>3. 소속 : 유한회사 ArtifyThumbs</Li>
            </Ol>
          </Li>
          <Li>
            2. 기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래
            기관에 문의하시기 바랍니다.
            <Ol>
              <Li>
                1. 개인정보침해신고센터 (
                <a href="http://www.118.or.kr">http://www.118.or.kr</a> / 국번
                없이 118)
              </Li>
              <Li>
                2. 대검찰청 사이버범죄수사단 (
                <a href="http://www.spo.go.kr">http://www.spo.go.kr</a> /
                02-3480-2000)
              </Li>
              <Li>
                3. 경찰청 사이버테러대응센터 (
                <a href="http://www.ctrc.go.kr">http://www.ctrc.go.kr</a> /
                1566-0112)
              </Li>
            </Ol>
          </Li>
        </Ol>
        <MiniTitle>7. 고지의 의무</MiniTitle>
        <MiniDescription>
          서비스의 개선 혹은 목적에 따라 개인정보 취급방침에 변경사항이 생길 수
          있습니다. "회사"는 개인정보처리방침이 변경되는 경우에는 "회사"의
          사이트를 통하여 변경 및 시행의 시기, 변경 내용을 공지합니다. "회사"는
          변경 사항을 게시하며, 변경된 게시정보처리방침은 게시한 날로부터 7일
          이후에 효력이 발생하게 됩니다. 단, "회원"의 권리에 중요한 변경이 있을
          경우에는 변경될 내용을 30일 이전에 미리 알립니다.
        </MiniDescription>
        <Ol>
          <Li>1. 공고일자: 2024년 6월 1일</Li>
          <Li>2. 시행일자: 2023년 6월 8일</Li>
        </Ol>
      </Container>
    </Wrapper>
  );
};

export default Privacy;
