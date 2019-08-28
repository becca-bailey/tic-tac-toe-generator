import { Board } from "./types";

export function isFull(board: Board) {
  return Object.values(board).every(value => !!value);
}

export function getAvailableSpots(board: Board) {
  return Object.keys(board)
    .filter(i => !board[i])
    .map(key => Number(key));
}
