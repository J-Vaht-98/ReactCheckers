import Board from './Components/Board'
import './App.css'
import {useEffect, useReducer, useState} from 'react'
import GameInfo from './Components/GameInfo'
import cloneDeep from 'lodash/cloneDeep'


export function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
  // An function that increment 👆🏻 the previous state like here 
  // is better than directly setting `value + 1`
}
const actionElementClicked = (game,payload) =>{
  if(payload.type === "square" && !game.hasMoveFrom()){
    return game
  }
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
const handleAIChoosingMove=(game,payload)=>{
  game.setMove(payload.row,payload.col)
  return cloneDeep(game)
}
const handleAIMove=(game,payload)=>{
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
    case 'aiChoosingMove':
      return handleAIChoosingMove(state,action.payload)
    case 'aiMadeMove':
      return handleAIMove(state,action.payload)
    case 'move':
      return cloneDeep(state)
    
    default:
      throw new Error("Reducer action type is not defined: " + action.type)
  }
    
}

function App({game}) {
  /**
   * 
   *  Gamestate: 
   *    0 - empty square
   *    1 - player 1 button
   *    2 - player 2 button 
   *   -1 - player 1 king
   *   -2 - player 2 king
   */

  const [state, dispatch] = useReducer(reducer,game) 
  const handleAIEvent = (e) =>{
    const type = e.detail.type
    const row = parseInt(e.detail.row)
    const col = parseInt(e.detail.col)
    dispatch({type:type,payload:{
      row:row,
      col:col
    }})
    }
    
  
  useEffect(()=>{
    document.addEventListener('aiMove',handleAIEvent)
    return ()=>{
      document.removeEventListener('aiMove',handleAIEvent)
    }
  },[])
  return (
    <>
      <Board game={state} dispatchClick={dispatch} />
      <GameInfo game={state} dispatch={dispatch}/>
    </>
  )
}

export default App;