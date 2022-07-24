function Button({button,row,col,game,clickHandler}) {
    let buttonStyle ={}
    if(game.hasForcedMoves){
        game.forcedMoves.forEach(move=>{
            if(move.from[0] === row && move.from[1] === col){
               buttonStyle = {border: "2px solid pink"}
            }
        })
    }
    return ( <>
        {button === 1 && <div onClick={e => clickHandler(e)} key = {row + " " + col} row={row} col={col} style={buttonStyle} className='player-1 button ' />}
        {button === 2 && <div onClick={e => clickHandler(e)} key = {row + "+" + col} row={row} col={col} style={buttonStyle} className='player-2 button' />}
        {button === -1 && <div onClick={e => clickHandler(e)} key = {row + "+" + col} row={row} col={col} style={buttonStyle} className={'player-1 button king '}>👑</div>}
        {button === -2 && <div onClick={e => clickHandler(e)} key = {row + "+" + col} row={row} col={col}  style={buttonStyle} className={'player-2 button king '}>👑</div>}
    </> );
}

export default Button;