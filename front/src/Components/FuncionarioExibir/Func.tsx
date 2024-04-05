import { BsFillPersonFill } from 'react-icons/bs';
import { BsFillTrashFill } from 'react-icons/bs';

import * as C from './Func.styles';
import { api } from '../../lib/axios';

interface FuncProps {
  name: string;
  vacation: boolean;
  thrash?: boolean;
  superAdmin?: boolean;
  idFuncionario?: string;
}

export const Func = (props : FuncProps) => {
  const backColor:string = props.vacation ? '#BDBDBD' : '#018749'
  const backColorPerson:string = props.vacation ? '#BDBDBD' : 'rgb(255, 249, 108, 0.65)'

  const handleClick = async (idFuncionario: string) => {
    const confirmacao = window.confirm('Certeza que deseja remover o funcionario?');

    if(confirmacao){
      try {
        const response = await api.post('/deletarFuncionario', {
          idFuncionario: idFuncionario,
        });
        return response;
      } catch (err) {
        alert("Falha ao deletar funcionário.")
        return 0;
      }
    } else {
      return
    }
  }

  return (
    <C.DivBlock>
      <C.DivDetails theme={{ Background: backColor }}>

        <C.divPerson>
          <C.CirclePerson theme={{ Background: backColorPerson }}>
            <BsFillPersonFill size={30} color='white'/>
          </C.CirclePerson>

          <C.NameFunc>{props.name}</C.NameFunc>
        </C.divPerson>

        {
          props.superAdmin ? 
          (
            <C.divTrashHelper>
              <C.divTrash onClick={() => handleClick(props.idFuncionario || '')}>        
                <BsFillTrashFill size={24} color='white'/>
              </C.divTrash>
            </C.divTrashHelper>
          ) : ''
        }

      
      </C.DivDetails>

    </C.DivBlock>
  )
}
