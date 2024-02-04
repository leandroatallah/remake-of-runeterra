import { Card } from "@/modules/cards/components/Card";
import { useBoardContext } from "@/contexts/board/useBoardContext";

export const DeckPile = () => {
  const {
    playerState: { deck: playerDeck },
    enemyState: { deck: enemyDeck },
  } = useBoardContext();

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
