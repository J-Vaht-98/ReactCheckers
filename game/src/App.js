import './App.css';


function App() {
  
  // let board = new Array(8).fill(new Array(8).fill((0)))
  let board = [
    [2,0,2,0,2,0,2],
    [2,0,2,0,2,0,2],
    [2,0,2,0,2,0,2],
    
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    
    [1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1]
  ]
  
  
  console.log(board)
  return (<div class="game-container">
    <div class = "row">{board[0].map((el, idx)=> <Square row = {0} col = {idx} btn = {el} />)}</div>
    <div class = "row">{board[1].map((el, idx)=> <Square row = {1} col = {idx} btn = {el} />)}</div>
    <div class = "row">{board[2].map((el, idx)=> <Square row = {2} col = {idx} btn = {el} />)}</div>
    <div class = "row">{board[3].map((el, idx)=> <Square row = {3} col = {idx} btn = {el} />)}</div>
    <div class = "row">{board[4].map((el, idx)=> <Square row = {4} col = {idx} btn = {el} />)}</div>
    <div class = "row">{board[5].map((el, idx)=> <Square row = {5} col = {idx} btn = {el} />)}</div>
    <div class = "row">{board[6].map((el, idx)=> <Square row = {6} col = {idx} btn = {el} />)}</div>
    <div class = "row">{board[7].map((el, idx)=> <Square row = {7} col = {idx} btn = {el} />)}</div>
  </div>
  );
}
function Square(props) {
  let button = ""
  if (props.btn === 2)
    button = <div className = "button player-2"></div>
  else if(props.btn === 1)
    button = <div className = "button player-1"></div>
    
  return ( 
  <div className = "square" row ={props.row} col = {props.col}>
    <div className = "move-hint"></div>
    {button}
  </div>);
}


export default App;
