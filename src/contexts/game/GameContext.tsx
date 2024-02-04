import { Dispatch, SetStateAction, createContext } from "react";

type GameContextProps = {
  turn: number;
  setTurn: Dispatch<SetStateAction<number>>;
};

export const GameContext = createContext<GameContextProps | null>(null);
