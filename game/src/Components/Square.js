import React from 'react';


function Square({row,col,gameRef,handleClick,isRotated}) {
    const game = gameRef.current
    let isSelected = row == game.moveFrom[0] && col == game.moveFrom[1];
    let isHighlighted = false;
    
    gameRef.current.availableMoves.forEach(move => {
        if(move[0] === row && move[1] === col)
            isHighlighted = true;
    })
    const button = gameRef.current.board[row][col]
    let className = "square "
    
    if(row === 0 && col === 0)
        className += ' top-left-corner-square'
    if(row === 7 && col === 7)
        className += ' bottom-right-corner-square'
        
    isHighlighted ? className += "highlight" : className += ""
    isSelected ? className += ' selected':className += ''
    
    if(row % 2 === 0 && col % 2 === 0){
        className += " black"
        button ? className += " has-button-on-it": className += " is-moveable"
    }
    if(row % 2 === 1 && col % 2 === 1){
        className += " black"
        button ? className += " has-button-on-it": className += " is-moveable"
    }
    
    
    const squareHandleClick = (e) =>{
        //Conditionally emit this event only if black square with no button
        if(!button && ((row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1)))
            {
                handleClick(e,"square")
            }
    }
    const buttonHandleClick = e =>{
        if(game.activePlayer === Math.abs(button))
            handleClick(e,"button")
    }
   
    return ( 
    <div onClick={squareHandleClick} row = {row} col={col} id={`${row}-${col}`}  className={className}>
        {/* {row}-{col} */}
        {button === 1 && <div onClick={e => buttonHandleClick(e)} key = {row + " " + col} row={row} col={col} className='player-1 button' />}
        {button === 2 && <div onClick={e => buttonHandleClick(e)} key = {row + "+" + col} row={row} col={col} className='player-2 button' />}
        {button === -1 && <div onClick={e => buttonHandleClick(e)} key = {row + "+" + col} row={row} col={col} className={'player-1 button king '}>👑</div>}
        {button === -2 && <div onClick={e => buttonHandleClick(e)} key = {row + "+" + col} row={row} col={col} className={'player-2 button king '}>👑</div>}
    </div> 
    );
}

export default Square;