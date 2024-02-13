"use client";

import { useEffect } from "react";

import { useBoardContext } from "@/contexts/board/useBoardContext";
import { FullBoard } from "@/modules/board/components/FullBoard";
import { MasterToolbar } from "@/modules/board/components/MasterToolbar";
import { cardDataMapper } from "@/modules/cards/utils/cardDataMapper";
import mockChampionCard from "@/data/mocks/cards/champion-card.json";
import mockSpellCard from "@/data/mocks/cards/spell-card.json";

export default function Home() {
  const { buildDeckCards } = useBoardContext();

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

  return (
    <div>
      <MasterToolbar />
      <FullBoard />
    </div>
  );
}
