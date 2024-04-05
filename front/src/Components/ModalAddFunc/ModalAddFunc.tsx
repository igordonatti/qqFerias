import { AiOutlineCheck } from 'react-icons/ai';
import * as C from './ModalAddFunc.styles';
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from '../Input/Input';
import { api } from '../../lib/axios';
import { addDays, formatISO, parse } from 'date-fns';

interface modalProps {
  isOpen?: boolean;
  handleClick?: () => void;
}

type Inputs = {
  name: string,
  email: string,
  cpf_cnpj: string,
  matricula: string,
  cargo: string,
  setor: string,
  gestorBool: boolean | number,
  tipoContrato: boolean | number,
  senha: string,
  dataContratacao: Date
};

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

export const ModalAddFunc = (props:modalProps) => {
  const { register, handleSubmit,  setValue, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formatedData = {
      ...data,
      gestorBool: data.gestorBool == 0 ? false : true,
      tipoContrato: data.tipoContrato == 1 ? true : false,
    }
    api.post('/cadastrarFuncionario', formatedData)
      .then(response => {
        console.log(response);
        alert('Funcionário adicionado com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao cadastrar funcionário, confira os dados!')
      });
   console.log(formatedData);
  };

  const updateValue = (e: any) => {
    const { name, value } = e.target;
    // Faça a alteração desejada aqui
    const newValue = formatISO(parse(value,'yyyy-MM-dd', new Date()));
    // Atualize o valor do campo no formulário
    setValue(name, newValue);
  };

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

        <C.Form onSubmit={handleSubmit(onSubmit)}>
          <C.FormGroup>
            <label>Nome</label>
            <input type="text" {...register('name', {required: true})}/>
          </C.FormGroup>
          
          <C.FormGroup>
            <label>Email</label>
            <input type="email" {...register('email', {required: true})}/>
          </C.FormGroup>

          <C.FormGroup>
            <label>CPF / CNPJ</label>
            <input type="text" {...register('cpf_cnpj', {required: true})}/>
          </C.FormGroup>
          
          <C.FormSelectGroup>
            <label>Contrato</label>
            <select {...register('tipoContrato')}>
              <option value={0}>CLT</option>
              <option value={1}>PJ</option>
            </select>
          </C.FormSelectGroup>

          <C.FormSelectGroup>
            <label>Gestor</label>
            <select {...register('gestorBool')}>
              <option value={0}>SIM</option>
              <option value={1}>NAO</option>
            </select>
          </C.FormSelectGroup>

          <C.FormSelectGroup>
            <label>Setor</label>
            <select {...register('setor')}>
              {
                setores.map((setor) => {
                  return (
                    <option key={setor.id} value={setor.value}>{setor.nomeSetor}</option>
                  )
                })
              }
            </select>
          </C.FormSelectGroup>

          <C.FormGroup>
            <label>Matricula</label>
            <input type="text" {...register('matricula', {required: true})}/>
          </C.FormGroup>
          
          <C.FormGroup>
            <label>Cargo</label>
            <input type="text" {...register('cargo', {required: true})}/>
          </C.FormGroup> 

          <C.FormGroup>
            <label>Data Contratação</label>
            <input onChange={updateValue} type="date" name='dataContratacao'/>
          </C.FormGroup>
        </C.Form>
        <C.SubmitButton {...register('senha', {value: '123123'})} onClick={handleSubmit(onSubmit)}>Enviar</C.SubmitButton>
      </C.Modal>
    </C.DivBlock>
  )
}
