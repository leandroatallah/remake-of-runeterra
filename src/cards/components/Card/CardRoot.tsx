import { CardItem } from "@/cards/models";
import { CardContextProvider } from "./CardContext";

interface CardRootProps {
  card: CardItem;
  children: React.ReactNode;
}

export const CardRoot = ({ card, children, ...rest }: CardRootProps) => {
  return (
    <CardContextProvider value={card}>
      <div
        className="w-[200px] aspect-[3/4] rounded-md p-2 border-2 border-gray-100"
        {...rest}
      >
        {children}
      </div>
    </CardContextProvider>
  );
};
