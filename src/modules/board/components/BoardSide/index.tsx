import { BoardTrack } from "../BoardTrack";

export const BoardSide = () => {
  return (
    <div className="h-[480px] bg-zinc-400 w-full flex justify-center items-center">
      <BoardTrack disabled />
    </div>
  );
};
