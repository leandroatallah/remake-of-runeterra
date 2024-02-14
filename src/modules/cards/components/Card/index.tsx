import { CardItem } from "@/modules/cards/models";
import * as Composition from "./CardComposition";
import { Draggable } from "@/modules/drag-and-drop/components/Draggable";

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

  // const getStyle = (
  //   style: DraggingStyle | NotDraggingStyle | undefined,
  //   snapshot: DraggableStateSnapshot
  // ): CSSProperties => {
  //   const dropping: DropAnimation | undefined | null = snapshot.dropAnimation;
  //   if (!dropping) {
  //     return style || {};
  //   }
  //   const { moveTo, curve, duration } = dropping;
  //   const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
  //   const rotate = "rotate(1turn)";
  //   return {
  //     ...style,
  //     transform: `${translate} ${rotate}`,
  //     // slowing down the drop
  //     transition: `all ${curve} ${duration + 1}s`,
  //   };
  // };

  return (
    <Draggable>
      <div>
        <Composition.Root card={data} isTurned={isTurned} className={className}>
          {disabled && "disabled"}
          <Composition.Header />
          <Composition.Title />
          {data.isChampion && <Composition.FooterChampion />}
        </Composition.Root>
      </div>
    </Draggable>
  );
};
