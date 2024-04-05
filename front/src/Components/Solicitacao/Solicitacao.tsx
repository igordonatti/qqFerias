import * as C from './Solicitacao.styles';

import { AiOutlineArrowRight } from 'react-icons/ai';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';

interface solicProps {
  name: string;
  dateInit: string;
  dateEnd: string;
  aprrove: number;
}

export const Solicitacao = (props : solicProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(){
    setIsOpen(!isOpen);
  }
  
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
              <AiOutlineMenu color='white' size={25} onClick={handleClick}/>
            </C.DivButton>
          </C.divDetailsFirst>

          {
            isOpen ?
             (
              <>
                <C.divMensagem>
                  <C.mensagem>Mensagem</C.mensagem>  
                </C.divMensagem>
                <C.resultadoDiv
                  style={{
                    backgroundColor: (props.aprrove === 0 ? '#EAEFEB' : '') ||
                    (props.aprrove === 2 ? '#FF0000' : '') || 
                    (props.aprrove === 1 ? '#EAEFEB' : ''),
                    color: (props.aprrove === 1 ? '#018749' : '') ||
                    (props.aprrove === 2 ? 'white' : '') || 
                    (props.aprrove === 0 ? '#018749' : ''),
                  }}
                >
                  {
                    (props.aprrove === 0 ? 'Na espera' : '') ||
                    (props.aprrove === 1 ? 'Aprovado' : '') || 
                    (props.aprrove === 2 ? 'Negado' : '')
                  }
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
