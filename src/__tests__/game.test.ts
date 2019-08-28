import { INITIAL_BOARD } from "./../game";
import { Human, PlayerType, Computer, Level } from "../types";
import { createGame } from "../game";

const player1: Human = {
  id: "1",
  symbol: "😉",
  type: PlayerType.Human
};

const player2: Computer = {
  id: "2",
  symbol: "😻",
  type: PlayerType.Computer,
  level: Level.Hard
};

describe("createGame", () => {
  describe("with default players", () => {
    const players = [player1, player2];

    it("creates an initial game state", () => {
      const game = createGame(players);
      const { value, done } = game.next();

      expect(done).toBe(false);
      expect(value).toEqual({
        board: INITIAL_BOARD,
        players,
        currentPlayer: player1,
        winner: undefined
      });
    });
  });
});
