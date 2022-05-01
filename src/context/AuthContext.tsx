import { createContext, useReducer } from "react";
import { ReactChildren, AuthContextType } from "../types";
import { authReducer, initialState } from "../reducers";

const AuthContext = createContext({} as AuthContextType);

const AuthProvider = ({ children }: ReactChildren) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
