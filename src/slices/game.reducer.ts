import { PayloadAction } from "@reduxjs/toolkit";
import { logic } from "../Game/logic2";
import { BoardPosition } from "../types/game.types";
import { GameState } from "./gameSlice";
import { positionsAreEqual } from "./utils";

const selectFromPos = (
  state: GameState,
  action: PayloadAction<BoardPosition>
) => {
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
};
const setSelectableButtons = (
  state: GameState,
  action: PayloadAction<BoardPosition>
) => {
  //check what player and what direction theyre moving etc.
  state.selectableButtons = logic.findSelectableButtons(
    state.board,
    state.players[state.activePlayerIndex]
  );
};

const selectToPosition = (
  state: GameState,
  action: PayloadAction<BoardPosition>
) => {
  const { row, col } = action.payload;
  if (!state.selectedButton) return;
  const move = state.possibleMovesFromPos?.find(
    (move) => move.to.row === row && move.to.col === col
  );
  if (move) {
    state.board = logic.makeMove(
      state.board,
      move,
      state.players[state.activePlayerIndex]
    );

    state.activePlayerIndex === 0
      ? (state.activePlayerIndex = 1)
      : (state.activePlayerIndex = 0);

    state.selectedButton = undefined;
    state.possibleMovesFromPos = undefined;
    state.selectableButtons = logic.findSelectableButtons(
      state.board,
      state.players[state.activePlayerIndex]
    );
  }
};

export default {
  selectFromPos,
  setSelectableButtons,
  selectToPosition,
};
