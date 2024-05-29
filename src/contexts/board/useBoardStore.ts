import { create } from "zustand";

import { CardItem } from "@/modules/cards/models";
import {
  handleBuildDeckCards,
  handleDeleteBoardCard,
  handleDrawCardFromDeckToHand,
  handleDrawInitialHand,
} from "./functions";

export interface PlayerState {
  hand: CardItem[];
  board: CardItem[];
  deck: CardItem[];
  setHand: (hand: CardItem[]) => void;
  setBoard: (board: CardItem[]) => void;
  setDeck: (deck: CardItem[]) => void;
  incrementHand: (card: CardItem) => void;
  deleteBoardCard: (cardId: string) => void;
}

interface BoardContextProps {
  playerState: PlayerState;
  enemyState: PlayerState;

  getPlayer: (isEnemy?: boolean) => PlayerState;
  buildDeckCards: (cards: CardItem[], isEnemy?: boolean) => void;
  drawCardFromDeckToHand: (count?: number, isEnemy?: boolean) => void;
  drawInitialHand: (isEnemy?: boolean) => void;
  deleteBoardCard: (card: CardItem, isEnemy?: boolean) => void;
}

export const useBoardStore = create<BoardContextProps>((set, get) => ({
  // TODO: Improve playerState and enemyState structure
  playerState: {
    hand: [],
    board: [],
    deck: [],
    setHand: (hand) =>
      set((state) => ({ playerState: { ...state.playerState, hand } })),
    setBoard: (board) =>
      set((state) => ({ playerState: { ...state.playerState, board } })),
    setDeck: (deck) =>
      set((state) => ({ playerState: { ...state.playerState, deck } })),
    incrementHand: (card) =>
      set((state) => ({
        playerState: {
          ...state.playerState,
          hand: [...state.playerState.hand, card],
        },
      })),
    deleteBoardCard: (cardId) =>
      set((state) => ({
        playerState: {
          ...state.playerState,
          board: state.playerState.board.filter((card) => card.id !== cardId),
        },
      })),
  },
  // TODO: Improve playerState and enemyState structure
  enemyState: {
    hand: [],
    board: [],
    deck: [],
    setHand: (hand) =>
      set((state) => ({ enemyState: { ...state.enemyState, hand } })),
    setBoard: (board) =>
      set((state) => ({ enemyState: { ...state.enemyState, board } })),
    setDeck: (deck) =>
      set((state) => ({ enemyState: { ...state.enemyState, deck } })),
    incrementHand: (card) =>
      set((state) => ({
        enemyState: {
          ...state.enemyState,
          hand: [...state.enemyState.hand, card],
        },
      })),
    deleteBoardCard: (cardId) =>
      set((state) => ({
        enemyState: {
          ...state.enemyState,
          board: state.enemyState.board.filter((card) => card.id !== cardId),
        },
      })),
  },

  getPlayer: (isEnemy) => {
    return isEnemy ? get().enemyState : get().playerState;
  },
  buildDeckCards: (cards, isEnemy) => {
    get().getPlayer(isEnemy).setDeck(handleBuildDeckCards(cards));
  },
  drawCardFromDeckToHand: async (count, isEnemy) => {
    await handleDrawCardFromDeckToHand(get().getPlayer(isEnemy), count);
  },
  drawInitialHand: (isEnemy) => {
    handleDrawInitialHand(get().getPlayer(isEnemy));
  },
  deleteBoardCard: (card, isEnemy) => {
    handleDeleteBoardCard(get().getPlayer(isEnemy), card);
  },
}));
