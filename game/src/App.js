import Board from './Components/Board'
import './App.css'
import {useEffect, useReducer, useRef, useState} from 'react'
import Game from './Game/Game'
import GameInfo from './Components/GameInfo'
import cloneDeep from 'lodash/cloneDeep'


export function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
  // An function that increment 👆🏻 the previous state like here 
  // is better than directly setting `value + 1`
}
const actionElementClicked = (game,payload) =>{
  const row = payload?.row
  const col = payload?.col
  game.setMove(row,col)
  return cloneDeep(game)
}
const makeNewGame = (game) =>{
  game.init()
  return cloneDeep(game)
}
const handleUndo = (game) =>{
  game.undo();
  return cloneDeep(game)
}
const handleRedo = (game) =>{
  game.redo();
  return cloneDeep(game)
}
function reducer(state, action){
  switch(action.type){
    case 'buttonClicked':
      return actionElementClicked(state,action.payload)
    case 'squareClicked':
      return actionElementClicked(state,action.payload)
    case 'newGame':
      return makeNewGame(state)
    case 'undo':
      return handleUndo(state) //not properly implemented
    case 'redo':
      return handleRedo(state) 
    
    default:
      throw new Error("Reducer action type is not defined")
  }
    
}
function App() {
  /**
   * 
   *  Gamestate: 
   *    0 - empty square
   *    1 - player 1 button
   *    2 - player 2 button 
   *   -1 - player 1 king
   *   -2 - player 2 king
   */
  const gameState = [
    [2,0,2,0,2,0,2,0],
    [0,2,0,2,0,2,0,2],
    [2,0,2,0,2,0,2,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
  ]
  const gameState2 = [ //this just a dummy gamestate for debugging
    // [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,2,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,2,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
  ]
  const g = new Game(gameState)
  const [game, dispatch] = useReducer(reducer,g) 
  return (
    <>
      <Board game={game} dispatchClick={dispatch} />
      <GameInfo game={game} dispatch={dispatch}/>
      <h1>{game.moveNr}</h1>
    </>
  )
}

export default App;