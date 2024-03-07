import {
  AIPlayerInterface,
  GameInterface,
  MoveDirection,
} from "../types/game.types";
import AIMoveEngine from "./AIMoveEngine";
import Player from "./Player";
export default class AIPlayer extends Player implements AIPlayerInterface {
  engine: AIMoveEngine;
  selectPieceTimeout!: number;
  selectSquareTimeout: number;
  constructor(
    game: GameInterface | null,
    nr: number,
    moveDirection: MoveDirection
  ) {
    super(game, nr, moveDirection);
    this.type = "AI";
    this.engine = new AIMoveEngine(this);
    this.selectPieceTimeout = 500;
    this.selectSquareTimeout = this.selectPieceTimeout + 500;
  }

  beginTurn() {
    super.beginTurn(); //sets the available moves
    if (!this.loser) {
      this.engine.update(this);
      const move = this.engine.getMove();
      const piece = [move.from.row, move.from.col];
      const square = [move.to.row, move.to.col];
      setTimeout(() => this.emitPieceSelect(piece), this.selectPieceTimeout);
      setTimeout(() => this.emitSquareSelect(square), this.selectSquareTimeout);
    }
  }
  emitPieceSelect(pos: any) {
    const ev = new CustomEvent("pieceSelected", {
      detail: {
        pos: pos,
      },
    });
    document.dispatchEvent(ev);
  }
  emitSquareSelect(pos: any) {
    const ev = new CustomEvent("squareSelected", {
      detail: {
        pos: pos,
      },
    });
    document.dispatchEvent(ev);
  }
}
