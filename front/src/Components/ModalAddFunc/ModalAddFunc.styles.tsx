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
  max-width: 800px;
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

export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  & > label {
    margin-bottom: 8px;
  }

  & > input,
  & > select {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export const FormSelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  & > label {
    margin-bottom: 8px;
  }

  & > select {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  background-color: #018749;
  color: white;
  font-size: 16px;
  padding: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: auto;
`;