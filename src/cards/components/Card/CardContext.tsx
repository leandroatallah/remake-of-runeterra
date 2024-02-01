import { CardItem } from "@/cards/models";
import { createContext, useContext } from "react";

type CardContextProps = CardItem | null;

const CardContext = createContext<CardContextProps>(null);

export function useCardContext() {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error("useCardContext must be used within a CardContextProvider");
  }

  return context;
}

export const CardContextProvider = CardContext.Provider;
