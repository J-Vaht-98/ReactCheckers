import Square from "./Square";
import React, { useState, useRef, useEffect, createRef } from "react";
import "../styles/Board.css";
import Game from "../Game/Game";
import GameInfo from './GameInfo'

function Board({ gameState }) {
    const [moveFrom, setMoveFrom] = useState([]);
    const [activePlayer, setActivePlayer] = useState(1);
    const game = useRef(new Game(gameState));
    const [boardState, setBoardState] = useState(gameState);
    if (!gameState || gameState.length === 0) return <></>;
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
                />
            );
        }
        board.push(row);
    }
    return (
        <div className="game-container">
            <div id="board">{board}</div>
            <GameInfo gameRef={game} />
        </div>
    );
}

export default Board;
