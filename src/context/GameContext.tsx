import { createContext, useReducer } from "react";
import { ReactChildren, GameContextType } from "../types";
import { gameInitialState, gameReducer } from "../reducers";

const GameContext = createContext({} as GameContextType);

const GameProvider = ({ children }: ReactChildren) => {
  const [gameState, gameDispatch] = useReducer(gameReducer, gameInitialState);

  return (
    <GameContext.Provider value={{ gameState, gameDispatch }}>{children}</GameContext.Provider>
  );
};

export { GameContext, GameProvider };
