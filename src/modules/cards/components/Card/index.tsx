import { CardItem } from "@/modules/cards/models";
import * as Composition from "./CardComposition";
import { Draggable } from "@/modules/drag-and-drop/components/Draggable";
import { useGameContext } from "@/contexts/game/useGameContext";

interface CardProps {
  data?: CardItem;
  index?: number;
  disabled?: boolean;
  isTurned?: boolean;
  className?: string;
  hoverEffect?: "hand" | "board" | "none";
}

export const Card = ({
  data,
  index = 0,
  disabled,
  isTurned,
  className = "",
  hoverEffect,
}: CardProps) => {
  const { isDraggingSomeCard } = useGameContext();

  if (!data || !data.deckId) {
    return <Composition.Root card={null} isTurned className={className} />;
  }

  return (
    <Draggable>
      <div>
        <Composition.Root
          card={data}
          isTurned={isTurned}
          className={className}
          hoverEffect={isDraggingSomeCard ? "none" : hoverEffect}
        >
          {disabled && "disabled"}
          <Composition.Header />
          <Composition.Title />
          {data.isChampion && <Composition.FooterChampion />}
        </Composition.Root>
      </div>
    </Draggable>
  );
};
