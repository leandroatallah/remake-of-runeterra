"use client";

import { BoardContextProvider } from "@/modules/board/components/BoardContext";

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BoardContextProvider>{children}</BoardContextProvider>;
}
