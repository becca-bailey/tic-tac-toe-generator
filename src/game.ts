import { Board, Player } from "./types";
import { createBoard } from "./utils";

export const INITIAL_BOARD: Board = createBoard(`
    - - - 
    - - - 
    - - -
`);

export function* createGame(players: Player[], board: Board = INITIAL_BOARD) {
  let currentPlayer: Player = players[0];
  let winner: Player;
  const game = {
    players,
    board,
    currentPlayer,
    winner
  };
  yield game;
}
