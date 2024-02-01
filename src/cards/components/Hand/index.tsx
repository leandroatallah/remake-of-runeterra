import { CardItem } from "@/cards/models";
import { Card } from "../Card";

interface HandProps {
  cards: CardItem[];
  disabled?: boolean;
}

export const Hand = ({ cards, disabled }: HandProps) => {
  return (
    <div className="flex gap-1 justify-center items-baseline">
      {cards.map((card, index) => (
        <Card key={card.id} index={index} data={card} disabled={disabled} />
      ))}
    </div>
  );
};
