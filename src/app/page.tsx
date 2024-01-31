"use client";

import { Hand } from "@/cards/components/Hand";
import { cardDataMapper } from "@/cards/utils/cardDataMapper";
import mockChampionCard from "@/utils/mocks/cards/champion-card.json";
import mockSpellCard from "@/utils/mocks/cards/spell-card.json";
import { useMemo } from "react";

export default function Home() {
  const playerHand = useMemo(() => {
    const sampleChampion = cardDataMapper(mockChampionCard);
    const sampleSpell = cardDataMapper(mockSpellCard);

    return [sampleChampion, sampleSpell];
  }, []);

  return (
    <div className="flex gap-4">
      <Hand cards={playerHand} />
    </div>
  );
}
