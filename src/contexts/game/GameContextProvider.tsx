import { useState } from "react";

import { GameContext } from "./GameContext";

interface GameContextProvider {
  children: React.ReactNode;
}

export const GameContextProvider = ({ children }: GameContextProvider) => {
  const [turn, setTurn] = useState<number>(0);
  const [isDraggingSomeCard, setIsDraggingSomeCard] = useState<boolean>(false);

  return (
    <GameContext.Provider
      value={{
        turn,
        isDraggingSomeCard,
        setTurn,
        setIsDraggingSomeCard,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
