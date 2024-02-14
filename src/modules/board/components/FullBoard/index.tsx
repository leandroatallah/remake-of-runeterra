import { BoardSide } from "@/modules/board/components/BoardSide";
import { PlayerArea } from "@/modules/board/components/PlayerArea";

export const FullBoard = () => {
  return (
    <div className="flex flex-col justify-between h-svh">
      <div className="h-20" />
      <PlayerArea isEnemy />
      <BoardSide />
      <PlayerArea />
    </div>
  );
};
