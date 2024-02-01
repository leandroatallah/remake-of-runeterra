import { Droppable } from "@hello-pangea/dnd";

import { Hand } from "@/cards/components/Hand";
import { DROPPABLE_BOARD_ID } from "@/utils/constants/drag-and-drop";
import { CardItem } from "@/cards/models";

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
          <div className="flex">
            {/* TODO: Change to board track */}
            <Hand disabled cards={cards} />
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
