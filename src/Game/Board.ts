import {
  CheckersBoard,
  DirectionMap,
  PlayerInterface,
} from "../types/game.types";
export default class Board implements IBoard {
  board: CheckersBoard;
  dimension: number;
  directionMap: DirectionMap;
  constructor(board: CheckersBoard, players?: PlayerInterface[]) {
    if (this.checkBoardDimensions(board)) {
      this.board = board;
    } else {
      throw Error("Board has to be a NxN matrix");
    }

    this.dimension = board.length;
    //This map is needed for making kings. It is set from inside the player class.
    this.directionMap = {}; //this.mapDirectionsToNrs(players);
  }
  checkBoardDimensions(board: CheckersBoard) {
    const N = board.length;
    for (let i in board) if (board[i].length !== N) return false;
    return true;
  }
  mapDirectionsToNrs(players: PlayerInterface[]) {
    let map: any = {};
    for (let i = 0; i < players.length; i++) {
      const playerNr = players[i].nr;
      const playerDir = players[i].moveDirection;
      map[playerNr] = playerDir;
    }
    return map;
  }
  makeMove(Move: any) {
    if (Move.take) this.board[Move.take.row][Move.take.col] = 0;
    const movedElement = this.board[Move.from.row][Move.from.col];
    //@ts-ignore
    const direction: any = this.directionMap[movedElement];
    const toRow = Move.to.row;
    const toCol = Move.to.col;
    switch (direction) {
      case "up":
        if (toRow === 0 && movedElement > 0) {
          this.board[Move.from.row][Move.from.col] *= -1;
        }
        break;
      case "down":
        if (toRow === this.board.length - 1 && movedElement > 0) {
          this.board[Move.from.row][Move.from.col] *= -1;
        }
        break;
      case "left":
        if (toCol === 0 && movedElement > 0) {
          this.board[Move.from.row][Move.from.col] *= -1;
        }
        break;
      case "right":
        if (toCol === this.board.length - 1 && movedElement > 0) {
          this.board[Move.from.row][Move.from.col] *= -1;
        }
        break;

      default:
        break;
    }

    this.board[Move.to.row][Move.to.col] =
      this.board[Move.from.row][Move.from.col];
    this.board[Move.from.row][Move.from.col] = 0;
  }
}
