import styled from "styled-components";

export const DivBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const DivDetails = styled.div`
  display: flex;
  width: 1100px;
  height: 56px;
  margin-left: 40px;
  border-radius: 16px;
  background-color: ${props => props.theme.Background};
  align-items: center;
`;

export const divPerson = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const CirclePerson = styled.div`
  display: flex;
  background-color: ${props => props.theme.Background};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

export const NameFunc = styled.h3`
  color: white;
  margin-left: 10px;
`;

export const divTrashHelper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;

export const divTrash = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FF0000;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 20px;
`;

DivDetails.defaultProps = {
  theme: {
    Background: '#018749'
  }
}

const theme = {
  Background: '#BDBDBD'
}