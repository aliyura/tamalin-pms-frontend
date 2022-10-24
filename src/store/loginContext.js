import { createContext, useContext } from "react";

export const LoginContext = createContext(sessionStorage.getItem(''));

export const useLoginContext = () => {
  return useContext(LoginContext);
};


