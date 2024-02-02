"use client";

import { BoardContextProvider } from "@/board/components/BoardContext";

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BoardContextProvider>{children}</BoardContextProvider>;
}
