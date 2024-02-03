import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "@hello-pangea/dnd";

import { BoardSide } from "@/board/components/BoardSide";
import { PlayerArea } from "@/board/components/PlayerArea";
import {
  DROPPABLE_BOARD_ID,
  DROPPABLE_HAND_ID,
} from "@/utils/constants/drag-and-drop";
import { playDraggableItem, reorderDraggableList } from "@/board/functions";
import { useBoardContext } from "../BoardContext";

export const FullBoard = () => {
  const { playerHand, setPlayerHand, playerBoard, setPlayerBoard } =
    useBoardContext();

  function onDragEnd(result: DropResult, provided: ResponderProvided) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

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
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col justify-between h-svh">
        <div className="h-20" />
        <BoardSide />
        <PlayerArea cards={playerHand} />
      </div>
    </DragDropContext>
  );
};
