import React from "react";
import Button from "./Button";
import GhostButton from "./GhostButton";

function Square({ row, col, game, handleClick, isRotated, dispatchClick }) {
    let isSelected =
        game.hasMoveFrom() &&
        game.moveFrom[0] == row &&
        col == game.moveFrom[1];
    const checkIfHighlighted = (squares, row, col) => {
        for (const i in squares) {
            const square = squares[i].path[0];
            if (square[0] == row && square[1] == col) {
                return true;
            }
        }
        return false;
    };
    let isHighlighted = checkIfHighlighted(game.possibleSquares, row, col);
    const button = game.board[row][col];
    let className = "square ";
    if (row === 0 && col === 0) className += " top-left-corner-square";
    if (row === 7 && col === 7) className += " bottom-right-corner-square";
    // isHighlighted ? className += "highlight" : className += ""
    // isSelected ? className += ' selected':className += ''
    let buttonStyle = {}; //game.activePlayer !== Math.abs(button) ? {opacity:"0.7"}: {}
    if (row % 2 === 0 && col % 2 === 0) {
        className += " black";
    }
    if (row % 2 === 1 && col % 2 === 1) {
        className += " black";
    }

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
        if (game.activePlayer === Math.abs(button))
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
            onClick={(e) => squareHandleClick(e)}
            row={row}
            col={col}
            id={`${row}-${col}`}
            className={className}>
            {row}-{col}
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
