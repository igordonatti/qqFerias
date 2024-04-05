import styled from "styled-components";

export const Input = styled.input`
  background-color: rgb(255, 249, 108, 0.65);
  border-radius: 16px;

  outline: none;
  border: none;

  width: 648px;
  height: ${props => props.height || 98}px;

  font-size: 40px;
  color: #EAEFEB;
  word-wrap:break-word; 
`;

const theme = {
  bc: "rgb(255, 249, 108, 0.65)",
  tc: "#EAEFEB"
}

const recusado = {
  bc: "#FF0000",
  tc: "#EAEFEB"
}

const aceito = {
  bc: "#018749",
  tc: "#EAEFEB"
}

const espera = {
  bc: "#EAEFEB",
  tc: "#018749"
}