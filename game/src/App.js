import "./App.css";
import React, { useRef, useEffect, useState } from "react";

function App() {
  // let board = new Array(8).fill(new Array(8).fill((0)))
  const [moveFrom, setMoveFrom] = useState([null, null]);
  const [moveTo, setMoveTo] = useState([null, null]);
  const [canMove, setCanMove] = useState(false);
  const [board, setBoard] = useState([
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],

    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],

    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
  ]);
  function buttonClick(e) {
    const r = e.target.attributes.row.value;
    const c = e.target.attributes.col.value;
    if (moveFrom[0] == null || moveFrom[1] == null) {
      setMoveFrom([r, c]);
    } else if (moveTo[0] == null || moveTo[1] == null) {
      setMoveTo([r, c]);
      setCanMove(true);
    } else if (moveFrom[0] != null && moveTo[0] != null) {
      setMoveFrom((null, null));
      setMoveTo((null, null));
      setCanMove(false);
    }
  }
  function makeMove() {
    
    /* is button on the square to move to?
    *
    */
    if (!board) return;
    if (!moveFrom[0] || !moveFrom[1]) return;
    if (!moveTo[0] || !moveTo[1]) return;
    if (moveFrom[0] == moveTo[0] && moveFrom[1] == moveTo[1]){
      setMoveTo([null, null]);
      return
    } 
    if(board[moveTo[0]][moveTo[1]] != 0){
      setMoveTo([null, null]);
      return
    }
    if (!isValidMove(board,moveFrom,moveTo)){
      console.log("not a valid move")
      setMoveTo([null, null]);
      return
    }else
      console.log("valid move")
    
    let h = board;
    h[moveTo[0]][moveTo[1]] = h[moveFrom[0]][moveFrom[1]];
    h[moveFrom[0]][moveFrom[1]] = 0;
    setBoard(h);
    setMoveFrom([null, null]);
    setMoveTo([null, null]);
  }
  useEffect(() => {
    makeMove();
  }, [board, moveTo, moveFrom]);

  return (
    <div class="game-container">
      <div className="row">
        {board[0].map((el, idx) => (
          <Square row={0} col={idx} btn={el} buttonClick={buttonClick} />
        ))}
      </div>
      <div className="row">
        {board[1].map((el, idx) => (
          <Square row={1} col={idx} btn={el} buttonClick={buttonClick} />
        ))}
      </div>
      <div className="row">
        {board[2].map((el, idx) => (
          <Square row={2} col={idx} btn={el} buttonClick={buttonClick} />
        ))}
      </div>
      <div className="row">
        {board[3].map((el, idx) => (
          <Square row={3} col={idx} btn={el} buttonClick={buttonClick} />
        ))}
      </div>
      <div className="row">
        {board[4].map((el, idx) => (
          <Square row={4} col={idx} btn={el} buttonClick={buttonClick} />
        ))}
      </div>
      <div className="row">
        {board[5].map((el, idx) => (
          <Square row={5} col={idx} btn={el} buttonClick={buttonClick} />
        ))}
      </div>
      <div className="row">
        {board[6].map((el, idx) => (
          <Square row={6} col={idx} btn={el} buttonClick={buttonClick} />
        ))}
      </div>
      <div className="row">
        {board[7].map((el, idx) => (
          <Square row={7} col={idx} btn={el} buttonClick={buttonClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
function isValidMove(board,moveFrom,moveTo) {
  let r1,r2,c1,c2;
  let moveDown,moveUp,moveLeft,moveRight,moveDownDiagonal,moveUpDiagonal
  r1 = parseInt(moveFrom[0])
  c1 = parseInt(moveFrom[1])
  r2 = parseInt(moveTo[0])
  c2 = parseInt(moveTo[1])
  moveUp =  r2 == (r1 -1)
  moveDown = r2 == ++r1
  moveLeft = c2 == (c1 - 1)
  moveRight = c2 == ++c1
  moveUpDiagonal =(moveUp && (moveLeft || moveRight))
  moveDownDiagonal = (moveDown && (moveLeft || moveRight))
  
  console.log(r1,c1,r2,c2)
  console.log(moveLeft,moveRight)
  
  if(moveUpDiagonal || moveDownDiagonal)
    return true;
  return false;  
}
function Square(props) {
  let button = "";
  if (props.btn === 2)
    button = (
      <Button
        player={2}
        onClick={props.buttonClick}
        row={props.row}
        col={props.col}
      />
    );
  else if (props.btn === 1)
    button = (
      <Button
        player={1}
        onClick={props.buttonClick}
        row={props.row}
        col={props.col}
      />
    );

  return (
    <div
      className="square"
      row={props.row}
      col={props.col}
      onClick={(e) => {
        props.buttonClick(e);
      }}
    >
      <div className="move-hint"></div>

      {button}
    </div>
  );
}
function Button(props) {
  return (
    <div
      className={`button player-${props.player}`}
      onClick={(e) => {
        props.onClick(e);
      }}
      row={props.row}
      col={props.col}
    ></div>
  );
}
