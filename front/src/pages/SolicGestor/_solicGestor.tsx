import { AiFillPlusCircle, AiOutlineArrowLeft } from "react-icons/ai";
import { BsCash } from "react-icons/bs";
import { ButtonIcon } from "../../Components/ButtonIcon/ButtonIcon";
import { Header } from "../../Components/Header/Header"
import { SolicGestor } from "../../Components/SolicGestor/SolicGestor";
import { SearchBar } from "../../Components/SearchBar/SearchBar";

import * as C from './_solicGestor.styles';
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ModalSolicCG } from "../../Components/ModalSolicCG/ModalSolicCG";
import { useAuth } from "../../hooks/auth/useAuth";

interface Solicitacao {
  author: {
    name: string;
  };
  dataInicio: string;
  dataFinal: string;
  id: string;
}

interface FormData {
  dataInicio?: Date;
  dataFinal?: Date;
  solDecTerc: number;
  aprovada: number;
  authorId: string;
}

export const _solicGestor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const {user} = useAuth()
  const [formValues, setFormValues] = useState<FormData>({
    dataInicio: new Date(),
    dataFinal: new Date(),
    solDecTerc: 0,
    aprovada: 0,
    authorId: user.id
  });

  
  const getSolicitacoes = async ():Promise<Array<string>> => {
    try { 
      const response = await api.get(`/solicitacoesSetor/${user.setor}`);
      setSolicitacoes(response.data);
      return response.data;
    } catch(err) {
      console.log(err);
      alert("Falha ao encontrar as Solicitações.")
      setSolicitacoes([]);
      return [];
    }
  }

  useEffect(() => {
    getSolicitacoes();
  }, [solicitacoes]);

  function handleClick(){
    setIsOpen(!isOpen)
  }  

  function handleClickLink(link: string){
    window.location.href = `http://127.0.0.1:5173/${link}`;
  }

  return (
      <>
      <Header />
      <C.DivTop>

        <C.DivArrow onClick={() => handleClickLink('dashboard')}>
          <AiOutlineArrowLeft />
        </C.DivArrow>
      
        <C.DivButton>
          {user.tipoContrato && (
            <C.InsideButtonDiv>
            <ButtonIcon text='Solicitação 13º' Icon={ BsCash } backColor="#018749"/>  
            </C.InsideButtonDiv>
          )}
          

          <C.InsideButtonDiv onClick={handleClick}>
            <ButtonIcon text='Nova Solicitação' Icon={ AiFillPlusCircle } backColor="#018749" />  
          </C.InsideButtonDiv>

        </C.DivButton> 

      </C.DivTop>
      <div>
        { 
          solicitacoes.map((solicitacao) => {
            return (
            <SolicGestor 
              dateInit={format(new Date(solicitacao.dataInicio), 'dd/MM/yyyy')}
              dateEnd={format(new Date(solicitacao.dataFinal), 'dd/MM/yyyy')}
              name={solicitacao.author.name}
              key={solicitacao.id}
              id={solicitacao.id}
            />
            )
          })
        }
      </div>

      <ModalSolicCG isOpen={isOpen} handleClick={handleClick}/>
    </>
  )
}
