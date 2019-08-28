type PlayerId = string;

export enum PlayerType {
  Human = "Human",
  Computer = "Computer"
}

export enum Level {
  Hard = "Hard",
  Easy = "Easy"
}

type BasePlayer = {
  id: PlayerId;
  symbol: string;
};

export type Human = BasePlayer & {
  type: PlayerType.Human;
};

export type Computer = BasePlayer & {
  type: PlayerType.Computer;
  level: Level;
};

export type Player = Human | Computer;

export type Board = {
  [key: string]: PlayerId | undefined;
};

export type Game = {
  board: Board;
  players: Player[];
  currentPlayer: Player;
};
