import { Input } from '../Input/Input';
import { formatISO, parse, addDays, format } from 'date-fns'

import * as C from './ModalSolicCG.styles';

import { AiOutlineCheck } from 'react-icons/ai';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { InputLabel, NativeSelect, Select } from '@mui/material';
import { api } from '../../lib/axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/auth/useAuth';

interface modalProps {
  isOpen?: boolean;
  handleClick?: () => void;
}

interface FormData {
  dataInicio?: Date;
  dataFinal?: Date;
  solDecTerc: number;
  aprovada: number;
  authorId: string;
}

export const ModalSolicCG = ({isOpen, handleClick}: modalProps) => {
  const { register, handleSubmit } = useForm();
  const [selectedDateInicio, setSelectedDateInicio] = useState('');
  const [selectedDateFinal, setSelectedDateFinal] = useState('');
  const [dias, setDias] = useState(5);
  const {user} = useAuth()

  const [formValues, setFormValues] = useState<FormData>({
    dataInicio: new Date(),
    dataFinal: new Date(),
    solDecTerc: 1,
    aprovada: 0,
    authorId: user.id
  });

  const handleDias = (e: any) => {
    setDias(Number(e.target.value));
  };

  const handleChange = (e: any) =>{
    setSelectedDateInicio(format(parse(e.target.value,'yyyy-MM-dd', new Date()), 'dd/MM/yyyy'));
    setSelectedDateFinal(format(addDays(parse(e.target.value,'yyyy-MM-dd', new Date()), dias), 'dd/MM/yyyy'));
    setFormValues({
      dataInicio: parse(e.target.value,'yyyy-MM-dd', new Date()),
      dataFinal: addDays(parse(e.target.value,'yyyy-MM-dd', new Date()), dias),
      solDecTerc: 1,
      aprovada: 0,
      authorId: user.id
    })
  }

  useEffect(() => {
    if (formValues.dataInicio && dias) {
      const dateFinal = addDays(formValues.dataInicio, dias);
      setSelectedDateFinal(format(dateFinal, 'dd/MM/yyyy'));
      setFormValues({
        dataInicio: formValues.dataInicio,
        dataFinal: addDays(formValues.dataInicio, dias),
        solDecTerc: 1,
        aprovada: 0,
        authorId: user.id
      })
    }    
  }, [dias]);

  useEffect(() => {}, [formValues]);

  useEffect(()=>{
  }, [selectedDateInicio])

  const handleSubmitSolic = () => {
    api.post('/solic/cadastrarSolicitacao', formValues)
      .then(response => {
        console.log(response);
        alert('Solicitação enviada com sucesso!');
        
        try {
          api.post('/user/enviarEmail', {user})
        } catch (error) {
          console.error('Erro ao enviar email:', error);
          alert(error);
        }
        try {
          api.post('/message/enviarMensagem', {user})
        }catch(error) {
          console.log('Erro ao enviar mensagem no workplace')
          alert(error);
        }
      })
      .catch((error) => {
        console.error('Erro ao enviar dados:', error);
        alert(error.response.data.message);
      });
    
    
  }

  return (
    <C.DivBlock style={{
      display: isOpen ? 'flex' : 'none'
    }}>
      <C.Modal>
        <C.DivClose onClick={handleClick}>
          <C.Close>
            X
          </C.Close>
        </C.DivClose>

        <C.StyledModal>
          <C.StyledForm onSubmit={handleSubmit(handleSubmitSolic)}>
            <C.StyledInput type="date" {...register("date")} onChange={handleChange} />
              {selectedDateInicio && (
                <C.StyledSelect {...register("dias")} onChange={handleDias}>
                  <option value={5}>5 Dias</option>
                  <option value={10}>10 Dias</option>
                  <option value={15}>15 Dias</option>
                  <option value={20}>20 Dias</option>
                  <option value={30}>30 Dias</option>
                </C.StyledSelect>
              )}
              
            <C.StyledButton type="submit">Solicitar</C.StyledButton>
            {selectedDateInicio && (
              <>
                <C.StyledParagraph>Entrada de férias:{selectedDateInicio}</C.StyledParagraph>
                <C.StyledParagraph>Volta das férias: {selectedDateFinal}</C.StyledParagraph>
              </>
              
            )}
          </C.StyledForm>
            
      </C.StyledModal>
    </C.Modal>
    </C.DivBlock>
  )
}
