import { Board, Player, PlayerType, Level, Game } from "./types";
import { createBoard } from "./utils";
import { INVALID_PLAYERS, INVALID_BOARD } from "./messages";

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

type GameConfig = {
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

function isFull(board: Board) {
  return Object.values(board).every(value => !!value);
}

export function getNextPlayer(players: Player[], currentPlayer?: Player) {
  if (!currentPlayer) {
    const [player1] = players;
    return player1;
  }
  return players.find(player => player !== currentPlayer);
}

const winningIndeces = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function getWinner(board: Board, players: Player[]) {
  const [player1, player2] = players;
  let winner = undefined;
  winningIndeces.forEach(row => {
    const markers = row.map(i => board[i]);
    if (markers.every(m => m === player1.marker)) {
      winner = player1;
    } else if (markers.every(m => m === player2.marker)) {
      winner = player2;
    }
  });
  return winner;
}

function getBestMove(board: Board, players: Player[]) {
  return 0;
}

export function* createGame(config: GameConfig = {}) {
  validateConfig(config);

  const { players = DEFAULT_PLAYERS, board = INITIAL_BOARD } = config;
  let currentPlayer: Player | undefined = getNextPlayer(players);
  let winner: Player | undefined = getWinner(board, players);
  let currentBoard: Board = board;

  let game = {
    players,
    board: currentBoard,
    currentPlayer,
    winner
  };

  let spotIndex: number;

  while (!winner && !isFull(currentBoard)) {
    if (currentPlayer.type === PlayerType.Computer) {
      const bestMove = getBestMove(board, players);
      currentBoard = { ...currentBoard, [bestMove]: currentPlayer.marker };
      winner = getWinner(currentBoard, players);

      game = {
        ...game,
        board: currentBoard,
        currentPlayer,
        winner
      };

      if (winner || isFull(currentBoard)) {
        return game;
      }

      // Get next player
      currentPlayer = getNextPlayer(players, currentPlayer);
      spotIndex = yield game;
    }
    if (spotIndex === undefined) {
      spotIndex = yield game;
    } else {
      // Add current player's marker to board
      currentBoard = { ...currentBoard, [spotIndex]: currentPlayer.marker };

      // Check to see if this is an end state
      winner = getWinner(currentBoard, players);

      game = {
        ...game,
        board: currentBoard,
        currentPlayer,
        winner
      };

      if (winner || isFull(currentBoard)) {
        return game;
      }

      // Get next player
      currentPlayer = getNextPlayer(players, currentPlayer);
      spotIndex = yield game;
    }
  }

  return game;
}
