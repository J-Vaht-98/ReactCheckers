import { useContext } from "react";
import { GameSettings } from "../Pages/Play/Play";

const checkIfSelectable = (availableMoves, row, col) => {
    return availableMoves[`${row}${col}`] !== undefined
};
const checkIsSelected = (game, row, col) => {
    return game.selectedPiece === `${row}${col}`;
};
function Button({ button, row, col, game, clickHandler, isSelected }) {
    const btnColors = useContext(GameSettings).style.buttons.colors;
    if (button === 0) return <></>;

    const buttonColor = btnColors[Math.abs(button) - 1];
    let buttonStyle =
        Math.abs(button) === game.activePlayer
            ? { border: "2px solid green" }
            : {};
    let isSelectable = checkIfSelectable(game.availableMoves, row, col);
    isSelectable
        ? (buttonStyle = { border: "pink 2px solid" })
        : (buttonStyle = {});

    buttonStyle["background"] = buttonColor;
    if (checkIsSelected(game, row, col)) buttonStyle["background"] = "white";
    
    
    const classNames = {
        '-4': 'player-4 button king',
        '-3': 'player-3 button king',
        '-2': 'player-2 button king',
        '-1': 'player-1 button king',
        '1': 'player-1 button ',
        '2': 'player-2 button ',
        '3': 'player-3 button ',
        '3': 'player-4 button ',
    }
    const child = button < 0 ? `👑` : ''
    return (
                <div
                    onClick={(e) => {
                        if(isSelectable){
                            clickHandler(e) //so react updates
                        }
                            
                    }}
                    onDragStart={(e) => {
                        if(isSelectable){
                            e.dataTransfer.setData('text',e.target.id)
                            clickHandler(e)
                        }
                    }}
                    key={row + "+" + col}
                    row={row}
                    col={col}
                    style={buttonStyle}
                    className={'button'}
                    draggable={isSelectable}
                    
                    >
                    {child}
                </div>
    );
}

export default Button;
