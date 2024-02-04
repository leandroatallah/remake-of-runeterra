import { useState } from "react";

import { GameContext } from "./GameContext";

interface GameContextProvider {
  children: React.ReactNode;
}

export const GameContextProvider = ({ children }: GameContextProvider) => {
  const [turn, setTurn] = useState<number>(0);

  return (
    <GameContext.Provider
      value={{
        turn,
        setTurn,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
