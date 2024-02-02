"use client";

import { useBoardContext } from "@/board/components/BoardContext";
import { FullBoard } from "@/board/components/FullBoard";
import { MasterToolbar } from "@/board/components/MasterToolbar";
import { cardDataMapper } from "@/cards/utils/cardDataMapper";
import mockChampionCard from "@/utils/mocks/cards/champion-card.json";
import mockSpellCard from "@/utils/mocks/cards/spell-card.json";
import { useEffect } from "react";

export default function Home() {
  const { buildDeckCards } = useBoardContext();

  useEffect(() => {
    const sampleChampion = cardDataMapper(mockChampionCard);
    const sampleSpell = cardDataMapper(mockSpellCard);

    buildDeckCards([
      sampleChampion,
      sampleSpell,
      sampleChampion,
      sampleSpell,
      sampleChampion,
      sampleSpell,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <MasterToolbar />
      <FullBoard />
    </div>
  );
}
