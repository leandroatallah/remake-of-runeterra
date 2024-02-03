import { CardItem } from "@/modules/cards/models";
import { CardContextProvider } from "./CardContext";
import { CARD_SHAPE_STYLE } from "@/styles/card";

interface CardRootProps {
  children?: React.ReactNode;
  card: CardItem | null;
  isTurned?: boolean;
  className?: string;
}

export const CardRoot = ({
  card,
  children,
  isTurned,
  className = "",
}: CardRootProps) => {
  return (
    <CardContextProvider value={card}>
      <div className={[CARD_SHAPE_STYLE, className].join(" ")}>
        {card && !isTurned ? children : <div />}
      </div>
    </CardContextProvider>
  );
};
