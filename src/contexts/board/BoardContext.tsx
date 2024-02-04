import { Dispatch, SetStateAction, createContext } from "react";

import { CardItem } from "@/modules/cards/models";

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

export const BoardContext = createContext<BoardContextProps | null>(null);
