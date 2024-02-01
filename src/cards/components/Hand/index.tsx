import { CardItem } from "@/cards/models";
import { Card } from "../Card";

interface HandProps {
  cards: CardItem[];
}

export const Hand = ({ cards }: HandProps) => {
  return (
    <div className="flex gap-1 justify-center items-baseline">
      {cards.map((card, index) => (
        <Card key={card.id} index={index} data={card} />
      ))}
    </div>
  );
};
