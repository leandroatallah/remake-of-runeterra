"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  DropResult,
  Droppable,
  ResponderProvided,
} from "@hello-pangea/dnd";

import { Hand } from "@/cards/components/Hand";
import { cardDataMapper } from "@/cards/utils/cardDataMapper";
import { CardItem } from "@/cards/models";
import mockChampionCard from "@/utils/mocks/cards/champion-card.json";
import mockSpellCard from "@/utils/mocks/cards/spell-card.json";

export default function Home() {
  const [playerHand, setPlayerHand] = useState<CardItem[]>([]);

  useEffect(() => {
    const sampleChampion = cardDataMapper(mockChampionCard);
    const sampleSpell = cardDataMapper(mockSpellCard);

    setPlayerHand([sampleChampion, sampleSpell]);
  }, []);

  function onDragEnd(result: DropResult, provided: ResponderProvided) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const reorderedList = reorder(playerHand, source.index, destination.index);
    setPlayerHand(reorderedList);
  }

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="list" direction="horizontal">
          {(provided) => (
            <>
              <div
                ref={provided.innerRef}
                className="h-[240px] bg-zinc-600 w-full"
                {...provided.droppableProps}
              >
                {provided.placeholder}
              </div>
              <div className="flex gap-4">
                <Hand cards={playerHand} />
              </div>
            </>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
