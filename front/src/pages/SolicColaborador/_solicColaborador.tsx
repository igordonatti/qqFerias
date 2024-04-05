import { Header } from '../../Components/Header/Header';
import { ButtonIcon } from '../../Components/ButtonIcon/ButtonIcon';

import { ModalSolicCG } from '../../Components/ModalSolicCG/ModalSolicCG';

import { BsCash } from 'react-icons/bs';
import { AiFillPlusCircle } from 'react-icons/ai';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import { Solicitacao } from '../../Components/Solicitacao/Solicitacao';

import * as C from './solicColaborador.styles';
import { useEffect, useState, useContext } from 'react';
import { api } from '../../lib/axios';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/auth/useAuth';

interface Author {
  name: string;
}

interface solicFunc {
  id: string;
  author: Author;
  dataInicio: string;
  dataFinal: string;
  aprovada: number;
  solDecTerc: boolean;
}

interface FormData {
  dataInicio?: Date;
  dataFinal?: Date;
  solDecTerc: number;
  aprovada: number;
  authorId: string;
}

export const _solicColaborador = () => {
  const {user} = useAuth()
  const [isOpen, setIsOpen] = useState(false);
  const [solicitacoes, setSolicitacoes] = useState<solicFunc[]>([]);

  const getSolicitacoes = async ():Promise<Array<string>> => {
    try { 
      const response = await api.get(`/solicitacoesUsuario/${user.id}`);
      setSolicitacoes(response.data);
      return response.data;
    } catch(err) {
      console.log(err);
      alert("Falha ao encontrar as suas Solicitaçõoes.")
      setSolicitacoes([]);
      return [];
    }
  }

  const handleSubmitSolic = () => {
    api.post('/cadastrarSolicitacao', {
      dataInicio: new Date(),
      dataFinal: new Date(),
      solDecTerc: 0,
      aprovada: 0,
      authorId: user.id
    })
      .then(response => {
        console.log(response);
        alert('Solicitação enviada com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
      });
  }
  
  useEffect(() => {
    getSolicitacoes();
  }, []);

  function handleClick(){
    setIsOpen(!isOpen);
  }

  function handleClickLink(link: string){
    window.location.href = `http://127.0.0.1:5173/${link}`;
  }
  
  return (
    <>
      <Header />
      <C.DivTop>

        <C.DivArrow onClick={() => handleClickLink('inicio')}>
          <AiOutlineArrowLeft />
        </C.DivArrow>
      
        <C.DivButton>

          {user.tipoContrato && (
            <C.InsideButtonDiv onClick={handleSubmitSolic}>
            <ButtonIcon text='Solicitação 13º' Icon={ BsCash } backColor="#018749"/>  
            </C.InsideButtonDiv>
          )}
          

          <C.InsideButtonDiv onClick={handleClick}>
            <ButtonIcon text='Nova Solicitação' Icon={ AiFillPlusCircle } backColor="#018749" />  
          </C.InsideButtonDiv>

        </C.DivButton> 

      </C.DivTop>

      {
        solicitacoes.map((solicitacao => {
          return !solicitacao.solDecTerc ? '' : <Solicitacao 
          key={solicitacao.id} 
          name={solicitacao.author.name} 
          dateInit={format(new Date(solicitacao.dataInicio), 'dd/MM/yyyy')}
          dateEnd={format(new Date(solicitacao.dataFinal), 'dd/MM/yyyy')} 
          aprrove={solicitacao.aprovada}
        />
        }))
      }

      <ModalSolicCG isOpen={isOpen} handleClick={handleClick}/>
    </>
  )
}
