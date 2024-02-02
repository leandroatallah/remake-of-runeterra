import { Droppable } from "@hello-pangea/dnd";

import { Hand } from "@/cards/components/Hand";
import { DROPPABLE_HAND_ID } from "@/utils/constants/drag-and-drop";
import { CardItem } from "@/cards/models";
import { DeckPile } from "../DeckPile";

interface PlayerAreaProps {
  cards: CardItem[];
}

export const PlayerArea = ({ cards }: PlayerAreaProps) => {
  return (
    <div className="flex justify-between">
      <DeckPile />
      <Droppable
        droppableId={DROPPABLE_HAND_ID}
        type="list"
        direction="horizontal"
      >
        {(provided) => (
          <>
            <div
              ref={provided.innerRef}
              className="h-[320px] flex justify-center items-center border-2 border-dashed border-zinc-700 w-full"
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
      <div />
    </div>
  );
};
