import { useContext } from "react";
import { GameSettings } from "../Pages/Play/Play";
import { useIsHighlightedSquare } from "../slices/selectorHooks/boardSelectors";
import { useAppSelector } from "../store";
import { BoardPosition } from "../types/game.types";
import Button from "./Button";
import GhostButton from "./GhostButton";
const fallBackColor = "rgba(0,0,0,0.7)"; //if no square colors are specified
function Square({ row, col }: BoardPosition) {
  // let isHighlighted = checkIfHighlighted(game, row, col);
  // const board = useAppSelector((state) => {});
  const board = useAppSelector((state) => {
    return state.game.board;
  });
  const isHighlighted = useIsHighlightedSquare({ row, col });
  // const button = game.board.board[row][col];
  let className = "square ";
  const N = board.length - 1;
  if (row === 0 && col === 0) className += " top-left-corner-square";
  if (row === N && col === N) className += " bottom-right-corner-square";
  if (row === 0 && col === N) className += " top-right-corner-square";
  if (row === N && col === 0) className += " bottom-left-corner-square";
  const colors = useContext(GameSettings).style;
  let squareColor = null;
  let isBlack = false;
  if (row % 2 === 0 && col % 2 === 0) {
    isBlack = true;
    squareColor = colors.blackSquare || fallBackColor;
  }
  if (row % 2 === 1 && col % 2 === 1) {
    isBlack = true;
    squareColor = colors.blackSquare || fallBackColor;
  }
  if (!squareColor) squareColor = colors.whiteSquare || "none";

  // const squareHandleClick = (e) => {
  //   // Conditionally emit this event only if black square with no button and a moveable btn is selected
  //   e.preventDefault();
  //   //Cant click if its not a real players turn (not AI or Remote)
  //   if (game.activePlayer.type !== "player") return;
  //   if (isBlack && button === 0) {
  //     const ev = new CustomEvent("squareSelected", {
  //       detail: {
  //         pos: [row, col],
  //       },
  //     });
  //     document.dispatchEvent(ev);
  //   }
  // };
  // const buttonHandleClick = (e) => {
  //   //Cant click if its not a real players turn (not AI or Remote)
  //   if (game.activePlayer.type !== "player") return;
  //   const ev = new CustomEvent("pieceSelected", {
  //     detail: {
  //       pos: [row, col],
  //     },
  //   });
  //   document.dispatchEvent(ev);
  // };
  let style = {
    background: squareColor,
  };
  return (
    <div
      // onDrop={squareHandleClick}
      onDragOver={(e) => {
        if (isHighlighted) {
          e.preventDefault();
        }
      }}
      onDragLeave={(e) => {
        if (isHighlighted) {
          e.preventDefault();
        }
      }}
      style={style}
      // onClick={(e) => squareHandleClick(e)}
      className={className}
    >
      {/* {row}-{col} */}
      <Button row={row} col={col} />
      {isHighlighted && <GhostButton row={row} col={col} />}
    </div>
  );
}

export default Square;
