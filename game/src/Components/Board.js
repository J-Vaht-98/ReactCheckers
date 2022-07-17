import Square from "./Square";
import React, { useState, useRef, useEffect, createRef } from "react";
import "../styles/Board.css";
import GameInfo from "./GameInfo";

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
        const move = [
            parseInt(e.target.attributes.row.value),
            parseInt(e.target.attributes.col.value),
        ];

        setMoveFrom(game.current.moveFrom);
        game.current.setMove(move);
        setBoardState(game.current.board);
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
            {!isWinner && !isForfeit && !showForfeitConfirm && <button
                className='forfeit-btn'
                onClick={()=>{setShowForfeitConfirm(true)}
                }>
                Forfeit Game
            </button>}
            {showForfeitConfirm && !isWinner && 
             <div className="forfeit-modal">
                <button className='confirm-btn'onClick={()=> {game.current.forfeit(); setIsForfeit(true)}}>Confirm</button>
                <button className='cancel-btn'onClick={()=>{setIsForfeit(false); setShowForfeitConfirm(false)}}>Cancel</button>
             </div>
            }

        </div>
    );
}

export default Board;
