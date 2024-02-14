"use client";

import { BoardContextProvider } from "@/contexts/board/BoardContextProvider";
import { GameContextProvider } from "@/contexts/game/GameContextProvider";

interface BoardLayoutProps {
  children: React.ReactNode;
}

export default function BoardLayout({ children }: BoardLayoutProps) {
  return (
    <GameContextProvider>
      <BoardContextProvider>{children}</BoardContextProvider>
    </GameContextProvider>
  );
}
