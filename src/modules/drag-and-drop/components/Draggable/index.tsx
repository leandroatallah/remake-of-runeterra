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

    const { x, y } = (event.target as HTMLDivElement).getBoundingClientRect();
    const { clientX, clientY } = event;

    localStorage.setItem("dragX", x.toString());
    localStorage.setItem("dragY", y.toString());

    if (clientX === 0 && clientY === 0) return;

    Object.assign(ref.current?.style, {
      zIndex: "1000",
      position: "fixed",
      left: `${clientX}px`,
      top: `${clientY}px`,
      transform: "translate(-50%, -50%)",
    });
  };

  const onDragEnd = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;

    const board = document.querySelector("#board");
    const boardRect = board?.getBoundingClientRect();

    if (!boardRect) return;

    // check if the drop is inside the board and log the drop position
    const isOutBoard =
      clientX < boardRect.left ||
      clientX > boardRect.right ||
      clientY < boardRect.top ||
      clientY > boardRect.bottom;
    if (isOutBoard) {
      handleResetCardPosition();
      return;
    }

    handleOnBoardDrop();

    localStorage.remove("dragX");
    localStorage.remove("dragY");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResetCardPosition = () => {
    if (ref.current === null) return;

    const initialPosition = getInitialPosition();

    const currentPositionX = ref.current.style.left.replace("px", "");
    const currentPositionY = ref.current.style.top.replace("px", "");
    const dragDistanceX = Math.abs(
      Number(currentPositionX) - Number(initialPosition.x)
    );
    const dragDistanceY = Math.abs(
      Number(currentPositionY) - Number(initialPosition.y)
    );
    const dragDistance = Math.max(dragDistanceX, dragDistanceY) || 0;

    // clearInitialPosition();

    Object.assign(ref.current.style, {
      position: "fixed",
      left: `${initialPosition.x}px`,
      top: `${initialPosition.y}px`,
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
  };

  const getInitialPosition = () => {
    const initialPositionX = localStorage.getItem("initialX");
    const initialPositionY = localStorage.getItem("initialY");

    localStorage.removeItem("initialX");
    localStorage.removeItem("initialY");

    return {
      x: Number(initialPositionX),
      y: Number(initialPositionY),
    };
  };

  const getCurrentDragPosition = () => {
    const dragPositionX = localStorage.getItem("dragX");
    const dragPositionY = localStorage.getItem("dragY");

    return {
      x: Number(dragPositionX),
      y: Number(dragPositionY),
    };
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    // ...
  };

  const handleOnBoardDrop = () => {
    if (ref.current === null) return;

    // TODO: Calculate the distance to the final position
    const targetDistance = 200;

    const board = document.querySelector("#board");
    const boardCenterPosition = {
      x: board?.clientWidth ? board.clientWidth / 2 : 0,
      y: board?.clientHeight ? board.clientHeight / 2 : 0,
    };

    console.log(boardCenterPosition);

    const dragPosition = getCurrentDragPosition();

    Object.assign(ref.current.style, {
      position: "fixed",
      left: `${dragPosition.x}px`,
      top: `${dragPosition.y}px`,
      zIndex: "1000",
      transform: "initial",
      transition: "all 0.3s",
    });

    setTimeout(() => {
      if (ref.current === null) return;
      console.log("onDrop");

      setIsDragging(false);

      Object.assign(ref.current.style, {
        position: "fixed",
        left: `${boardCenterPosition.x}px`,
        top: `${boardCenterPosition.y}px`,
        transform: "translate(-50%, 50%)",
      });
    }, targetDistance);

    setTimeout(() => {
      if (ref.current === null) return;

      Object.assign(ref.current.style, {
        opacity: "0",
        transform: "translate(-50%, 50%) scale(0.5)",
        transition: "all 0.2s",
      });
    }, targetDistance + 300);
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
