import { CardItem } from "@/cards/models";
import { INITIAL_HAND_SIZE, MAX_HAND_SIZE } from "@/utils/constants/rules";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

type SetCardItemState = Dispatch<SetStateAction<CardItem[]>>;

type BoardContextProps = {
  playerHand: CardItem[];
  setPlayerHand: SetCardItemState;
  playerBoard: CardItem[];
  setPlayerBoard: SetCardItemState;
  playerDeck: CardItem[];
  setPlayerDeck: SetCardItemState;

  buildDeckCards: (cards: CardItem[]) => void;
  drawCardFromDeckToHand: () => void;
  drawInitialHand: () => void;
  deleteBoardCard: (card: CardItem) => void;
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

  const parseCardToDeck = (card: CardItem) => ({
    ...card,
    deckId: uuidv4(),
  });

  const buildDeckCards = (cards: CardItem[]) => {
    setPlayerDeck(cards.map(parseCardToDeck));
  };

  const drawCardFromDeckToHand = (count: number = 1) => {
    // TODO: Handle empty deck
    const handSpace = MAX_HAND_SIZE - playerHand.length;
    const drawCount = Math.min(count, playerDeck.length, handSpace);

    if (drawCount <= 0) {
      return;
    }

    // splice
    const deck = [...playerDeck];
    const drawnCards = deck.splice(0, drawCount);
    setPlayerHand((prev) => [...prev, ...drawnCards]);
    setPlayerDeck(deck);
  };

  const drawInitialHand = () => {
    drawCardFromDeckToHand(INITIAL_HAND_SIZE);
  };

  const deleteBoardCard = (card: CardItem) => {
    // TODO: Use position index instead of id
    if (!card?.id) {
      console.error("Error deleting card");
      return;
    }
    setPlayerBoard((prev) => prev.filter((c) => c.id !== card.id));
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

        buildDeckCards,
        drawCardFromDeckToHand,
        drawInitialHand,
        deleteBoardCard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
