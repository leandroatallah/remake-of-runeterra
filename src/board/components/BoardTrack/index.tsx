import { Droppable } from "@hello-pangea/dnd";

import { DROPPABLE_BOARD_ID } from "@/utils/constants/drag-and-drop";
import { BOARD_TRACK_SPACES } from "@/utils/constants/board";
import { BORDER_DASHED_STYLE, CARD_SHAPE_STYLE } from "@/utils/styles/card";
import { useBoardContext } from "../BoardContext";
import { Card } from "@/cards/components/Card";

interface BoardTrackProps {
  disabled?: boolean;
}

export const BoardTrack = ({ disabled }: BoardTrackProps) => {
  const { playerBoard } = useBoardContext();
  return (
    <div
      className={[
        "w-full flex gap-1 justify-center items-center rounded-lg p-1 h-[480px] bg-zinc-400 overflow-x-auto overflow-y-hidden",
        BORDER_DASHED_STYLE,
      ].join(" ")}
    >
      {Array.from({ length: BOARD_TRACK_SPACES }).map((_, index) => {
        const droppableId = `${DROPPABLE_BOARD_ID}-${index + 1}`;
        const card = playerBoard.find(
          (card) => card.boardTrack === droppableId
        );

        return (
          <Droppable
            key={index}
            droppableId={droppableId}
            type="list"
            direction="horizontal"
            isDropDisabled={!!card}
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {card ? (
                  <Card data={card} />
                ) : (
                  <div>
                    <div
                      className={[
                        CARD_SHAPE_STYLE,
                        "relative bg-transparent border-0",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          CARD_SHAPE_STYLE,
                          BORDER_DASHED_STYLE,
                          "absolute inset-0 flex justify-center items-center  bg-opacity-20",
                        ].join(" ")}
                      />
                    </div>
                  </div>
                )}
                {/* {provided.placeholder} */}
              </div>
            )}
          </Droppable>
        );
      })}
    </div>
  );
};
