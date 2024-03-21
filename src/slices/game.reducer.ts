import { PayloadAction } from "@reduxjs/toolkit";
import { logic } from "../Game/logic2";
import { BoardPosition, GameVariant } from "../types/game.types";
import { GameState } from "./gameSlice";
import { positionsAreEqual } from "./utils";
const startGame = (state: GameState, action: PayloadAction<GameVariant>) => {
  state.started = true;
  state.variant = action.payload;
};
const selectFromPos = (
  state: GameState,
  action: PayloadAction<BoardPosition>
) => {
  if (
    state.selectedButton &&
    positionsAreEqual(state.selectedButton, action.payload)
  ) {
    state.selectedButton = null; //if user clicks on other button or same button it should toggle off.
    state.possibleMovesFromPos = null;
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
    const board = state.board;
    const activePlayer = state.players[state.activePlayerIndex];
    let tmp = board[move.from.row][move.from.col];
    //Check if king
    if (activePlayer.moveDirection === "up" && move.to.row <= 0 && tmp > 0) {
      tmp *= -1;
    } else if (
      tmp > 0 &&
      activePlayer.moveDirection === "down" &&
      move.to.row >= board.length - 1
    ) {
      tmp *= -1;
    }
    board[move.from.row][move.from.col] = 0;
    board[move.to.row][move.to.col] = tmp;

    if (move.take) {
      board[move.take.row][move.take.col] = 0;
      activePlayer.score++;
    }

    state.activePlayerIndex === 0
      ? (state.activePlayerIndex = 1)
      : (state.activePlayerIndex = 0);

    state.selectedButton = null;
    state.possibleMovesFromPos = null;
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
  startGame,
};
