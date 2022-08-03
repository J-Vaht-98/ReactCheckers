import React, { useContext } from "react";
import Button from "./Button";
import GhostButton from "./GhostButton";
import { CustomColors } from "../Pages/Play/Play";
const checkIfHighlighted = (squares, row, col) => {
    for (const i in squares) {
        const square = squares[i].path[0];
        if (square[0] == row && square[1] == col) {
            return true;
        }
    }
    return false;
};
function Square({ row, col, game, handleClick, isRotated, dispatchClick }) {
    let isSelected =
        game.hasMoveFrom() &&
        game.moveFrom[0] == row &&
        col == game.moveFrom[1];

    let isHighlighted = checkIfHighlighted(game.possibleSquares, row, col);
    const button = game.board[row][col];
    let className = "square ";
    if (row === 0 && col === 0) className += " top-left-corner-square";
    if (row === 7 && col === 7) className += " bottom-right-corner-square";
    if (row === 0 && col === 7) className += " top-right-corner-square";
    if (row === 7 && col === 0) className += " bottom-left-corner-square";
    const colors = useContext(CustomColors)
    let squareColor = null;
    if (row % 2 === 0 && col % 2 === 0) {
        squareColor = colors.blackSquare
    }
    if (row % 2 === 1 && col % 2 === 1) {
        squareColor = colors.blackSquare
    }
    if(!squareColor) squareColor = colors.whiteSquare

    const squareHandleClick = (e) => {
        //Conditionally emit this event only if black square with no button and a moveable btn is selected
        if (
            game.moveFrom &&
            !button &&
            ((row % 2 === 0 && col % 2 === 0) ||
                (row % 2 === 1 && col % 2 === 1))
        ) {
            dispatchClick({
                type: "squareClicked",
                payload: {
                    row: row,
                    col: col,
                    type: "square",
                },
            });
        }
    };
    const buttonHandleClick = (e) => {
        //Trying to click ai buttons
        if(game.aiPlayerEnabled && Math.abs(button) === game.AIPlayer.myButton)
            return
        if (
            game.activePlayer === Math.abs(button) &&
            game.availableMoves[`${row}${col}`] !== undefined           
        )
            dispatchClick({
                type: "buttonClicked",
                payload: {
                    row: row,
                    col: col,
                },
            });
    };
    
    return (
        <div
            style={{
                background:squareColor
            }}
            onClick={(e) => squareHandleClick(e)}
            row={row}
            col={col}
            id={`${row}-${col}`}
            className={className}>
            {/* {row}-{col} */}
            <Button
                button={button}
                row={row}
                col={col}
                isSelected={isSelected}
                clickHandler={buttonHandleClick}
                game={game}
            />
            {isHighlighted && (
                <GhostButton
                    row={row}
                    col={col}
                    clickHandler={squareHandleClick}
                />
            )}
        </div>
    );
}

export default Square;
