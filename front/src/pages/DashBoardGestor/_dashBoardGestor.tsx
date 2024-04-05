import { AiOutlineInbox, AiOutlineUnorderedList } from "react-icons/ai";
import { MdOutlineOpenInNew } from 'react-icons/md';

import { ButtonIcon } from "../../Components/ButtonIcon/ButtonIcon";
import { Header } from "../../Components/Header/Header";
import { CustomizedMenus } from '../../Components/StyledMenu/StyledMenu'

import * as C from './dashBoardGestor.styles';
import { useEffect, useState } from 'react';

import { useAuth } from "../../hooks/auth/useAuth";
import { api } from "../../lib/axios";
import { format } from 'date-fns';

interface Funcionario {
  id: string;
  name: string;
}

interface Solicitacao {
  authorId: string;
  id: string;
  author: {
    name: string;
  }
}

interface Ferias {
  dataFinal: Date,
  dataInicio: Date,
  author: {
    name: string;
  }
}

export const _dashBoardGestor = () => {
  const {user} = useAuth();
  const [funcionariosTrabalhando, setFuncionariosTrabalhando] = useState(0);
  const [funcionariosFerias, setFuncionariosFerias] = useState(0);
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [feriasProximas, setFeriasProximas] = useState<Ferias[]>([]);

  const getFuncionariosTrabalhando = async () => {
    try {
      const response = await api.get(`/funcionariosTrabalhando/${user.setor}`);
      setFuncionariosTrabalhando(response.data);
    } catch(err) {
      console.log(err);
      alert("Falha ao encontrar os Funcionários.")
      setFuncionariosTrabalhando(0);
      return 0;
    }
  }

  const getFuncionariosFerias = async () => {
    try {
      const response = await api.get(`/funcionariosFerias/${user.setor}`);
      setFuncionariosFerias(response.data);
    } catch(err) {
      console.log(err);
      alert("Falha ao encontrar os Funcionários.")
      setFuncionariosFerias(0);
    }
  }

  const getSolicitacoes = async ():Promise<Array<string>> => {
    try { 
      const response = await api.get(`/solicitacoesSetor/${user.setor}`);
      setSolicitacoes(response.data);
      return response.data;
    } catch(err) {
      console.log(err);
      alert("Falha ao encontrar as Solicitacoes.")
      setSolicitacoes([]);
      return [];
    }
  }

  const getFeriasProximas = async () => {
    try{
      const response = await api.get(`feriasProximas/${user.setor}`)
      setFeriasProximas(response.data);
    } catch(err){
      console.log(err);
      alert('Falha ao encontrar férias próximas');
      setFeriasProximas([]);
    }
  }

  useEffect(()=> {
    getFeriasProximas();
  }, [])

  useEffect(() => {
    getSolicitacoes();
  }, []);

  useEffect(() => {
    getFuncionariosFerias();
  }, []);

  useEffect(() => {
    getFuncionariosTrabalhando();
  }, []);

  function handleClickLink(link: string){
    window.location.href = `http://127.0.0.1:5173/${link}`;
  }

  return (
    <div>
      <Header />
      <C.container>
        <C.firstDiv>
          <C.divButton onClick={() => handleClickLink('solicGestor')}>
            <ButtonIcon 
              Icon={AiOutlineInbox} 
              text='Solicitações' 
              backColor='#018749' 
              heightButton={60}
            />
          </C.divButton>
          
          <C.divButton onClick={() => handleClickLink('listaFuncionarios')}>
            <ButtonIcon 
              Icon={AiOutlineUnorderedList} 
              text='Lista de Func'
              backColor='#018749' 
              heightButton={60}
            />
          </C.divButton>

          <C.lastSolic>
            <C.divTitle>Últimas Solicitações</C.divTitle>
            {solicitacoes && solicitacoes.map((solicitacao) => {
              return (
                <C.divSolic key={solicitacao.id}>
                  <C.divName>
                    <C.name>{solicitacao.author.name}</C.name>
                  </C.divName>
                  <C.open onClick={() => handleClickLink('solicGestor')}>
                    <MdOutlineOpenInNew />
                  </C.open>
                </C.divSolic>
              )
            })}
          </C.lastSolic>
        </C.firstDiv>

        <C.secondDiv>
          <C.divFeriasProx>
            <C.divTitle>Férias Próximas</C.divTitle>
            {
              feriasProximas && feriasProximas.map((ferias) => {
                return(
                  <C.divFunciProx>
                    <C.divFunc>
                      <C.name>{ferias.author.name}</C.name>
                      <C.date>{format(new Date(ferias.dataInicio), 'dd/MM')} {format(new Date(ferias.dataFinal), 'dd/MM')}</C.date>
                    </C.divFunc>
                  </C.divFunciProx>
                )
              })
            }
          </C.divFeriasProx>

          <C.divInfos>
            <C.divQuadrado>
              <C.titleQuadrado>Trabalhando</C.titleQuadrado>
              <C.number>{funcionariosTrabalhando}</C.number>
            </C.divQuadrado>

            <C.divQuadrado>
              <C.titleQuadrado>De férias</C.titleQuadrado>
              <C.number>{funcionariosFerias}</C.number>
            </C.divQuadrado>
          </C.divInfos>
        </C.secondDiv>
      </C.container>
      <CustomizedMenus />
    </div>
  )
}
