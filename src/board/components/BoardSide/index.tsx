import { Droppable } from "@hello-pangea/dnd";

import { DROPPABLE_BOARD_ID } from "@/utils/constants/drag-and-drop";
import { CardItem } from "@/cards/models";
import { BoardTrack } from "../BoardTrack";

interface BoardProps {
  cards: CardItem[];
}

export const BoardSide = ({ cards }: BoardProps) => {
  return (
    <Droppable
      droppableId={DROPPABLE_BOARD_ID}
      type="list"
      direction="horizontal"
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          className="h-[480px] bg-zinc-400 w-full flex justify-center items-center"
          {...provided.droppableProps}
        >
          <BoardTrack disabled cards={cards}>
            {provided.placeholder}
          </BoardTrack>
        </div>
      )}
    </Droppable>
  );
};
