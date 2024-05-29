"use client";

import { useEffect } from "react";

import { FullBoard } from "@/modules/board/components/FullBoard";
import { MasterToolbar } from "@/modules/board/components/MasterToolbar";
import { cardDataMapper } from "@/modules/cards/utils/cardDataMapper";
import mockChampionCard from "@/data/mocks/cards/champion-card.json";
import mockSpellCard from "@/data/mocks/cards/spell-card.json";
import { useBoardStore } from "@/contexts/board/useBoardStore";

export default function Home() {
  const { buildDeckCards, drawInitialHand, playerState, enemyState } =
    useBoardStore();

  useEffect(() => {
    const sampleChampion = cardDataMapper(mockChampionCard);
    const sampleSpell = cardDataMapper(mockSpellCard);
    const sampleDeck = [
      sampleChampion,
      sampleSpell,
      sampleChampion,
      sampleSpell,
      sampleChampion,
      sampleSpell,
    ];

    buildDeckCards(sampleDeck);
    buildDeckCards(sampleDeck, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (playerState.deck.length > 0 && playerState.hand.length === 0) {
      drawInitialHand();
    }

    if (enemyState.deck.length > 0 && enemyState.hand.length === 0) {
      drawInitialHand(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerState.deck, enemyState.deck]);

  return (
    <div>
      <MasterToolbar />
      <FullBoard />
    </div>
  );
}
