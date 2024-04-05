import { UserData } from "../hooks/auth/useAuth";

export const isAuthenticated = () => 
  sessionStorage.getItem('loggedUser') !== null;


  export const getLoggedUser = ():UserData =>
    JSON.parse(window.sessionStorage.getItem('loggedUser')!)