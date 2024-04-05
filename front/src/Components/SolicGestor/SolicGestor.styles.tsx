import styled from "styled-components";

export const DivBloco = styled.div`
  display: flex;
  justify-content: center;
`;

export const DivSolic = styled.div`
  height: 60px;
  width: 1000px;
  background-color: #018749;
  margin-top: 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`;  

export const DivDetails = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 4px;
`;

export const divDetailsFirst = styled.div`
  display: flex;
`;

export const TextName = styled.h3`
  color: #FFFFFF;
  font-size: 24px;
  font-weight: bold;
  margin-left: 15px;
`;

export const DateName = styled.p`
  color: #FFFFFF;
  font-size: 16px;
  margin-left: 15px;
`;

export const DivDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: #FFFFFF;
    margin-left: 10px;
  }
`;

export const DivButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: 18px;
  margin-right: 20px;
`;

export const divMensagem = styled.div`
  background-color: white;
  width: 400px;
  height: 200px;
  margin-left: 20px;
  margin-top: 20px;
  border-radius: 16px;
  display: flex;
`;

export const mensagem = styled.p`
  margin-left: 20px;
  font-weight: bold;
  margin-top: 10px;
`;

export const resultadoDiv = styled.div`
  width: 200px;
  height: 40px;
  border-radius: 16px;
  margin-left: 75%;
  display: flex;
  font-weight: bold;
  margin-bottom: 20px;
`;