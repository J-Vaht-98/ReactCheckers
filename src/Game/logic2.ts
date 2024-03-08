import { IPlayer } from "../slices/gameSlice";
import { BoardPosition, CheckersBoard } from "../types/game.types";
import {
  parseDownLeft,
  parseDownRight,
  parseUpLeft,
  parseUpRight,
} from "./Logic";
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
        if (board[i][j] === playerNr || board[i][j] === -1 * playerNr) {
          if (moveDir === "up" && i - 1 >= 0) {
            if (j - 1 >= 0 && board[i - 1][j - 1] !== playerNr) {
              buttons.push({ row: i, col: j });
            }
            if (j + 1 < board[i].length && board[i - 1][j + 1] !== playerNr) {
              buttons.push({ row: i, col: j });
            }
          } else if (moveDir === "down" && i + 1 <= board.length) {
            if (j - 1 >= 0 && board[i + 1][j - 1] !== playerNr) {
              buttons.push({ row: i, col: j });
            }
            if (j + 1 < board[i].length && board[i + 1][j + 1] !== playerNr) {
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
    console.log(player.moveDirection);
    const isKing = board[pos.row][pos.col] < 0;
    let moves: Move[] = [];
    if (player.moveDirection === "up" || isKing) {
      const upLeft = parseUpLeft(board, pos);
      if (upLeft) moves.push(upLeft);
      const upRight = parseUpRight(board, pos);
      if (upRight) moves.push(upRight);
    }
    if (player.moveDirection === "down" || isKing) {
      const downLeft = parseDownLeft(board, pos);
      if (downLeft) moves.push(downLeft);
      const downRight = parseDownRight(board, pos);
      if (downRight) moves.push(downRight);
    }
    return moves;
  },
  makeMove: (board: CheckersBoard, move: Move, activePlayer: IPlayer) => {
    let tmp = board[move.from.row][move.from.col];
    //Check if king
    board[move.from.row][move.from.col] = 0;
    board[move.to.row][move.to.col] = tmp;

    if (move.take) {
      board[move.take.row][move.take.col] = 0;
    }

    return board;
  },
};
