import Seo from "../components/Seo";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

const Container = styled.div`
  width: 800px;
  height: 500px;
  border: 1px solid #74b9ff;
  border-radius: 15px;
  position: relative;
  box-shadow: 15px -15px #74b9ff;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  padding: 40px;
  &:hover {
    border-color: #a29bfe;
    box-shadow: 20px -20px #a29bfe;
  }
`;

const Back = styled(Link)`
  color: white;
  background-color: #0984e3;
  text-decoration: none;
  font-size: 17px;
  position: absolute;
  left: 2px;
  top: -14px;
  padding: 6px 10px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;
  &:hover {
    background-color: #3b9cfd;
  }
`;

const Title = styled.h1`
  font-size: 35px;
  font-weight: bold;
`;

const Email = styled.h2`
  font-size: 18px;
  margin-top: 30px;
`;

const Description = styled.p`
  margin-top: 40px;
  line-height: 1.3;
  word-break: break-all;
  overflow-y: auto;
  max-height: 270px;
`;

const InquiryManage = styled.div`
  position: absolute;
  right: 35px;
  bottom: 15px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  button {
    border: none;
    color: white;
    padding: 8px 10px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const InquiryStatusManage = styled.button`
  background-color: ${(props) => (props.$isAnswered ? "#ff3838" : "#20bf6b")};
`;

const InquiryDelete = styled.button`
  background-color: #ff3838;
`;

const DetailInquiry = () => {
  const userData = useRecoilValue(userAtom);
  const { inquiryId } = useParams();
  const [inquiry, setInquiry] = useState(null);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const [docRef, setDocRef] = useState(null);
  const [isStatusLoading, setStatusLoading] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const navigate = useNavigate();
  const fetchInquiry = useCallback(async () => {
    const docRef = doc(db, "inquiries", inquiryId);
    setDocRef(docRef);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (!userData) return;
      if (userData.isAdmin) {
        setInquiry(data);
        setIsAnswered(data.isAnswered);
      } else {
        alert("권한 없음");
        navigate("/");
      }
    }
  }, [inquiryId, navigate, userData]);
  useEffect(() => {
    fetchInquiry();
  }, [fetchInquiry]);
  const onDelete = async () => {
    if (
      !docRef ||
      isDeleteLoading ||
      !window.confirm("정말로 해당 문의를 삭제하시겠습니까?")
    )
      return;
    try {
      setDeleteLoading(true);
      await deleteDoc(docRef);
    } catch (e) {
      console.error(e);
      alert(`삭제 에러: ${e}`);
    } finally {
      setDeleteLoading(false);
      navigate("/inquiry-management");
    }
  };
  const toggleStatus = async () => {
    if (!docRef || isStatusLoading) return;
    try {
      setStatusLoading(true);
      await updateDoc(docRef, { isAnswered: !isAnswered });
      setIsAnswered((prev) => !prev);
    } catch (e) {
      console.error(e);
      alert(`상태 에러: ${e}`);
    } finally {
      setStatusLoading(false);
    }
  };
  return (
    <>
      <Seo title={inquiry ? inquiry.title : "로딩 중.."} />
      {inquiry ? (
        <Wrapper>
          <Container>
            <Back to="/inquiry-management">
              <FontAwesomeIcon icon={faRotateBack} /> 뒤로가기
            </Back>
            <Title>{inquiry.title}</Title>
            <Email>이메일: {inquiry.email}</Email>
            <Description>{inquiry.content}</Description>
            <InquiryManage>
              <InquiryStatusManage
                onClick={toggleStatus}
                $isAnswered={isAnswered}
              >
                {isAnswered ? "문의 완료 취소" : "문의 완료"}
              </InquiryStatusManage>
              <InquiryDelete onClick={onDelete}>문의 삭제</InquiryDelete>
            </InquiryManage>
          </Container>
        </Wrapper>
      ) : null}
    </>
  );
};

export default DetailInquiry;
