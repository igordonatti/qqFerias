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
  height: 400px;
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

export const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledInput = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 500px;
  max-width: 280px;
`;

export const StyledSelect = styled.select`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 500px;
  max-width: 300px;
`;

export const StyledButton = styled.button`
  background-color: #018749;
  padding: 10px;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 500px;
  max-width: 300px;
  font-weight: bold;
  font-size: 16px;
`;

export const StyledParagraph = styled.p`
  font-size: 20px;
  margin-top: 20px;
  color: "black";
`;