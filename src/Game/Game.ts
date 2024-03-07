import { defaultBoard } from "../Constants";
import {
  BoardPosition,
  CheckersBoard,
  MoveDirection,
} from "../types/game.types";
import { logic } from "./logic2";

interface IPlayer {
  id: string;
  pieceNr: 1 | 2 | 3 | 4;
}
//Directions that buttons move towards initally
const moveDirections: { [key: number]: MoveDirection } = {
  1: "down",
  2: "up",
  3: "left",
  4: "right",
};

export interface IGame {
  board: CheckersBoard;
  selectedPiece: BoardPosition;
  availableMoves: BoardPosition[];
  getSelectablePieces: () => BoardPosition[];
}
interface GameParams {
  boardDimensions: number;
  players: IPlayer[];
}
export class Game implements IGame {
  board: number[][];
  players!: IPlayer[];
  activePlayerIndex: number;
  availableMoves!: BoardPosition[];
  selectedPiece!: BoardPosition;
  selectedPieceMoves!: BoardPosition[];
  selectablePieces!: BoardPosition[];
  winner = false;
  constructor({ boardDimensions, players }: GameParams) {
    this.board = defaultBoard;

    this.players = players;
    this.activePlayerIndex = 0;
    this.getSelectablePieces();
  }
  getSelectablePieces() {
    const activePlayer = this.players[this.activePlayerIndex];
    const mvDirection = moveDirections[activePlayer.pieceNr];
    return logic.findSelectableButtons(
      this.board,
      activePlayer.pieceNr,
      mvDirection
    );
  }
  // changeActivePlayer() {
  //   if (!this.winner) {
  //     this.checkPlayerButtons();
  //     this.clearMove();
  //     this.setIndex();

  //     this.activePlayer = this.players[this.activePlayerIndex];
  //     if (this.activePlayer.loser === true) {
  //       this.changeActivePlayer(); //skip players who have already lost (no buttons left)
  //     }
  //     this.startTurn();
  //     this.emitState();
  //   } else {
  //     this.clearMove();
  //   }
  // }
  // setIndex() {
  //   const currentPlayerIndex = this.activePlayerIndex;
  //   const nextPlayerIndex =
  //     currentPlayerIndex + 1 > this.players.length - 1
  //       ? 0
  //       : currentPlayerIndex + 1;
  //   this.activePlayerIndex = nextPlayerIndex;
  // }
  // startTurn() {
  //   this.availableMoves = [];
  //   const getSelectablePieces = (board:CheckersBoard, activePlayer:IPlayer):BoardPosition[]{

  //   }
  //   this.selectablePieces = getSelectablePieces
  // }
  // setSelectedPiece([row, col]: number[]) {
  //   //sets the selected piece and moves for that piece
  // }
  // emitState() {
  //   //Overridden in MultiplayerGame
  //   return null;
  // }
  // makeMove([row, col]: number[]) {
  //   if (this.selectedPieceMoves) {
  //     for (let i = 0; i < this.selectedPieceMoves.length; i++) {
  //       const square = this.selectedPieceMoves[i].to;
  //       if (row === square.row && col === square.col) {
  //         const selectedMove = this.selectedPieceMoves[i];
  //         this.board.makeMove(selectedMove, this.activePlayer);
  //         if (
  //           selectedMove.hasOwnProperty("take") &&
  //           selectedMove["take"] !== undefined
  //         )
  //           this.activePlayer.score++;
  //         const isDoubleTake = this.checkDoubleTake(selectedMove, row, col);
  //         if (!isDoubleTake) this.changeActivePlayer();
  //         else this.startTurn();

  //         break;
  //       }
  //     }
  //   }
  // }
  // clearMove() {
  //   this.selectedPiece = null;
  //   this.selectedPieceMoves = null;
  // }
  // checkPlayerButtons() {
  //   const board = this.board.board;
  //   let nrs: any = this.players.map((player) => {
  //     if (!player.loser) return player.nr;
  //   });
  //   nrs = nrs.filter((nr: any) => nr !== undefined);
  //   if (nrs.length === 1) {
  //     this.winner = this.players[nrs[0] - 1].nr;
  //   }
  //   const btns: any = this.players.map((player) => {
  //     if (!player.loser) return 0;
  //   });
  //   for (let i = 0; i < board.length; i++) {
  //     for (let j = 0; j < board.length; j++) {
  //       const el = Math.abs(board[i][j]);
  //       if (nrs.includes(el)) {
  //         btns[el - 1]++;
  //       }
  //     }
  //   }
  //   btns.forEach((nrOfButtons: number, i: number) => {
  //     if (nrOfButtons === 0) {
  //       this.players[i].loser = true;
  //       console.log("Player", i + 1, "loses");
  //     }
  //   });
  // }
  // checkDoubleTake(move: any, row: number, col: number) {
  //   //check if button has double take
  //   //if there wasnt a take it cant be a double take
  //   if (move.take === undefined) return false;
  //   const isKing = this.board.board[row][col] < 0;
  //   const btn = new Button(this.activePlayer, row, col, isKing);
  //   const moves = btn.getMoves();
  //   for (let i in moves) {
  //     if (moves[i].hasOwnProperty("take") && moves[i].take !== undefined)
  //       return true;
  //   }
  //   return false;
  // }
}
