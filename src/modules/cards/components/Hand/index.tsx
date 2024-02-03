import { CardItem } from "@/modules/cards/models";
import { Card } from "../Card";

interface HandProps {
  cards: CardItem[];
  disabled?: boolean;
  isTurned?: boolean;
}

export const Hand = ({ cards, disabled, isTurned }: HandProps) => {
  return (
    <div className="flex gap-1 justify-center items-baseline">
      {cards.map((card, index) => (
        <Card
          key={card.deckId}
          index={index}
          data={card}
          disabled={disabled}
          isTurned={isTurned}
        />
      ))}
    </div>
  );
};
