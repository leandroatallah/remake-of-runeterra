import { CardItem } from "@/modules/cards/models";
import { CardContextProvider } from "./CardContext";
import { CARD_SHAPE_STYLE } from "@/styles/card";

interface CardRootProps {
  children?: React.ReactNode;
  card: CardItem | null;
  isTurned?: boolean;
  className?: string;
  hoverEffect?: "hand" | "board" | "none";
}

export const CardRoot = ({
  card,
  children,
  isTurned,
  className = "",
  hoverEffect,
}: CardRootProps) => {
  const hoverEffectClass: Record<string, string> = {
    hand: !isTurned
      ? [
          "cursor-pointer transition-transform duration-100",
          "hover:scale-150 hover:relative hover:z-50 hover:-translate-y-1/4",
        ].join(" ")
      : "",
  };

  const hoverEffectStyle =
    hoverEffect && hoverEffectClass[hoverEffect]
      ? hoverEffectClass[hoverEffect]
      : "";

  const classList = [CARD_SHAPE_STYLE, hoverEffectStyle, className].join(" ");

  return (
    <CardContextProvider value={card}>
      <div className={classList}>{card && !isTurned ? children : <div />}</div>
    </CardContextProvider>
  );
};
