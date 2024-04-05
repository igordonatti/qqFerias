import { Global } from './styles/global';

import { _login } from './pages/Login/_login';
import { _initColaborador } from './pages/InitColaborador/_initColaborador';
import { _solicColaborador } from './pages/SolicColaborador/_solicColaborador';
import { _listaFuncionarios } from './pages/listaFuncionarios/_listaFuncionarios';
import { _superAdmin } from './pages/SuperAdmin/_superAdmin';
import { _dashBoardGestor } from './pages/DashBoardGestor/_dashBoardGestor';
import { _solicGestor } from './pages/SolicGestor/_solicGestor';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProvideAuth } from './hooks/auth/useAuth';

export const App = () => {
  return (
    <>
    
      <BrowserRouter>
      <ProvideAuth>
        <Routes>
            <Route path='/login' element={<_login/>}/>
            <Route path='/inicio' element={<_initColaborador/>}/>
            <Route path='/solicitacaoColaborador' element={<_solicColaborador/>}/>
            <Route path='/listaFuncionarios' element={<_listaFuncionarios/>}/>
            <Route path='/superAdmin' element={<_superAdmin/>}/>
            <Route path='/dashBoard' element={<_dashBoardGestor/>}/>
            <Route path='/solicGestor' element={<_solicGestor/>}/>
        </Routes>
        </ProvideAuth>
      </BrowserRouter>
      
      <Global />
    </>
  )
}
