import styled from "styled-components";

export const DivTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

export const DivArrow = styled.div`
  background-color: #018749;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-left: 20px;
  svg {
    width: 40px;
    height: 40px;
    color: #FFFFFF;
  }
  cursor: pointer;
`;

export const DivButton = styled.div`
  width: 100vw;
  justify-content: end;
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

export const InsideButtonDiv = styled.div`
  margin-left: 20px;
`;
