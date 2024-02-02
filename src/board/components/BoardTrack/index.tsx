import { Card } from "@/cards/components/Card";
import { CardItem } from "@/cards/models";

interface BoardTrackProps {
  cards: CardItem[];
  children?: React.ReactNode;
  disabled?: boolean;
}

export const BoardTrack = ({ children, cards, disabled }: BoardTrackProps) => {
  return (
    <div className="w-full flex gap-1 justify-center items-baseline border-2 border-dashed border-zinc-600 rounded-lg p-1 h-[480px] bg-zinc-400 overflow-x-auto overflow-y-hidden">
      {children}
      {cards.map((card, index) => (
        <Card key={card.deckId} index={index} data={card} disabled={disabled} />
      ))}
    </div>
  );
};
