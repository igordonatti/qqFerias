import * as C from './login.styles';
import { Input } from '../../Components/Input/Input'
import { Button } from '../../Components/Button/Button';
import { useState, useContext, useEffect } from "react";

import { api } from '../../lib/axios';

import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import { useAuth } from '../../hooks/auth/useAuth';

interface Gestor {
  matricula: string;
}

export const _login = () => {
  const {signIn} = useAuth()


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gestores, setGestores] = useState<Gestor[]>([])

  useEffect(() => {
    const fetchGestores = async () => {
      const response = await api.get('funcionariosGestores');
      setGestores(response.data);
    }
    fetchGestores();
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      signIn(username, password)
    } catch (error) {
      console.log(error)
    }
  }

  function handleClickLink(){
    if(username === 'superadmin'){
      console.log(username)
      window.location.href = `http://127.0.0.1:5173/superadmin`;
    } else {
      window.location.href = `http://127.0.0.1:5173/inicio`;
    }
  }

  return (
    <C.Container>
      <C.DivLogin>
        
        <C.P>Usuário</C.P>
        <C.InputField type={'text'} onChange={(e) => setUsername(e.target.value)} />

        <C.P>Senha</C.P>
        <C.InputField type={'password'} onChange={(e) => setPassword(e.target.value)} />

        <div onClick={handleSubmit}>
          <Button text='Entrar' marginTop='36px' heightButton={80} widthButton={650} />
        </div>

      </C.DivLogin>
    </C.Container>
  )
}
