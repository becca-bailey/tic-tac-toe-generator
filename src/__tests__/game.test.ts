import { PlayerType, Level } from "./../types";
import { INVALID_PLAYERS, INVALID_BOARD } from "./../messages";
import { INITIAL_BOARD, DEFAULT_PLAYERS } from "./../game";
import { createGame } from "../game";
import { createBoard } from "../utils";
import { Board } from "../types";

describe("createGame", () => {
  const [player1, player2] = DEFAULT_PLAYERS;

  describe("with defaults", () => {
    it("creates an initial game state", () => {
      const game = createGame();
      const { value, done } = game.next();

      expect(done).toBe(false);
      expect(value).toEqual({
        players: DEFAULT_PLAYERS,
        board: INITIAL_BOARD,
        currentPlayer: player1,
        winner: undefined
      });
    });
  });

  describe("with invalid arguments", () => {
    it("throws an error if the players are invalid", () => {
      const game = createGame({ players: [] });

      try {
        game.next();
        fail("error not thrown");
      } catch (err) {
        expect(err.message).toEqual(INVALID_PLAYERS);
      }
    });

    it("throws an error if the board is invalid", () => {
      const board: Board = [];
      const game = createGame({ board });

      try {
        game.next();
        fail("error not thrown");
      } catch (err) {
        expect(err.message).toEqual(INVALID_BOARD);
      }
    });
  });

  it("is done when the board is full", () => {
    const board = createBoard(`
      X O O
      O X X
      X X O
    `);

    const game = createGame({ board });

    const { done } = game.next();

    expect(done).toBe(true);
  });

  it("is done when there is a winner", () => {
    const board = createBoard(`
      X O O
      O X -
      - - X 
    `);

    const game = createGame({ board });

    const { value, done } = game.next();

    expect(done).toBe(true);

    expect(value.winner).toEqual(player1);
  });

  describe("with human players", () => {
    it("can tie", () => {
      const game = createGame({
        players: [
          {
            id: "player-2",
            marker: "X",
            type: PlayerType.Human
          },
          {
            id: "player-2",
            marker: "O",
            type: PlayerType.Human
          }
        ]
      });

      const initialState = game.next();

      expect(initialState.value.board).toEqual(
        createBoard(`
          - - - 
          - - - 
          - - - 
      `)
      );

      let nextState = game.next(4);

      expect(nextState.value.board).toEqual(
        createBoard(`
          - - - 
          - X - 
          - - - 
        `)
      );

      nextState = game.next(1);

      expect(nextState.value.board).toEqual(
        createBoard(`
          - O - 
          - X - 
          - - - 
        `)
      );

      nextState = game.next(0);

      expect(nextState.value.board).toEqual(
        createBoard(`
          X O - 
          - X - 
          - - - 
        `)
      );

      nextState = game.next(8);

      expect(nextState.value.board).toEqual(
        createBoard(`
          X O - 
          - X - 
          - - O 
        `)
      );

      nextState = game.next(2);

      expect(nextState.value.board).toEqual(
        createBoard(`
          X O X 
          - X - 
          - - O 
        `)
      );

      nextState = game.next(6);

      expect(nextState.value.board).toEqual(
        createBoard(`
          X O X 
          - X - 
          O - O 
        `)
      );

      nextState = game.next(7);

      expect(nextState.value.board).toEqual(
        createBoard(`
          X O X 
          - X - 
          O X O 
        `)
      );

      nextState = game.next(3);

      expect(nextState.value.board).toEqual(
        createBoard(`
          X O X 
          O X - 
          O X O 
        `)
      );

      nextState = game.next(5);

      expect(nextState.value.board).toEqual(
        createBoard(`
          X O X 
          O X X 
          O X O 
        `)
      );

      // I want to avoid calling this a final time
      // nextState = game.next();

      expect(nextState.done).toBe(true);
    });
  });

  describe("with a computer player", () => {
    it("makes the first move", () => {
      const game = createGame({
        players: [
          {
            id: "player-1",
            marker: "X",
            type: PlayerType.Computer,
            level: Level.Hard
          },
          {
            id: "player-2",
            marker: "O",
            type: PlayerType.Human
          }
        ]
      });

      const initialState = game.next();

      expect(initialState.value.board).toEqual(
        createBoard(`
          X - - 
          - - - 
          - - - 
      `)
      );
    });

    it("wins the game", () => {
      const game = createGame({
        players: [
          {
            id: "player-1",
            marker: "X",
            type: PlayerType.Computer,
            level: Level.Hard
          },
          {
            id: "player-2",
            marker: "O",
            type: PlayerType.Human
          }
        ]
      });

      const initialState = game.next();

      expect(initialState.value.board).toEqual(
        createBoard(`
          X - - 
          - - - 
          - - - 
      `)
      );

      let nextState = game.next(4);

      expect(nextState.done).toBe(false);
      expect(nextState.value.board).toEqual(
        createBoard(`
          X - - 
          - O - 
          - - - 
        `)
      );
    });
  });
});
