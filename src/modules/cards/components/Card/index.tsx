import {
  Draggable,
  DraggableStateSnapshot,
  DraggingStyle,
  DropAnimation,
  NotDraggingStyle,
} from "@hello-pangea/dnd";

import { CardItem } from "@/modules/cards/models";
import * as Composition from "./CardComposition";
import { CSSProperties } from "react";

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
  if (!data || !data.deckId) {
    return <Composition.Root card={null} isTurned className={className} />;
  }

  const getStyle = (
    style: DraggingStyle | NotDraggingStyle | undefined,
    snapshot: DraggableStateSnapshot
  ): CSSProperties => {
    const dropping: DropAnimation | undefined | null = snapshot.dropAnimation;
    if (!dropping) {
      return style || {};
    }
    const { moveTo, curve, duration } = dropping;
    const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
    const rotate = "rotate(1turn)";
    return {
      ...style,
      transform: `${translate} ${rotate}`,
      // slowing down the drop
      transition: `all ${curve} ${duration + 1}s`,
    };
  };

  return (
    <Draggable
      draggableId={data.deckId}
      index={index}
      isDragDisabled={disabled}
    >
      {(provided, snapshot) => {
        const isDragging = snapshot.isDragging && !snapshot.isDropAnimating;
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={
              isDragging
                ? "!outline-2 !outline-red-600 outline-double outline-offset-1"
                : ""
            }
            // style={getStyle(provided.draggableProps.style, snapshot)}
          >
            <Composition.Root
              card={data}
              isTurned={isTurned}
              className={className}
            >
              {disabled && "disabled"}
              <Composition.Header />
              <Composition.Title />
              {data.isChampion && <Composition.FooterChampion />}
            </Composition.Root>
          </div>
        );
      }}
    </Draggable>
  );
};
