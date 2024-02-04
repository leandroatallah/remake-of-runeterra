"use client";

import { BoardContextProvider } from "@/contexts/board/BoardContextProvider";

interface BoardLayoutProps {
  children: React.ReactNode;
}

export default function BoardLayout({ children }: BoardLayoutProps) {
  return <BoardContextProvider>{children}</BoardContextProvider>;
}
