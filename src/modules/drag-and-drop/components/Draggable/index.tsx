import { useGameContext } from "@/contexts/game/useGameContext";
import { useRef } from "react";

interface DraggableProps {
  children: React.ReactNode;
  disabled?: boolean;
}

export const Draggable = ({ children, disabled }: DraggableProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { setIsDraggingSomeCard: setIsDragging } = useGameContext();

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setDragImage(new Image(), 0, 0);

    const { clientX, clientY } = event;

    localStorage.setItem("clientX", clientX.toString());
    localStorage.setItem("clientY", clientY.toString());

    setIsDragging(true);
  };

  const onDrag = (event: React.DragEvent<HTMLDivElement>) => {
    if (ref.current === null) return;

    const { clientX, clientY } = event;

    if (clientX === 0 && clientY === 0) return;

    Object.assign(ref.current?.style, {
      zIndex: "1000",
      position: "fixed",
      left: `${clientX}px`,
      top: `${clientY}px`,
      transform: "translate(-50%, -50%)",
    });
  };

  const onDragEnd = () => {
    setIsDragging(false);

    if (ref.current === null) return;

    const initialPositionX = localStorage.getItem("clientX");
    const initialPositionY = localStorage.getItem("clientY");

    localStorage.removeItem("clientX");
    localStorage.removeItem("clientY");

    Object.assign(ref.current.style, {
      position: "fixed",
      left: `${initialPositionX}px`,
      top: `${initialPositionY}px`,
      zIndex: "1000",
      transform: "initial",
      transition: "all 0.3s",
    });

    setTimeout(() => {
      if (ref.current === null) return;
      Object.assign(ref.current.style, {
        position: "initial",
        left: "initial",
        top: "initial",
        zIndex: "initial",
        transform: "initial",
        transition: "initial",
      });
    }, 350);
  };

  // const onDragEnd = useCallback(
  //   (result: DropResult, provided: ResponderProvided) => {
  //     const { source, destination } = result;

  //     if (!destination) {
  //       return;
  //     }

  //     if (
  //       destination.droppableId === source.droppableId &&
  //       destination.index === source.index
  //     ) {
  //       return;
  //     }

  //     const { droppableId, index } = destination;

  //     const isBoardTrack = droppableId === DROPPABLE_BOARD_ID;

  //     if (isBoardTrack) {
  //       const { result, removed } = playDraggableItem(playerHand, source.index);
  //       setPlayerHand(result);
  //       setPlayerBoard((prev) => {
  //         const newBoard = [...prev];
  //         newBoard.splice(index, 0, removed);
  //         return newBoard;
  //       });
  //       return;
  //     }

  //     if (droppableId === DROPPABLE_HAND_ID) {
  //       const result = reorderDraggableList(
  //         playerHand,
  //         source.index,
  //         destination.index
  //       );
  //       setPlayerHand(result);
  //       return;
  //     }
  //   },
  //   [playerHand, setPlayerHand, setPlayerBoard]
  // );

  return (
    <div
      ref={ref}
      draggable={!disabled}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      {children}
    </div>
  );
};
