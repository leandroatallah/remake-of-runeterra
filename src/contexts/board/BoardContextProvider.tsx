import { useState } from "react";

import { CardItem } from "@/modules/cards/models";
import { BoardContext, PlayerState } from "./BoardContext";
import {
  handleBuildDeckCards,
  handleDeleteBoardCard,
  handleDrawCardFromDeckToHand,
  handleDrawInitialHand,
} from "./functions";

interface BoardContextProvider {
  children: React.ReactNode;
}

export const BoardContextProvider = ({ children }: BoardContextProvider) => {
  // TODO: Update to use reducer
  const [playerHand, setPlayerHand] = useState<CardItem[]>([]);
  const [playerBoard, setPlayerBoard] = useState<CardItem[]>([]);
  const [playerDeck, setPlayerDeck] = useState<CardItem[]>([]);

  const [enemyHand, setEnemyHand] = useState<CardItem[]>([]);
  const [enemyBoard, setEnemyBoard] = useState<CardItem[]>([]);
  const [enemyDeck, setEnemyDeck] = useState<CardItem[]>([]);

  const playerBySide: Record<"player" | "enemy", PlayerState> = {
    player: {
      hand: playerHand,
      board: playerBoard,
      deck: playerDeck,
      setHand: setPlayerHand,
      setBoard: setPlayerBoard,
      setDeck: setPlayerDeck,
    },
    enemy: {
      hand: enemyHand,
      board: enemyBoard,
      deck: enemyDeck,
      setHand: setEnemyHand,
      setBoard: setEnemyBoard,
      setDeck: setEnemyDeck,
    },
  };

  const getPlayerBySide = (isEnemy?: boolean): PlayerState =>
    playerBySide[isEnemy ? "enemy" : "player"];

  const buildDeckCards = (cards: CardItem[], isEnemy?: boolean) => {
    getPlayerBySide(isEnemy).setDeck(handleBuildDeckCards(cards));
  };
  const drawCardFromDeckToHand = async (count?: number, isEnemy?: boolean) => {
    await handleDrawCardFromDeckToHand(getPlayerBySide(isEnemy), count);
  };

  const drawInitialHand = (isEnemy?: boolean) => {
    handleDrawInitialHand(getPlayerBySide(isEnemy));
  };

  const deleteBoardCard = (card: CardItem, isEnemy?: boolean) => {
    handleDeleteBoardCard(getPlayerBySide(isEnemy), card);
  };

  return (
    <BoardContext.Provider
      value={{
        playerState: playerBySide.player,
        enemyState: playerBySide.enemy,

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
