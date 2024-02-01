import { useEffect, useState } from "react";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "@hello-pangea/dnd";

import { cardDataMapper } from "@/cards/utils/cardDataMapper";
import { CardItem } from "@/cards/models";
import mockChampionCard from "@/utils/mocks/cards/champion-card.json";
import mockSpellCard from "@/utils/mocks/cards/spell-card.json";
import { BoardSide } from "@/board/components/BoardSide";
import { PlayerArea } from "@/board/components/PlayerArea";
import {
  DROPPABLE_BOARD_ID,
  DROPPABLE_HAND_ID,
} from "@/utils/constants/drag-and-drop";
import { playDraggableItem, reorderDraggableList } from "@/board/functions";

export const FullBoard = () => {
  const [playerHand, setPlayerHand] = useState<CardItem[]>([]);
  const [playerBoard, setPlayerBoard] = useState<CardItem[]>([]);

  function onDragEnd(result: DropResult, provided: ResponderProvided) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === DROPPABLE_BOARD_ID) {
      const { result, removed } = playDraggableItem(playerHand, source.index);
      setPlayerHand(result);
      setPlayerBoard((prev) => [...prev, removed]);
      return;
    }

    if (destination.droppableId === DROPPABLE_HAND_ID) {
      const result = reorderDraggableList(
        playerHand,
        source.index,
        destination.index
      );
      setPlayerHand(result);
      return;
    }
  }

  useEffect(() => {
    // Mounting the player hand with some sample cards
    const sampleChampion = cardDataMapper(mockChampionCard);
    const sampleSpell = cardDataMapper(mockSpellCard);

    setPlayerHand([sampleChampion, sampleSpell]);
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col justify-between h-svh">
        <BoardSide cards={playerBoard} />
        <PlayerArea cards={playerHand} />
      </div>
    </DragDropContext>
  );
};
