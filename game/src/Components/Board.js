import Square from "./Square";
import React, { useState, useRef, useEffect, createRef } from "react";
import "../styles/Board.css";
import GameInfo from "./GameInfo";
import cloneDeep from 'lodash/cloneDeep'

function Board({ gameRef }) {
    const [moveFrom, setMoveFrom] = useState([]);
    const [isRotated, setIsRotated] = useState(false); //should make this a context
    const [isForfeit, setIsForfeit] = useState(false);
    const [showForfeitConfirm, setShowForfeitConfirm] = useState(false);
    const game = gameRef;
    const [boardState, setBoardState] = useState(gameRef.current.board);
    if (!gameRef) return <></>;
    if (game.current === undefined) return <></>;
    const handleClick = (e, type) => {
        const row = parseInt(e.target.attributes.row.value)
        const col = parseInt(e.target.attributes.col.value)

        game.current.setMove(row,col);
        if(game.current.hasMoveFrom())
            setMoveFrom(game.current.moveFrom)
        //need to use a deep clone for react to re-render
        //otherwise it makes a shallow copy and react doesnt detect the changes
        //https://stackoverflow.com/questions/48710797/how-do-i-deep-clone-an-object-in-react
        setBoardState(cloneDeep(game.current.board)) 
    };
    const rotation = isRotated ? " rotate-180" : " rotate-0";
    const rotationButtonClass = isRotated
        ? "rotation-button rotation-button-player-2"
        : "rotation-button  rotation-button-player-1";
    const isWinner = game.current.isWinner;
    let board = [];
    for (let r = 0; r < boardState.length; r++) {
        let row = [];
        for (let c = 0; c < boardState[r].length; c++) {
            row.push(
                <Square
                    key={`${r}-${c}`}
                    handleClick={handleClick}
                    row={r}
                    col={c}
                    gameRef={game}
                    isRotated={isRotated}
                />
            );
        }
        board.push(row);
    }
    return (
        <div className="game-container">
            <div id="board" className={rotation}>
                {board}
            </div>

            {!isWinner && <button
                className={rotationButtonClass}
                onClick={(e) =>
                    isRotated ? setIsRotated(false) : setIsRotated(true)
                }>
                Flip board
            </button>}
            <GameInfo gameRef={game} newGameHandler={()=>{game.current.init(); setIsForfeit(false); setShowForfeitConfirm(false); setBoardState(game.current.board)}}/>
           

        </div>
    );
}

export default Board;
