import { Droppable } from "@hello-pangea/dnd";

import { Hand } from "@/cards/components/Hand";
import { DROPPABLE_HAND_ID } from "@/utils/constants/drag-and-drop";
import { CardItem } from "@/cards/models";

interface PlayerAreaProps {
  cards: CardItem[];
}

export const PlayerArea = ({ cards }: PlayerAreaProps) => {
  return (
    <Droppable
      droppableId={DROPPABLE_HAND_ID}
      type="list"
      direction="horizontal"
    >
      {(provided) => (
        <>
          <div
            ref={provided.innerRef}
            className="h-[320px] flex justify-center items-center bg-zinc-600 w-full"
            {...provided.droppableProps}
          >
            <div className="flex">
              <Hand cards={cards} />
            </div>
            {provided.placeholder}
          </div>
        </>
      )}
    </Droppable>
  );
};
