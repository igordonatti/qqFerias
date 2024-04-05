import { Header } from "../../Components/Header/Header";
import { ButtonIcon } from "../../Components/ButtonIcon/ButtonIcon";
import { Func } from "../../Components/FuncionarioExibir/Func";
import { Modal } from "../../Components/Modal/Modal";

import { BsPlusCircleFill } from 'react-icons/bs';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import { useEffect, useState } from 'react';

import { api } from "../../lib/axios";

import * as C from './SuperAdmin.styles';
import { ModalAddFunc } from "../../Components/ModalAddFunc/ModalAddFunc";

interface Form {
  name: string | null;
  email: string | null;
  cpf: string | null;
  matricula: string | null;
  cargo: string | null;
  setor: string;
  gestor: boolean;
  contrato: boolean;
}

export const _superAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);
  const [formValues, setFormValues] = useState<Form>({
    name: null,
    email: null,
    cpf: null,
    matricula: null,
    cargo: null,
    setor: 'Desenvolvimento',
    gestor: true,
    contrato: false
  });

  const getFuncionarios = async ():Promise<Array<string>> => {
    try { 
      const response = await api.get('/funcionarios');
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

  function handleClick(){
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <Header />

      <C.DivTop>
        <C.DivArrow>
          <AiOutlineArrowLeft/>
        </C.DivArrow>

        <C.DivButtonNewSol>
          <ButtonIcon 
            text="Novo Funcinário" 
            Icon={BsPlusCircleFill} 
            backColor="#018749" 
            handleClick={handleClick}
          />
        </C.DivButtonNewSol>
      </C.DivTop>

      <C.DivListFunc>
        {funcionarios.map((funcionario: any) => {
          return (<Func idFuncionario={funcionario.id} key={funcionario.id} name={funcionario.name} vacation={false} superAdmin={true}/>)
        })}
      </C.DivListFunc>

      <ModalAddFunc isOpen={isOpen} handleClick={handleClick}/>
    </div>
  )
}
