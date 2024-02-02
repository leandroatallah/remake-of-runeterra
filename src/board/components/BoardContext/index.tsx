import { CardItem } from "@/cards/models";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type BoardContextProps = {
  playerHand: CardItem[];
  setPlayerHand: Dispatch<SetStateAction<CardItem[]>>;
  playerBoard: CardItem[];
  setPlayerBoard: Dispatch<SetStateAction<CardItem[]>>;
  playerDeck: CardItem[];
  setPlayerDeck: Dispatch<SetStateAction<CardItem[]>>;

  playerDrawCardFromDeck: () => void;
};

const BoardContext = createContext<BoardContextProps | null>(null);

export function useBoardContext() {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error(
      "useBoardContext must be used within a BoardContextProvider"
    );
  }

  return context;
}

interface BoardContextProvider {
  children: React.ReactNode;
}

export const BoardContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [playerHand, setPlayerHand] = useState<CardItem[]>([]);
  const [playerBoard, setPlayerBoard] = useState<CardItem[]>([]);
  const [playerDeck, setPlayerDeck] = useState<CardItem[]>([]);

  const playerDrawCardFromDeck = () => {
    // TODO: Handle empty deck
    if (playerDeck.length) {
      const [drawnCard, ...restDeck] = playerDeck;
      setPlayerHand((prev) => [...prev, drawnCard]);
      setPlayerDeck(restDeck);
    }
  };

  return (
    <BoardContext.Provider
      value={{
        playerHand,
        setPlayerHand,
        playerBoard,
        setPlayerBoard,
        playerDeck,
        setPlayerDeck,

        playerDrawCardFromDeck,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
