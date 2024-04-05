import { Input } from '../Input/Input';

import * as C from './Modal.styles';

import { AiOutlineCheck } from 'react-icons/ai';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@mui/material';
import { useState } from 'react';

interface modalProps {
  isOpen?: boolean;
  handleClick?: () => void;
}

const setores = [
  {
    id: '0',
    nomeSetor: 'FrontEnd',
    value: 'frontEnd'
  },
  {
    id: '1',
    nomeSetor: 'BackEnd',
    value: 'backEnd'
  },
  {
    id: '2',
    nomeSetor: 'Mobile',
    value: 'mobile'
  }
]

export const Modal = (props:modalProps) => {
  
  const handleClick = () => {
    
  }
  
  return (
    <C.DivBlock style={{
      display: props.isOpen ? 'flex' : 'none'
    }}>
      <C.Modal>

        <C.DivClose onClick={props.handleClick}>
          <C.Close>
            X
          </C.Close>
        </C.DivClose>

        <C.DivButton>
          <C.TitleButton>Nome</C.TitleButton>
          <Input 
            typeInput='text' 
            backColor='#FFFFFF' 
            widthInput={500} 
            heightInput={40} 
            border='1px #018749 solid' 
            font={20} 
            fontColor="#018749"
          />
        </C.DivButton>

        <C.DivButton>
          <C.TitleButton>Email</C.TitleButton>
          <Input 
            typeInput='text' 
            backColor='#FFFFFF' 
            widthInput={500} 
            heightInput={40} 
            border='1px #018749 solid' 
            font={20} 
            fontColor="#018749"
          />
        </C.DivButton>

        <C.DivButton>
          <C.TitleButton>CPF</C.TitleButton>
        
          <C.DivMoreButtons>

            <Input 
              typeInput='text' 
              backColor='#FFFFFF' 
              widthInput={250} 
              heightInput={40} 
              border='1px #018749 solid' 
              font={20} 
              fontColor="#018749"
            />

            <FormControl 
              sx = {{
                width: '200px',
                marginLeft: '10px',
              }}
            >
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Setor
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: 'setor',
                  id: 'uncontrolled-native',
                }}
              >
                {setores.map((setor) => {
                  return (<option key={setor.id} value={setor.value}>{setor.nomeSetor}</option>)
                })}
              </NativeSelect>
            </FormControl>

            </C.DivMoreButtons>
          </C.DivButton>

        <C.DivButton>
          <C.TitleButton>Matrícula</C.TitleButton>
          <C.DivMoreButtons>

          <Input 
            typeInput='text' 
            backColor='#FFFFFF' 
            widthInput={250} 
            heightInput={40} 
            border='1px #018749 solid' 
            font={20} 
            fontColor="#018749"
          />
          
            <FormControl 
              sx = {{
                width: '200px',
                marginLeft: '10px',
              }}
            >
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Gestor
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: 'gestor',
                  id: 'uncontrolled-native',
                }}
              >
                <option value={0}>Sim</option>
                <option value={1}>Não</option>
              </NativeSelect>
            </FormControl>

          </C.DivMoreButtons>

        </C.DivButton>
        
        <C.DivButton>
          <C.TitleButton>Cargo</C.TitleButton>
          <Input 
            typeInput='text' 
            backColor='#FFFFFF' 
            widthInput={250} 
            heightInput={40} 
            border='1px #018749 solid' 
            font={20} 
            fontColor="#018749"
          />

            <FormControl 
              sx = {{
                width: '200px',
                marginLeft: '10px',
              }}
            >
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Contrato
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: 'contrato',
                  id: 'uncontrolled-native',
                }}
              >
                <option value={0}>CLT</option>
                <option value={1}>PJ</option>
              </NativeSelect>
            </FormControl>
        </C.DivButton>


        <C.DivAddButton onClick={handleClick}>
          <ButtonIcon 
            Icon={AiOutlineCheck} 
            text="Adicionar" 
            backColor='#018749'
            widthButton={200} 
            heightButton={50}
          />
        </C.DivAddButton>

      </C.Modal>
    </C.DivBlock>
  )
}
