import { Header } from '../../Components/Header/Header';
import { ButtonIcon } from '../../Components/ButtonIcon/ButtonIcon';
import { Notification } from '../../Components/Notification/Notification'
import * as C from './initColaborador.styles.';

import {useState, useEffect} from 'react';

import { AiOutlineInbox } from 'react-icons/ai';
import { AiOutlineUnorderedList } from 'react-icons/ai';

import { _solicColaborador } from '../SolicColaborador/_solicColaborador';
import { useAuth } from '../../hooks/auth/useAuth';
import { api } from '../../lib/axios';

export const _initColaborador = () => {
  const {user} = useAuth()
  const [diasDispo, setDiasDisp] = useState(0);
  const getPeriodoFaltoso = useState(0);

  const getDiasDispo =async () => {
    try {
      const response = await api.get(`solic/diasDisponiveis/${user.id}`);
      setDiasDisp(response.data.diasFerias);
    }catch(err){
      console.log(err);
      setDiasDisp(0);
    }
  }

  const getInfo2Anos =async () => {
    try {
      const response = await api.get(`solic/infoDoisAnos/${user.id}`);
      if(response.data.hasSoli === false) {
        alert('Você está prestes a acumular dois anos sem retirar férias')
        await api.post('message/enviarMensagemDoisAnos', {user})
      }
    }catch(err){
      console.log(err);
      setDiasDisp(0);
    }
  }

  useEffect(() => {
    getDiasDispo();
    getInfo2Anos();
  }, [])
  

  function handleClickLink(link: string){
    window.location.href = `http://127.0.0.1:5173/${link}`;
  }

  return (
    <>
      <Header />
      <C.DivContainer>
        <C.Div>
            <C.DivButton onClick={() => handleClickLink('solicitacaoColaborador')}>
              <ButtonIcon Icon={AiOutlineInbox} text='Solicitações' backColor='#018749' heightButton={100}/>
            </C.DivButton>

            <C.DivButton onClick={() => handleClickLink('listaFuncionarios')}>
              <ButtonIcon Icon={AiOutlineUnorderedList} text='Lista de Func' backColor='#018749' heightButton={100}/>
            </C.DivButton>        
        </C.Div>
        <C.divNotification>
          <>
            <C.title>Quantidade de dias Disponiveis</C.title>
            <C.diasDispo>{diasDispo}</C.diasDispo>
          </>
        </C.divNotification>
      </C.DivContainer>
    </>  
  ) 
}
