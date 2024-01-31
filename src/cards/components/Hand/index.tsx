import { ChampionCard, SpellCard } from "@/cards/models";
import { Card } from "../Card";

interface HandProps {
  cards: (ChampionCard | SpellCard)[];
}

export const Hand = ({ cards }: HandProps) => {
  return (
    <div className="flex gap-1 justify-center items-baseline">
      {cards.map((card) => (
        <Card key={card.id} data={card} />
      ))}
    </div>
  );
};
