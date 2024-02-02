import { Card } from "@/cards/components/Card";
import { useBoardContext } from "../BoardContext";

export const DeckPile = () => {
  const { playerDeck } = useBoardContext();

  return (
    <div className="flex justify-center items-center px-4 border-2 border-dashed border-zinc-700">
      <Card
        disabled
        isTurned
        className={[!playerDeck.length ? "opacity-0" : ""].join(" ")}
      />
    </div>
  );
};
