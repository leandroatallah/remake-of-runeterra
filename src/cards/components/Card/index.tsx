import { ChampionCard, SpellCard } from "@/cards/models";
import * as Composition from "./CardComposition";

interface CardProps {
  data: ChampionCard | SpellCard;
}

export const Card = ({ data }: CardProps) => {
  return (
    <Composition.Root card={data}>
      <Composition.Header />
      <Composition.Title />
      {data.isChampion && <Composition.FooterChampion />}
    </Composition.Root>
  );
};
