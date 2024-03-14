import { createSlice } from "@reduxjs/toolkit";
import { defaultBoard } from "../Constants";
import { Move, logic } from "../Game/logic2";
import { BoardPosition, CheckersBoard } from "../types/game.types";
import gameReducer from "./game.reducer";
export interface IPlayer {
  pieceNr: number;
  moveDirection: "up" | "down";
  score: number;
}
export interface GameState {
  board: CheckersBoard;
  selectedButton: BoardPosition | null;
  selectableButtons: BoardPosition[] | null;
  possibleMovesFromPos: Move[] | null;
  players: IPlayer[];
  activePlayerIndex: number;
}
const defaultPlayers: IPlayer[] = [
  { pieceNr: 1, moveDirection: "up", score: 0 },
  { pieceNr: 2, moveDirection: "down", score: 0 },
];
const initialState: GameState = {
  board: defaultBoard,
  players: defaultPlayers,
  selectedButton: null,
  possibleMovesFromPos: null,
  activePlayerIndex: 0,
  selectableButtons: logic.findSelectableButtons(defaultBoard, {
    pieceNr: 1,
    moveDirection: "up",
    score: 0,
  }),
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: gameReducer,
});
export const gameActions = gameSlice.actions;
export default gameSlice.reducer;
