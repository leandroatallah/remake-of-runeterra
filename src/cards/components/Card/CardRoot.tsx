import { CardItem } from "@/cards/models";
import { CardContextProvider } from "./CardContext";

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
      <div
        className={[
          "w-[200px] aspect-[3/4] rounded-md p-2 border-2 border-gray-100 bg-zinc-800 select-none",
          className,
        ].join(" ")}
      >
        {card && !isTurned ? children : <div />}
      </div>
    </CardContextProvider>
  );
};
