import { CheckersBoard } from "../types/game.types";

export function countPlayerBtns(board: CheckersBoard, playerNr: number) {
  let buttonCount = 0;
  for (let i in board)
    for (let j in board[i]) {
      if (Math.abs(board[i][j]) === playerNr) buttonCount++;
    }
  return buttonCount;
}
export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
export function posToString(row: number, col: number) {
  return `${row}${col}`;
}
