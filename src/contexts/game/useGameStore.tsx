import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface GameContextProps {
  turn: number;
  isDraggingSomeCard: boolean;
  setTurn: (turn: number) => void;
  setIsDraggingSomeCard: (isDraggingSomeCard: boolean) => void;
}

export const useGameStore = create<GameContextProps>()(
  devtools((set) => ({
    turn: 0,
    isDraggingSomeCard: false,
    setTurn: (turn: number) => set({ turn }),
    setIsDraggingSomeCard: (isDraggingSomeCard: boolean) =>
      set({ isDraggingSomeCard }),
  }))
);
