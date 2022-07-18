import Board from './Components/Board'
import './App.css'
import {useRef, useState} from 'react'
import Game from './Game/Game'
function App() {
  const [newGame, setNewGame] = useState(false);
  /**
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
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],

  ]
  const game = useRef(new Game(gameState));
  return ( <>
      <Board gameRef={game} newGame={newGame}/>
      
    </>
  );
}

export default App;