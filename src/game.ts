import { getBestMove } from "./ai";
import { isFull } from "./board";
import { GameConfig, validateConfig } from "./config";
import { getNextPlayer, getWinner, advanceGameState } from "./rules";
import { Board, Level, Player, PlayerType } from "./types";
import { createBoard } from "./utils";

export const INITIAL_BOARD: Board = createBoard(`
    - - - 
    - - - 
    - - -
`);

export const DEFAULT_PLAYERS: Player[] = [
  {
    id: "player-1",
    marker: "X",
    type: PlayerType.Human
  },
  {
    id: "player-2",
    marker: "O",
    type: PlayerType.Computer,
    level: Level.Hard
  }
];

export function* createGame(config: GameConfig = {}) {
  validateConfig(config);

  const { players = DEFAULT_PLAYERS, board = INITIAL_BOARD } = config;

  let game = {
    players,
    board,
    currentPlayer: getNextPlayer(players),
    winner: getWinner(board, players)
  };

  let spotIndex: number;

  while (!game.winner && !isFull(game.board)) {
    if (game.currentPlayer.type === PlayerType.Computer) {
      spotIndex = getBestMove(game);
    }

    // Only advances game if there is a spot index, and it is not taken
    if (spotIndex !== undefined && !game.board[spotIndex]) {
      game = advanceGameState(game, spotIndex);

      if (game.winner || isFull(game.board)) {
        // This will return { done: true } if the game is over
        return game;
      }
    }

    spotIndex = yield game;
  }

  // This will return { done: true } if the game is over
  return game;
}
