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
import { useBoardContext } from "../BoardContext";
import { useCallback, useRef, useState } from "react";

export const FullBoard = () => {
  const { playerHand, setPlayerHand, playerBoard, setPlayerBoard } =
    useBoardContext();
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

      // // Player cant drop or move cards on their hand
      // if (destination.droppableId === DROPPABLE_HAND_ID) {
      //   return;
      // }

      const { droppableId } = destination;

      const isBoardTrack = droppableId.split("-")[0] === DROPPABLE_BOARD_ID;

      if (isBoardTrack) {
        const { result, removed } = playDraggableItem(playerHand, source.index);
        setPlayerHand(result);
        setPlayerBoard((prev) => [
          ...prev,
          { ...removed, boardTrack: droppableId },
        ]);
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
          <BoardSide />
          <PlayerArea />
        </div>
      </DragDropContext>
    </>
  );
};
