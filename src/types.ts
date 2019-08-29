type Marker = string;

export enum PlayerType {
  Human = "Human",
  Computer = "Computer"
}

export enum Level {
  Hard = "Hard",
  Easy = "Easy"
}

type BasePlayer = {
  id: string;
  marker: string;
};

export type Human = BasePlayer & {
  type: PlayerType.Human;
};

export type Computer = BasePlayer & {
  type: PlayerType.Computer;
  level?: Level;
};

export type Player = Human | Computer;

export type Board = { [key: number]: Marker | undefined };

export type Game = {
  board: Board;
  players: Player[];
  currentPlayer: Player;
};
