import { BoardPosition } from "../types/game.types";

export const positionsAreEqual = (pos1: BoardPosition, pos2: BoardPosition) =>
  pos1.col === pos2.col && pos1.row === pos2.row;
