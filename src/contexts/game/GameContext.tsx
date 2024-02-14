import { Dispatch, SetStateAction, createContext } from "react";

type GameContextProps = {
  turn: number;
  isDraggingSomeCard: boolean;
  setTurn: Dispatch<SetStateAction<number>>;
  setIsDraggingSomeCard: Dispatch<SetStateAction<boolean>>;
};

export const GameContext = createContext<GameContextProps | null>(null);
