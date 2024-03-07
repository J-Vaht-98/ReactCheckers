import { useContext } from "react";
import { GameSettings } from "../Pages/Play/Play";
import { selectFromPos } from "../slices/gameSlice";
import { useAppDispatch, useAppSelector } from "../store";

function Button({ row, col }) {
  const button = useAppSelector((state) => {
    return state.game.board[row][col];
  });
  const btnColors = useContext(GameSettings).style.buttons.colors;
  const isSelectable = useAppSelector((state) => {
    return !!state.game.selectableButtons.find(
      (btn) => btn.row === row && btn.col === col
    );
  });

  const buttonColor = btnColors[Math.abs(button) - 1];
  let buttonStyle = {};
  isSelectable
    ? (buttonStyle = { border: "pink 2px solid" })
    : (buttonStyle = {});

  buttonStyle["background"] = buttonColor;

  const dispatch = useAppDispatch();
  const a = useAppSelector(
    (state) =>
      state.game.selectedButton?.row === row &&
      state.game.selectedButton?.col === col
  );
  if (a) buttonStyle["background"] = "white";
  const classNames = {
    "-4": "player-4 button king",
    "-3": "player-3 button king",
    "-2": "player-2 button king",
    "-1": "player-1 button king",
    1: "player-1 button ",
    2: "player-2 button ",
    3: "player-3 button ",
    3: "player-4 button ",
  };
  const child = button < 0 ? `👑` : "";

  if (button === 0) return <></>;
  return (
    <div
      onClick={(e) => {
        if (isSelectable) {
          dispatch(selectFromPos({ row, col }));
          // clickHandler(e); //so react updates
        }
      }}
      // onDragStart={(e) => {
      //   if (isSelectable) {
      //     e.dataTransfer.setData("text", e.target.id);
      //     clickHandler(e);
      //   }
      // }}
      key={row + "+" + col}
      row={row}
      col={col}
      style={buttonStyle}
      className={"button"}
      draggable={isSelectable}
    >
      {child}
    </div>
  );
}

export default Button;
