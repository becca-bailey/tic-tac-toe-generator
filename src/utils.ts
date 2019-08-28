export function createBoard(formattedString: string, placeholder = "-") {
  const values = formattedString.replace(/\s/g, "").split("");
  return values.reduce((board, value, index) => {
    if (value !== placeholder) {
      board[index] = value;
      return board;
    }
  }, {});
}
