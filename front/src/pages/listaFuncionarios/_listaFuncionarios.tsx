import { Func } from "../../Components/FuncionarioExibir/Func";
import { Header } from "../../Components/Header/Header"
import { SearchBar } from "../../Components/SearchBar/SearchBar";
import { api } from "../../lib/axios";
import { useEffect, useState } from 'react';
import { useAuth } from "../../hooks/auth/useAuth";

import * as C from './listaFuncionario.styles';

import {AiOutlineArrowLeft} from 'react-icons/ai';

export const _listaFuncionarios = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const { user } = useAuth();

  function handleClickLink(link: string){
    window.location.href = `http://127.0.0.1:5173/${link}`;
  }

  const getFuncionarios = async ():Promise<Array<string>> => {
    try { 
      const response = await api.get(`/funcionariosSetor/${user.setor}`);
      console.log(response);
      setFuncionarios(response.data);
      return response.data;
    } catch(err) {
      console.log(err);
      alert("Falha ao encontrar os Funcionários.")
      setFuncionarios([]);
      return [];
    }
  }

  useEffect(() => {
    getFuncionarios();
  }, []);

  return (
    <div>
      <Header />

      <C.DivTop>
        <C.DivArrow onClick={() => handleClickLink(user.gestorBool ? 'dashboard' : 'inicio')}>
            <AiOutlineArrowLeft />
        </C.DivArrow>
      <SearchBar/>
      
      </C.DivTop>

      {funcionarios.map((funcionario: any) => {
        return <Func name={funcionario.name} vacation={false} key={funcionario.id}/>
      })}
    </div>
  )
}
