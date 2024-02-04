import { v4 as uuidv4 } from "uuid";

import { CardItem } from "@/modules/cards/models";
import { INITIAL_HAND_SIZE, MAX_HAND_SIZE } from "@/constants/rules";
import { delay } from "@/utils/delay";
import { PlayerState } from "./BoardContext";

export const parseCardToDeck = (card: CardItem) => ({
  ...card,
  deckId: uuidv4(),
});

export const handleBuildDeckCards = (cards: CardItem[]): CardItem[] => {
  return cards.map(parseCardToDeck);
};

export const handleDrawCardFromDeckToHand = async (
  playerState: PlayerState,
  count: number = 1
) => {
  // TODO: Handle empty deck
  const handSpace = MAX_HAND_SIZE - playerState.hand.length;
  const drawCount = Math.min(count, playerState.deck.length, handSpace);

  if (drawCount <= 0) {
    return;
  }

  const deckCopy = [...playerState.deck];

  for (let i = 0; i < drawCount; i++) {
    if (i > 0) {
      await delay(100);
    }
    const drawnCard = deckCopy.shift();
    playerState.setHand((prev) => [...prev, drawnCard!]);
    playerState.setDeck(deckCopy);
  }
};

export const handleDrawInitialHand = (playerState: PlayerState) => {
  handleDrawCardFromDeckToHand(playerState, INITIAL_HAND_SIZE);
};

export const handleDeleteBoardCard = (
  playerState: PlayerState,
  card: CardItem
) => {
  // TODO: Use position index instead of id
  if (!card?.id) {
    console.error("Error deleting card");
    return;
  }
  playerState.setBoard((prev) => prev.filter((c) => c.id !== card.id));
};
