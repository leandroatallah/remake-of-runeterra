import { Droppable } from "@hello-pangea/dnd";

import { Hand } from "@/modules/cards/components/Hand";
import { DROPPABLE_HAND_ID } from "@/constants/drag-and-drop";
import { DeckPile } from "../DeckPile";
import { useBoardContext } from "@/contexts/board/useBoardContext";

export const PlayerArea = ({ isEnemy }: { isEnemy?: boolean }) => {
  const {
    playerState: { hand: playerHand },
    enemyState: { hand: enemyHand },
  } = useBoardContext();

  const hand = isEnemy ? enemyHand : playerHand;

  return (
    <div className="flex justify-between">
      <DeckPile />
      <Droppable
        droppableId={DROPPABLE_HAND_ID}
        type="list"
        direction="horizontal"
        isDropDisabled
      >
        {(provided) => (
          <>
            <div
              ref={provided.innerRef}
              className="h-[320px] flex justify-center items-center border-2 border-dashed border-zinc-700 w-full"
              {...provided.droppableProps}
            >
              <div className="flex">
                <Hand cards={hand} isTurned={isEnemy} disabled={isEnemy} />
              </div>
              {provided.placeholder}
            </div>
          </>
        )}
      </Droppable>
      <div />
    </div>
  );
};
