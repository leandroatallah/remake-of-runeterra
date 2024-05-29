import { Droppable } from "@/modules/drag-and-drop/components/Droppable";
import { BoardTrack } from "../BoardTrack";

export const BoardSide = () => {
  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // ...
  };

  return (
    <Droppable onDrop={handleOnDrop}>
      <div className="h-[280px] bg-zinc-400 w-full flex justify-center items-center">
        <BoardTrack />
      </div>
    </Droppable>
  );
};
