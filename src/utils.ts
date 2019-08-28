import { Board } from "./types";

export function createBoard(formattedString: string, placeholder = "-"): Board {
  const board = formattedString
    .replace(/\s/g, "")
    .split("")
    .map(value => (value === placeholder ? undefined : value));

  return { ...board };
}
