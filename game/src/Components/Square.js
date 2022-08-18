import React, { useContext } from "react";
import Button from "./Button";
import GhostButton from "./GhostButton";
import { GameSettings } from "../Pages/Play/Play";
const checkIfHighlighted = (game,row,col)=>{
    const possibleMoves = game.selectedPieceMoves
    if(!possibleMoves) return false
    for(let i=0;i<possibleMoves.length;i++){
        const move = possibleMoves[i].to
        if(move.row === row && move.col === col)
            return true
    }
   return false
}
const fallBackColor = "rgba(0,0,0,0.7)" //if no square colors are specified
function Square({ row, col, game, dispatchClick}) {
    let isHighlighted = checkIfHighlighted(game, row, col);
    const button = game.board.board[row][col];
    let className = "square ";
    const N = game.board.dimension - 1
    if (row === 0 && col === 0) className += " top-left-corner-square";
    if (row === N && col === N) className += " bottom-right-corner-square";
    if (row === 0 && col === N) className += " top-right-corner-square";
    if (row === N && col === 0) className += " bottom-left-corner-square";
    const colors = useContext(GameSettings).style
    let squareColor = null;
    let isBlack = false
    if (row % 2 === 0 && col % 2 === 0) {
        isBlack = true
        squareColor = colors.blackSquare || fallBackColor
    }
    if (row % 2 === 1 && col % 2 === 1) {
        isBlack = true
        squareColor = colors.blackSquare || fallBackColor
    }
    if(!squareColor) squareColor = colors.whiteSquare || "none"

    const squareHandleClick = (e) => {
        // Conditionally emit this event only if black square with no button and a moveable btn is selected
        e.preventDefault()
        //Cant click if its not a real players turn (not AI or Remote)
        if(game.activePlayer.type !== "player")
            return
        if(isBlack && button === 0){
            const ev = new CustomEvent('squareSelected',{detail:{
                pos:[row,col]
            }})
            document.dispatchEvent(ev)
        }
    };
    const buttonHandleClick = (e) => {
        //Cant click if its not a real players turn (not AI or Remote)
        if(game.activePlayer.type !== "player")
            return
        const ev = new CustomEvent('pieceSelected',{detail:{
            pos:[row,col]
        }})
        document.dispatchEvent(ev)
    };
    let style = {
        background:squareColor,
    }
    return (
        <div
            onDrop={squareHandleClick}
            onDragOver={(e)=>{
                if(isHighlighted){
                    e.preventDefault()
                }
            }}
            onDragLeave={(e)=>{
                if(isHighlighted){
                    e.preventDefault()
                }
            }}
            style={style}
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
