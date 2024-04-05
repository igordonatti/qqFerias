import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DivLogin = styled.div`
  height: 703px;
  width: 793px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  background-color: #018749;
  border-radius: 16px;
  color: white;
  font-weight: bold;
  align-items: center;
`;

export const P = styled.p`
  font-size: 40px;
`;

export const Label = styled.label`
  margin-bottom: 8px;
  font-size: 16px;
`;

export const InputField = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  width: 600px;
  height: 50px;
  border-radius: 4px;
  font-size: 16px;
  color: black;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #0077cc;
  }
`;