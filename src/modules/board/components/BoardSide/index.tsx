import { Droppable } from "@/modules/drag-and-drop/components/Droppable";
import { BoardTrack } from "../BoardTrack";

export const BoardSide = () => {
  return (
    <Droppable>
      <div className="h-[480px] bg-zinc-400 w-full flex justify-center items-center">
        <BoardTrack />
      </div>
    </Droppable>
  );
};
