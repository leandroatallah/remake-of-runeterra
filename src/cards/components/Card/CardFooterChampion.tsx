import { ChampionCard } from "@/cards/models";
import { useCardContext } from "./CardContext";

export const CardFooterChampion = () => {
  const { attack, health } = useCardContext() as ChampionCard;

  return (
    <div className="card-footer">
      <div>attack: {attack}</div>
      <div>health: {health}</div>
    </div>
  );
};
