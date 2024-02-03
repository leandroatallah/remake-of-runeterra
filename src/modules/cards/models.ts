export interface CardBase {
  id: string;
  type: CardType;
  title: string;
  regions: Region[];
  cost: number;
  keywords: Keyword[];
  levelUpDescription: string;
  mechanics: Mechanic[];
  deckId?: string;
  boardTrack?: string;
  isChampion?: boolean;
  isSpell?: boolean;
}

export interface ChampionCard extends CardBase {
  attack: number;
  health: number;
  associatedCards: string[];
  flavorText?: string;
  artistName?: string;
}

export interface SpellCard extends CardBase {
  spellSpeed: SpellSpeed;
  spellSpeedRef: string;
  mechanics: Mechanic[];
  flavorText?: string;
  artistName?: string;
}

export type CardItem = ChampionCard | SpellCard;

export interface Keyword {
  name: string;
  description: string;
  iconAbsolutePath?: string;
}

export interface Region {
  name: string;
  color: string;
  iconAbsolutePath?: string;
}

export interface Mechanic {}

export enum SpellSpeed {
  Burst = "Burst",
  Fast = "Fast",
  Slow = "Slow",
}

export enum CardType {
  champion = "champion",
  spell = "spell",
}
