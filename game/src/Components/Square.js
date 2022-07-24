import React from 'react';
import Button from './Button';


function Square({row,col,gameRef,handleClick,isRotated}) {
    const game = gameRef.current
    let isSelected = game.hasMoveFrom() && game.moveFrom[0] === row && col == game.moveFrom[1];
    let isHighlighted = false;
    const button = gameRef.current.board[row][col]
    
    
    gameRef.current.availableMoves?.forEach(move => {
        if(move[0] === row && move[1] === col)
            isHighlighted = true;
    })
    let className = "square "
    
    if(row === 0 && col === 0)
        className += ' top-left-corner-square'
    if(row === 7 && col === 7)
        className += ' bottom-right-corner-square'
        
    isHighlighted ? className += "highlight" : className += ""
    isSelected ? className += ' selected':className += ''
    let buttonStyle = {}//game.activePlayer !== Math.abs(button) ? {opacity:"0.7"}: {}
    
    
    
    
    if(row % 2 === 0 && col % 2 === 0){
        className += " black"
    }
    if(row % 2 === 1 && col % 2 === 1){
        className += " black"
    }
    
    
    const squareHandleClick = (e) =>{
        //Conditionally emit this event only if black square with no button and a moveable btn is selected
        if(game.moveFrom && !button && ((row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1))){
            handleClick(e)
        }
    }
    const buttonHandleClick = e =>{
        if(game.activePlayer === Math.abs(button))
            handleClick(e)
    }
   
    return ( 
    <div onClick={e => squareHandleClick(e)} row = {row} col={col} id={`${row}-${col}`}  className={className}>
        {/* {row}-{col} */}
        {button !== 0 && <Button button={button} row={row} col={col} clickHandler={buttonHandleClick} game={game}/>}
    </div> 
    );
}

export default Square;