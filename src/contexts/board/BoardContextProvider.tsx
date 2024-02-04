import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { CardItem } from "@/modules/cards/models";
import { INITIAL_HAND_SIZE, MAX_HAND_SIZE } from "@/constants/rules";
import { delay } from "@/utils/delay";
import { BoardContext } from "./BoardContext";

interface BoardContextProvider {
  children: React.ReactNode;
}

export const BoardContextProvider = ({ children }: BoardContextProvider) => {
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

  const drawCardFromDeckToHand = async (count: number = 1) => {
    // TODO: Handle empty deck
    const handSpace = MAX_HAND_SIZE - playerHand.length;
    const drawCount = Math.min(count, playerDeck.length, handSpace);

    if (drawCount <= 0) {
      return;
    }

    const deck = [...playerDeck];

    for (let i = 0; i < drawCount; i++) {
      if (i > 0) {
        await delay(100);
      }
      const drawnCard = deck.shift();
      setPlayerHand((prev) => [...prev, drawnCard!]);
      setPlayerDeck(deck);
    }
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
