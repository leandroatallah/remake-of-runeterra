import { Draggable } from "@hello-pangea/dnd";

import { CardItem } from "@/cards/models";
import * as Composition from "./CardComposition";

interface CardProps {
  data: CardItem;
  index: number;
  disabled?: boolean;
  isTurned?: boolean;
}

export const Card = ({ data, index, disabled, isTurned }: CardProps) => {
  return (
    <Draggable draggableId={data.id} index={index} isDragDisabled={disabled}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Composition.Root card={data} isTurned={isTurned}>
            <Composition.Header />
            <Composition.Title />
            {data.isChampion && <Composition.FooterChampion />}
          </Composition.Root>
        </div>
      )}
    </Draggable>
  );
};
