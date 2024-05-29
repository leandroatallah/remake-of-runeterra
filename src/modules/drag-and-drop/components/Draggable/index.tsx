import { useCallback, useRef } from "react";
import { useGameStore } from "@/contexts/game/useGameStore";

interface DraggableProps {
  children: React.ReactNode;
  disabled?: boolean;
}

const MIN_DRAG_DELAY = 300;

export const Draggable = ({ children, disabled }: DraggableProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { setIsDraggingSomeCard: setIsDragging } = useGameStore();

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setDragImage(new Image(), 0, 0);

    const { x, y } = (event.target as HTMLDivElement).getBoundingClientRect();

    localStorage.setItem("initialX", x.toString());
    localStorage.setItem("initialY", y.toString());

    setIsDragging(true);
  };

  const onDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("onDrag");

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

  const onDragEnd = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      if (ref.current === null) return;

      const initialPositionX = localStorage.getItem("initialX");
      const initialPositionY = localStorage.getItem("initialY");

      const currentPositionX = ref.current.style.left.replace("px", "");
      const currentPositionY = ref.current.style.top.replace("px", "");
      const dragDistanceX = Math.abs(
        Number(currentPositionX) - Number(initialPositionX)
      );
      const dragDistanceY = Math.abs(
        Number(currentPositionY) - Number(initialPositionY)
      );
      const dragDistance = Math.max(dragDistanceX, dragDistanceY) || 0;

      localStorage.removeItem("initialX");
      localStorage.removeItem("initialY");

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
        setIsDragging(false);

        Object.assign(ref.current.style, {
          position: "initial",
          left: "initial",
          top: "initial",
          zIndex: "initial",
          transform: "initial",
          transition: "initial",
        });
      }, Math.max(dragDistance * 0.5, MIN_DRAG_DELAY));
    },
    [setIsDragging]
  );

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("onDrop", event);
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
      onDrop={onDrop}
      onDragOver={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      {children}
    </div>
  );
};
