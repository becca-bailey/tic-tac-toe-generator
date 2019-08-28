import { getAvailableSpots } from "./board";
import { advanceGameState, getNextPlayer, getWinner, isOver } from "./rules";
import { Game, Player } from "./types";

const STARTING_SCORE = 10;

function getScore(game: Game, depth: number) {
  const { players, board, currentPlayer } = game;
  const opponent = getNextPlayer(players, currentPlayer);
  const winner = getWinner(board, players);
  switch (winner) {
    case currentPlayer:
      return STARTING_SCORE - depth;
    case opponent:
      return depth - STARTING_SCORE;
    default:
      return 0;
  }
}

function getMinOrMax(scores: number[], game: Game, player: Player) {
  const { currentPlayer } = game;
  if (player === currentPlayer) {
    return Math.max(...scores);
  } else {
    return Math.min(...scores);
  }
}

function minimax(game: Game, player: Player) {
  let depth = 0;
  const { board } = game;
  const availableSpots = getAvailableSpots(board);
  const scores = availableSpots.map(spot => {
    const possibleGameState = advanceGameState(game, spot);
    if (isOver(possibleGameState)) {
      return getScore(possibleGameState, depth);
    } else {
      depth += 1;
      return getMinOrMax(
        minimax(possibleGameState, player),
        possibleGameState,
        player
      );
    }
  });
  return scores;
}

export function getBestMove(game: Game) {
  const { board } = game;
  const availableSpots = getAvailableSpots(board);
  const scores: number[] = minimax(game, game.currentPlayer);
  const maxScore = Math.max(...scores);
  const zippedScores = availableSpots.map((spot, i) => {
    return [spot, scores[i]];
  });

  const [spot] = zippedScores.find(([_spot, score]) => score === maxScore);
  return spot;
}
