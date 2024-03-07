import {
  CheckersBoard,
  GameInterface,
  MoveDirection,
  PlayerInterface,
  PlayerType,
} from "../types/game.types";
import Button from "./Button";
import Move from "./Move";

export default class Player implements PlayerInterface {
  game!: GameInterface;
  board!: CheckersBoard;
  loser: boolean;
  score: number;
  type: PlayerType;
  nr: number; //numberThatsInsertedIntoCheckersBoard i.e 0 for empty 1 for player1 etc.
  forcedTakes!: boolean;
  moveDirection: MoveDirection;
  availableMoves: any;
  move: any;
  constructor(
    game: GameInterface | null,
    nr: number,
    moveDirection: MoveDirection
  ) {
    if (game) {
      this.game = game;
      this.game.board.directionMap[nr] = moveDirection;
      this.board = game.board.board;
      this.forcedTakes = game.settings.game.forcedTakes;
    }
    this.loser = false;
    this.score = 0;
    this.type = "player";
    if (nr === 0) {
      throw Error(`Player nr cant equal empty square 0`);
    }
    this.nr = nr;
    const moveDirections = ["up", "down", "left", "right"]; //move direction for player(on screen)
    if (!moveDirections.includes(moveDirection))
      throw Error(
        `Invalid move direction '${moveDirection}'. 'movedirection should be one of ${moveDirections}`
      );
    this.moveDirection = moveDirection; //the direction the player should move
    this.availableMoves = {};
  }
  getButtonPositions() {
    let btns = [];
    const board = this.board;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (Math.abs(board[i][j]) === this.nr) {
          btns.push(new Button(this, i, j, board[i][j] < 0));
        }
      }
    }
    return btns;
  }
  beginTurn() {
    //Get the available moves
    const board = this.board;
    this.getMoves();
    if (Object.keys(this.availableMoves).length === 0) this.loser = true;
  }
  getMoves() {
    const playerButtons = this.getButtonPositions();

    this.availableMoves = {};
    let takes: any = {};
    let allMoves: any = {};
    playerButtons.forEach((button) => {
      let moves = button.getMoves();
      if (moves.length > 0) {
        const key = `${button.row}${button.col}`;
        allMoves[key] = moves;
        //@ts-ignore
        const btnTakes = moves.filter((move) => {
          return move.hasOwnProperty("take") && move["take"] !== undefined;
        });
        if (btnTakes.length > 0) {
          takes[key] = btnTakes;
        }
      }
    });
    if (this.forcedTakes) {
      if (Object.keys(takes).length > 0) {
        this.availableMoves = takes;
        return takes;
      }
    }
    this.availableMoves = allMoves;
    return allMoves;
  }
  endTurn() {}
  clearMove() {
    this.move = new Move();
  }
  setGame(game: GameInterface) {
    this.game = game;
    this.game.board.directionMap[this.nr] = this.moveDirection;
    this.board = game.board.board;
    this.forcedTakes = game.settings.game.forcedTakes;
  }
}
