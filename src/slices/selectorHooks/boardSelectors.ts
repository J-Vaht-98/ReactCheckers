import { useAppSelector } from "../../store";
import { BoardPosition } from "../../types/game.types";
import { positionsAreEqual } from "../utils";

export const useIsHighlightedSquare = (pos: BoardPosition) =>
  useAppSelector(
    (state) =>
      state.game.possibleMovesFromPos &&
      state.game.possibleMovesFromPos.find((p) =>
        positionsAreEqual(pos, { row: p.to.row, col: p.to.col })
      )
  );

export const useIsSelectableButton = (pos: BoardPosition) =>
  useAppSelector(
    (state) =>
      state.game.selectableButtons &&
      state.game.selectableButtons.find((p) => positionsAreEqual(pos, p))
  );
