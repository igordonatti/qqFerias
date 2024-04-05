import { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";

import { getLoggedUser, isAuthenticated as isAuth } from "../../services/Auth";
import { login, logout } from "../../services/Login";

export type UserData = {
  id: string;
  nnme: string;
  cpf_cnpj: string;
  tipoContrato: boolean;
  email: string;
  dataContratacao: Date;
  matricula: string;
  cargo: string;
  setor: string;
  gestorBool: boolean;
  gestorId: string;
}

type AuthProps = {
  user: UserData
  signIn: (username: string, password: string) => void;
  signOut: () => void
}

type ProvideAuthProps = {
  children: React.ReactNode
}

const DEFAULT_VALUES = {} as AuthProps

const authContext = createContext(DEFAULT_VALUES);

export const ProvideAuth = ({children}: ProvideAuthProps) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

const useProvideAuth = () => {
  const [user, setUser] = useState<UserData>(getLoggedUser())

  const navigate = useNavigate();


  const signIn = async(username:string, password:string) => {
    const response = await api.post('/auth/login', {username, password});
    const user: UserData = response.data.user
    login(user)
    getUserFromLocalStorage();


    if(user.matricula === 'superadmin'){
      navigate('\superadmin')
    }

    else if(user.gestorBool){
      navigate('\dashboard')
    }

    else {
      navigate('\inicio')
    }
  }

  const signOut = () => {
    logout()
    navigate('\login')
    getUserFromLocalStorage();
  }

  const isAuthenticated = ():boolean => {
    return isAuth();
  }


  const getUserFromLocalStorage = useCallback(() => {
    const userFromLocalStorage = getLoggedUser();
    setUser(userFromLocalStorage);
  }, [])


  return {
    user,
    signIn,
    signOut,
    isAuthenticated
  }
}