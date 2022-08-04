import { useContext } from "react";
import { GameSettings } from "../Pages/Play/Play";

const checkIfButtonAvailable = (moves, row, col) => {
    return moves[`${row}${col}`] !== undefined;
};
const checkIsSelected = (game, row, col) => {
    return game.moveFrom == `${row}${col}`;
};
function Button({ button, row, col, game, clickHandler }) {
    const btnColors = useContext(GameSettings).style.buttons.colors;
    if (button === 0) return <></>;

    const buttonColor = btnColors[Math.abs(button) - 1];
    let buttonStyle =
        Math.abs(button) === game.activePlayer
            ? { border: "2px solid green" }
            : {};
    let isAvailable = checkIfButtonAvailable(game.availableMoves, row, col);
    isAvailable
        ? (buttonStyle = { border: "pink 2px solid" })
        : (buttonStyle = {});

    buttonStyle["background"] = buttonColor;
    if (checkIsSelected(game, row, col)) buttonStyle["background"] = "white";
    
    
    const classNames = {
        '-2': 'player-2 button king',
        '-1': 'player-1 button king',
        '1': 'player-1 button ',
        '2': 'player-2 button ',
    }
    const child = button < 0 ? `👑` : ''
    return (
                <div
                    onClick={(e) => clickHandler(e)}
                    onDragStart={(e) => {
                        e.dataTransfer.setData('text',e.target.id)
                        clickHandler(e)
                    }}
                    key={row + "+" + col}
                    row={row}
                    col={col}
                    style={buttonStyle}
                    className={classNames[button]}
                    draggable
                    
                    >
                    {child}
                </div>
    );
}

export default Button;
