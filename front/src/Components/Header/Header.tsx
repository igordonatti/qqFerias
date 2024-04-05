import * as C from './Header.styles';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth/useAuth';

export const Header = () => {
  const {signOut} = useAuth()

  function handleClickLink(){
    signOut()
  }
  
  return (
    <C.Nav>
      <C.Div>
        <FiLogOut onClick={() => handleClickLink()}/>
      </C.Div>
    </C.Nav>
  )
}
