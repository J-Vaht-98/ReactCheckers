import './App.css';


function App() {
  
  let tmp = 0
  let board = new Array(8).fill(new Array(8).fill((0)))
  return (<div class="game-container">
      {board.map((row,rowIndex) => row.map((sqr,colIndex) =>{
        return <Square row = {rowIndex} col = {colIndex} />
      })
      )}

  </div>
  );
}
function Square(props) {
  return ( 
  <div className = "square" row ={props.row} col = {props.col}>
    <div className = "move-hint"></div>
  </div>);
}


export default App;
