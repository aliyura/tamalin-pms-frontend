import { createContext, useContext } from "react";

export const LoginContext = createContext(false);

export const useLoginContext = () => {
  return useContext(LoginContext);
};
