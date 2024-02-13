import { useCallback, useRef, useState } from "react";
import {
  DragDropContext,
  DropResult,
  PreDragActions,
  ResponderProvided,
  SensorAPI,
  SnapDragActions,
} from "@hello-pangea/dnd";

import { BoardSide } from "@/modules/board/components/BoardSide";
import { PlayerArea } from "@/modules/board/components/PlayerArea";
import {
  DROPPABLE_BOARD_ID,
  DROPPABLE_HAND_ID,
} from "@/constants/drag-and-drop";
import {
  playDraggableItem,
  reorderDraggableList,
} from "@/modules/board/functions";
import { useBoardContext } from "@/contexts/board/useBoardContext";

export const FullBoard = () => {
  const {
    playerState: {
      hand: playerHand,
      setHand: setPlayerHand,
      board: playerBoard,
      setBoard: setPlayerBoard,
    },
    enemyState: {
      hand: enemyHand,
      setHand: setEnemyHand,
      board: enemyBoard,
      setBoard: setEnemyBoard,
    },
  } = useBoardContext();
  const sensorAPIRef = useRef<SensorAPI | undefined | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isControlDragging, setIsControlDragging] = useState(false);

  const onDragEnd = useCallback(
    (result: DropResult, provided: ResponderProvided) => {
      const { source, destination } = result;

      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const { droppableId, index } = destination;

      const isBoardTrack = droppableId === DROPPABLE_BOARD_ID;

      if (isBoardTrack) {
        const { result, removed } = playDraggableItem(playerHand, source.index);
        setPlayerHand(result);
        setPlayerBoard((prev) => {
          const newBoard = [...prev];
          newBoard.splice(index, 0, removed);
          return newBoard;
        });
        return;
      }

      if (droppableId === DROPPABLE_HAND_ID) {
        const result = reorderDraggableList(
          playerHand,
          source.index,
          destination.index
        );
        setPlayerHand(result);
        return;
      }
    },
    [playerHand, setPlayerHand, setPlayerBoard]
  );

  function runsheet(): SnapDragActions | undefined | null {
    const [firstPlayerHand] = playerHand;
    const quoteId = firstPlayerHand.deckId!;

    if (isDragging) {
      return null;
    }

    const api: SensorAPI | undefined | null = sensorAPIRef.current;
    console.log(api);

    if (!api) {
      console.warn("unable to find sensor api");
      return null;
    }

    const preDrag: PreDragActions | undefined | null = api.tryGetLock(quoteId);

    if (!preDrag) {
      console.log("unable to start capturing");
      return null;
    }

    const actions: SnapDragActions = preDrag.snapLift();
    const { drop, moveRight } = actions;
    moveRight();
    drop();

    setIsControlDragging(true);
    return preDrag.snapLift();
  }

  return (
    <>
      {/* <button className="fixed bottom-0 left-0" onClick={() => runsheet()}>
        RUN
      </button> */}
      <DragDropContext
        onDragEnd={onDragEnd}
        sensors={[
          (api) => {
            sensorAPIRef.current = api;
          },
        ]}
      >
        <div className="flex flex-col justify-between h-svh">
          <div className="h-20" />
          <PlayerArea isEnemy />
          <BoardSide />
          <PlayerArea />
        </div>
      </DragDropContext>
    </>
  );
};
