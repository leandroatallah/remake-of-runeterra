import { Droppable } from "@hello-pangea/dnd";

import { DROPPABLE_BOARD_ID } from "@/constants/drag-and-drop";
import { BORDER_DASHED_STYLE } from "@/styles/card";
import { Card } from "@/modules/cards/components/Card";
import { useBoardContext } from "@/contexts/board/useBoardContext";

export const BoardTrack = () => {
  const {
    playerState: { board: playerBoard },
    enemyState: { board: enemyBoard },
  } = useBoardContext();

  return (
    <div
      className={[
        "w-full flex gap-1 justify-center items-center rounded-lg p-1 h-[480px] bg-zinc-400 overflow-x-auto overflow-y-hidden",
        BORDER_DASHED_STYLE,
      ].join(" ")}
    >
      <Droppable
        droppableId={DROPPABLE_BOARD_ID}
        type="list"
        direction="horizontal"
      >
        {(provided, snapshot) => {
          // snapshot
          // - draggingFromThisWith
          // - draggingOverWith
          // - isDraggingOver
          // - isUsingPlaceholder

          return (
            <div
              ref={provided.innerRef}
              className="bg-red-400 h-full w-full flex justify-center items-center"
              {...provided.droppableProps}
            >
              {playerBoard.map((card, index) => (
                <Card data={card} index={index} disabled key={card.deckId} />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};
