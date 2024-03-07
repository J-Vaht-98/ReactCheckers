export type RGBAString = `rgba(${number},${number},${number},${number})`;
function isRGBAString(value: string): value is RGBAString {
  // Regular expression to match rgba() format
  const rgbaRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(\.\d+)?)\)$/;

  if (!rgbaRegex.test(value)) {
    return false;
  }

  // Extract opacity value and check if it falls between 0 and 1
  const opacity = parseFloat(value.match(rgbaRegex)![4]);
  return opacity >= 0 && opacity <= 1;
}
export interface GameSettings {
  game: {
    playComputer: boolean;
    forcedTakes: boolean;
  };
  style: {
    blackSquare: RGBAString; //RGBA css rule
    whiteSquare: RGBAString;
    buttons: {
      colors: RGBAString[];
    };
  };
}
export interface GameInterface {
  settings: GameSettings;
  board: BoardInterface;
  players: PlayerInterface[];
  activePlayerIndex: number;
  activePlayer: PlayerInterface;
  winner: boolean | number;
}
export type CheckersBoard = number[][];
export interface BoardInterface {
  board: CheckersBoard;
  directionMap: any;
  makeMove: (selectedMove: any, activePlayer: PlayerInterface) => void;
}
export type PlayerType = "player" | "AI";
export type MoveDirection = "up" | "down" | "left" | "right";
export interface DirectionMap {}
export interface PlayerInterface {
  game: GameInterface;
  board: CheckersBoard;
  loser: boolean;
  score: number;
  type: PlayerType;
  nr: number; //numberThatsInsertedIntoCheckersBoard
  forcedTakes: boolean;
  moveDirection: MoveDirection;
  availableMoves: any;
  move: any;
  setGame: (game: GameInterface) => void;
  beginTurn: () => void;
  // this.game.board.directionMap[nr] = moveDirection
  // this.board = game.board.board
  // this.forcedTakes = game.settings.forcedTakes
  // this.score = 0
}
export interface AIMoveEngineInterface {
  difficulty: string;
  player: PlayerInterface;
  availableMoves: MoveInterface[];
}

//Logic
export interface AIPlayerInterface extends PlayerInterface {
  engine: AIMoveEngineInterface;
  selectPieceTimeout: number;
  selectSquareTimeout: number;
}
export type BoardDirection = 1 | -1;
//Moves

export interface MoveInterface {
  from: BoardPosition | undefined;
  to: BoardPosition | undefined;
  take: BoardPosition | undefined;
}

//Button
export interface ButtonInterface {
  row: number;
  col: number;
  direction: MoveDirection;
  isKing: boolean;
  board: CheckersBoard;
}
export type BoardPosition = { row: number; col: number };
