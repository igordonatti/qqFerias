import * as C from './SolicGestor.styles';

import { Input } from '../Input/Input';
import { BsFillTrashFill } from 'react-icons/bs';

import { AiOutlineArrowRight } from 'react-icons/ai';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { api } from '../../lib/axios';

interface solicProps {
  name: string;
  dateInit: string;
  dateEnd: string;
  id: string;
}

export const SolicGestor = (props : solicProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(){
    setIsOpen(!isOpen);
  }
  
  const updateSolicitacao = async (solicitacaoId: string, aprovadaValue: number) => {
    try {
      const response = await api.put(`alterarStatutsSolic`,
        { 
          id: solicitacaoId,
          aprovada: aprovadaValue 
        });
      alert('Status da solicitação alterada com sucesso!!');
      console.log('Aceito ou negado')
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <C.DivBloco>
      
        <C.DivSolic
          style={{
            height: isOpen ? '300px' : '60px'
          }}
        >
          <C.divDetailsFirst>
            <C.DivDetails>
              <C.TextName>{props.name}</C.TextName>
              <C.DivDate>
                <C.DateName>{props.dateInit}</C.DateName>
                <AiOutlineArrowRight/>
                <C.DateName>{props.dateEnd}</C.DateName>
              </C.DivDate>    
            </C.DivDetails>
            
            <C.DivButton>
              <AiOutlineMenu cursor="pointer" color='white' size={25} onClick={handleClick}/>
            </C.DivButton>
          </C.divDetailsFirst>

          {
            isOpen ?
             (
              <>
                <C.resultadoDiv>
                  <Button 
                    text='Aceitar' 
                    backColor='#EAEFEB' 
                    textColor='#018749' 
                    widthButton={300} 
                    heightButton={40} 
                    font={20}
                    handleClick={() => updateSolicitacao(props.id, 1)}
                  />
                  <Button 
                    text='Negar' 
                    backColor='#FF0000' 
                    textColor='white' 
                    widthButton={300} 
                    heightButton={40} 
                    font={20}
                    handleClick={() => updateSolicitacao(props.id, 2)}
                  />
                </C.resultadoDiv>
              </>
             ) 
             : 
             ''
          }
        </C.DivSolic>
        
      </C.DivBloco>
    )
}
