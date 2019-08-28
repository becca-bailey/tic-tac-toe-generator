import { createBoard } from "../utils";
import { getAvailableSpots } from "../board";

describe("board", () => {
  it("returns available spots", () => {
    const board = createBoard(`
            O - - 
            - X - 
            - - - 
        `);

    expect(getAvailableSpots(board)).toEqual([1, 2, 3, 5, 6, 7, 8]);
  });
});
