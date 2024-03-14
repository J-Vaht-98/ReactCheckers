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
        const isKing = board[i][j] * -1 === playerNr;
        if (board[i][j] === playerNr || isKing) {
          if ((isKing || moveDir === "up") && i - 1 >= 0) {
            if (j - 1 >= 0 && board[i - 1][j - 1] !== playerNr) {
              buttons.push({ row: i, col: j });
              continue;
            }
            if (j + 1 < board[i].length && board[i - 1][j + 1] !== playerNr) {
              buttons.push({ row: i, col: j });
              continue;
            }
          } else if (
            (isKing || moveDir === "down") &&
            i + 1 <= board.length - 1
          ) {
            if (j - 1 >= 0 && board[i + 1][j - 1] !== playerNr) {
              buttons.push({ row: i, col: j });
              continue;
            }
            if (j + 1 < board[i].length && board[i + 1][j + 1] !== playerNr) {
              buttons.push({ row: i, col: j });
              continue;
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
    console.log(isKing, pos);
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
  // makeMove: (board: CheckersBoard, move: Move, activePlayer: IPlayer) => {
  //   let tmp = board[move.from.row][move.from.col];
  //   //Check if king
  //   if (activePlayer.moveDirection === "up" && move.to.row <= 0) {
  //     tmp *= -1;
  //   } else if (
  //     activePlayer.moveDirection === "down" &&
  //     move.to.row >= board.length - 1
  //   ) {
  //     tmp *= -1;
  //   }
  //   board[move.from.row][move.from.col] = 0;
  //   board[move.to.row][move.to.col] = tmp;

  //   if (move.take) {
  //     board[move.take.row][move.take.col] = 0;
  //     activePlayer.score++;
  //   }

  //   return board;
  // },
};
