import { useContext } from "react"
import { GameSettings } from "../Pages/Play/Play"

const checkIfButtonAvailable = (moves,row,col) =>{
    return moves[`${row}${col}`] !== undefined
}
const checkIsSelected = (game, row,col)=>{
    return game.moveFrom == `${row}${col}`
}
function Button({button,row,col,game,clickHandler}) {
    const btnColors = useContext(GameSettings).style.buttons.colors
    if(button === 0) return <></>
    
    const buttonColor = btnColors[Math.abs(button) - 1]
    let buttonStyle = Math.abs(button) === game.activePlayer ? {border: "2px solid green"} : {}
    let isAvailable = checkIfButtonAvailable(game.availableMoves,row,col)
    isAvailable ? buttonStyle = {border:"pink 2px solid"} :buttonStyle = {}
    
    buttonStyle['background'] = buttonColor
    if(checkIsSelected(game,row,col)) buttonStyle['background'] = 'white'
    
    
    return ( <>
        {button === 1 && <div onClick={e => clickHandler(e)} key = {row + " " + col} row={row} col={col} style={buttonStyle} className='player-1 button ' />}
        {button === 2 && <div onClick={e => clickHandler(e)} key = {row + "+" + col} row={row} col={col} style={buttonStyle} className='player-2 button ' />}
        {button === -1 && <div onClick={e => clickHandler(e)} key = {row + "+" + col} row={row} col={col} style={buttonStyle} className={'player-1 button king '}>👑</div>}
        {button === -2 && <div onClick={e => clickHandler(e)} key = {row + "+" + col} row={row} col={col}  style={buttonStyle} className={'player-2 button king '}>👑</div>}
    </> );
}

export default Button;