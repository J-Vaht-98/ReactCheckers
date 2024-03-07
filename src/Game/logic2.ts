import { IPlayer } from "../slices/gameSlice";
import { BoardPosition, CheckersBoard } from "../types/game.types";
import { parseUpLeft, parseUpRight } from "./Logic";
export interface Move {
  from: BoardPosition;
  to: BoardPosition;
  take?: BoardPosition;
}
export const logic = {
  findSelectableButtons: (board: CheckersBoard, player: IPlayer) => {
    const playerNr = player.pieceNr;
    const moveDir = player.moveDirection;
    let buttons: BoardPosition[] = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === playerNr) {
          if (moveDir === "up" && i - 1 >= 0) {
            if (j - 1 >= 0 && board[i - 1][j - 1] !== playerNr) {
              buttons.push({ row: i, col: j });
            }
            if (j + 1 < board[i].length && board[i - 1][j + 1] !== playerNr) {
              buttons.push({ row: i, col: j });
            }
          } else if (moveDir === "down" && i + 1 <= board.length) {
            if (j - 1 >= 0 && board[i - 1][j - 1] !== playerNr) {
              buttons.push({ row: i, col: j });
            }
            if (j + 1 < board[i].length && board[i - 1][j + 1] !== playerNr) {
              buttons.push({ row: i, col: j });
            }
          }
        }
      }
    }
    return buttons;
  },
  calculateMovesFromPos: (
    board: CheckersBoard,
    pos: BoardPosition,
    player: IPlayer
  ) => {
    const isKing = board[pos.row][pos.col] < 0;
    let moves: Move[] = [];
    if (player.moveDirection === "up" || isKing) {
      const upLeft = parseUpLeft(board, pos);
      if (upLeft) moves.push(upLeft);
      const upRight = parseUpRight(board, pos);
      if (upRight) moves.push(upRight);
    }
    if (player.moveDirection === "down" || isKing) {
      const upLeft = parseUpLeft(board, pos);
      if (upLeft) moves.push(upLeft);
      const upRight = parseUpRight(board, pos);
      if (upRight) moves.push(upRight);
    }
    return moves;
  },
};
