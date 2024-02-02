import { Draggable } from "@hello-pangea/dnd";

import { CardItem } from "@/cards/models";
import * as Composition from "./CardComposition";

interface CardProps {
  data?: CardItem;
  index?: number;
  disabled?: boolean;
  isTurned?: boolean;
  className?: string;
}

export const Card = ({
  data,
  index = 0,
  disabled,
  isTurned,
  className = "",
}: CardProps) => {
  if (!data) {
    return <Composition.Root card={null} isTurned className={className} />;
  }

  return (
    <Draggable draggableId={data.id} index={index} isDragDisabled={disabled}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Composition.Root
            card={data}
            isTurned={isTurned}
            className={className}
          >
            <Composition.Header />
            <Composition.Title />
            {data.isChampion && <Composition.FooterChampion />}
          </Composition.Root>
        </div>
      )}
    </Draggable>
  );
};
