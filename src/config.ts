import { INVALID_BOARD, INVALID_PLAYERS } from "./messages";
import { Board, Player } from "./types";

export type GameConfig = {
  players?: Player[];
  board?: Board;
};

export function validateConfig({ players, board }: GameConfig) {
  if (players && players.length !== 2) {
    throw new Error(INVALID_PLAYERS);
  }
  if (board && Object.keys(board).length !== 9) {
    throw new Error(INVALID_BOARD);
  }
}
