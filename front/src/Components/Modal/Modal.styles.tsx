import styled from "styled-components";

export const DivBlock = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(0,0,0,.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  background: #EAEFEB;
  width: 80vw;
  max-width: 600px;
  height: 600px;
  padding: 40px;
  box-shadow: 0 0 0 10px #EAEFEB;
  position: relative;
  box-sizing: border-box;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const DivClose = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  cursor: pointer;
`;

export const Close = styled.div`
  height: 40px;
  width: 40px;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: large;
  border-radius: 50%;

`;

export const DivButton = styled.div`
  margin-top: 15px;
`;

export const TitleButton = styled.h3`
  color: #018749;
`; 

export const DivMoreButtons = styled.div`
  display: flex;
  align-items: center;
`;

export const DivAddButton = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: end;
  margin-right: 20px;
`;