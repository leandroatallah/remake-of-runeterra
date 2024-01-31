import { CardType } from "../models";

export function cardDataMapper(data: any) {
  return {
    ...data,
    // TODO: Map others types
    type: data.type as CardType,
    isChampion: data.type === CardType.champion,
    isSpell: data.type === CardType.spell,
  };
}
