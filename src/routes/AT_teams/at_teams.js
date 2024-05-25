import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: ${(props) => (props.$isMobile ? "center" : "flex-start")};
  min-height: 100vh;
  padding-top: 140px;
  margin-bottom: 60px;
`;

export const Container = styled.div`
  padding: 0 ${(props) => (props.$isMobile ? "15px" : "80px")};
  box-sizing: border-box;
  width: 100vw;
`;

export const Back = styled(Link)`
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

export const Header = styled.header`
  margin-top: 30px;
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const Avatar = styled.div`
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;
  height: 150px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
`;

export const Name = styled.h1`
  font-size: 50px;
  font-weight: bold;
`;

export const Introduction = styled.h2`
  margin-top: 30px;
  font-size: 20px;
  line-height: 1.4;
  span {
    font-weight: bold;
  }
`;
