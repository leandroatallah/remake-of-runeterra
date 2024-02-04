import { Dispatch, SetStateAction, createContext } from "react";

import { CardItem } from "@/modules/cards/models";

export type SetCardItemState = Dispatch<SetStateAction<CardItem[]>>;

export type PlayerState = {
  hand: CardItem[];
  board: CardItem[];
  deck: CardItem[];
  setHand: SetCardItemState;
  setBoard: SetCardItemState;
  setDeck: SetCardItemState;
};

type BoardContextProps = {
  playerState: PlayerState;
  enemyState: PlayerState;

  buildDeckCards: (cards: CardItem[]) => void;
  drawCardFromDeckToHand: () => void;
  drawInitialHand: () => void;
  deleteBoardCard: (card: CardItem) => void;
};

export const BoardContext = createContext<BoardContextProps | null>(null);
