import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { defaultBoard } from "../Constants";
import { Move, logic } from "../Game/logic2";
import { BoardPosition, CheckersBoard } from "../types/game.types";
import { positionsAreEqual } from "./utils";
export interface IPlayer {
  pieceNr: number;
  moveDirection: "up" | "down";
}
interface GameState {
  board: CheckersBoard;
  selectedButton?: BoardPosition;
  selectableButtons: BoardPosition[];
  possibleMovesFromPos?: Move[];
  players: IPlayer[];
  activePlayerIndex: number;
}

const initialState: GameState = {
  board: defaultBoard,
  players: [
    { pieceNr: 1, moveDirection: "up" },
    { pieceNr: 2, moveDirection: "down" },
  ],
  activePlayerIndex: 0,
  selectableButtons: logic.findSelectableButtons(defaultBoard, {
    pieceNr: 1,
    moveDirection: "up",
  }),
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectFromPos: (state, action: PayloadAction<BoardPosition>) => {
      if (
        state.selectedButton &&
        positionsAreEqual(state.selectedButton, action.payload)
      ) {
        state.selectedButton = undefined; //if user clicks on other button or same button it should toggle off.
        state.possibleMovesFromPos = undefined;
      } else {
        state.selectedButton = action.payload;
        // Calculate possible moves from this position.
        state.possibleMovesFromPos = logic.calculateMovesFromPos(
          state.board,
          action.payload,
          state.players[state.activePlayerIndex]
        );
      }
    },
    setSelectableButtons: (state, action: PayloadAction<BoardPosition>) => {
      //check what player and what direction theyre moving etc.
      state.selectableButtons = logic.findSelectableButtons(
        state.board,
        state.players[state.activePlayerIndex]
      );
    },
  },
});
export const { setSelectableButtons, selectFromPos } = gameSlice.actions;
export default gameSlice.reducer;
