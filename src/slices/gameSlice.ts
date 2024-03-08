import { createSlice } from "@reduxjs/toolkit";
import { defaultBoard } from "../Constants";
import { Move, logic } from "../Game/logic2";
import { BoardPosition, CheckersBoard } from "../types/game.types";
import gameReducer from "./game.reducer";
export interface IPlayer {
  pieceNr: number;
  moveDirection: "up" | "down";
}
export interface GameState {
  board: CheckersBoard;
  selectedButton?: BoardPosition;
  selectableButtons: BoardPosition[];
  possibleMovesFromPos?: Move[];
  players: IPlayer[];
  activePlayerIndex: number;
}
const defaultPlayers: IPlayer[] = [
  { pieceNr: 1, moveDirection: "up" },
  { pieceNr: 2, moveDirection: "down" },
];
const initialState: GameState = {
  board: defaultBoard,
  players: defaultPlayers,
  activePlayerIndex: 0,
  selectableButtons: logic.findSelectableButtons(defaultBoard, {
    pieceNr: 1,
    moveDirection: "up",
  }),
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: gameReducer,
});
export const gameActions = gameSlice.actions;
export default gameSlice.reducer;
