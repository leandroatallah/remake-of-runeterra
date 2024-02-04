export interface Player {
  id: string;
  name: string;
  type: PlayerType;
  isPlayer: boolean;
}

export enum PlayerType {
  Human = "Human",
  AI = "AI",
}
