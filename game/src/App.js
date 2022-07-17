import Board from './Components/Board'
import './App.css'
import {useRef,useContext, createContext, useState} from 'react'
import Game from './Game/Game'
import GameInfo from './Components/GameInfo'
function App() {
  const [newGame, setNewGame] = useState(false);
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
  const gameState2 = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,-1,0,0,0,0,0],
    [0,0,0,-2,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,1,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],

  ]
  const game = useRef(new Game(gameState));
  const handleNewGame = ()=>{
      game.current.init()
      newGame ? setNewGame(false):setNewGame(true)
  }
  return ( <>
      <Board gameRef={game} newGame={newGame}/>
      
    </>
  );
}

export default App;