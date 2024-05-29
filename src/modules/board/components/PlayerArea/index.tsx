import { Hand } from "@/modules/cards/components/Hand";
import { DeckPile } from "../DeckPile";
import { useBoardStore } from "@/contexts/board/useBoardStore";

export const PlayerArea = ({ isEnemy }: { isEnemy?: boolean }) => {
  const {
    playerState: { hand: playerHand },
    enemyState: { hand: enemyHand },
  } = useBoardStore();

  const hand = isEnemy ? enemyHand : playerHand;

  return (
    <div className="flex justify-between">
      <DeckPile />
      <div className="h-[320px] flex justify-center items-center border-2 border-dashed border-zinc-700 w-full">
        <div className="flex">
          <Hand cards={hand} isTurned={isEnemy} disabled={isEnemy} />
        </div>
      </div>
      <div />
    </div>
  );
};
