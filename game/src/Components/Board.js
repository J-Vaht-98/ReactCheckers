import Square from "./Square";
import "../styles/Board.css";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useState } from "react";

function Board({ game, dispatchClick }) {
    const [board, setBoard] = useState(game.board)

    if (game === undefined) return <></>;
    return (
            <div className="board">
                {board.map((row, i) => {
                    return row.map((square, j) => {
                        return (
                            <Square
                                key={`${i}${j}`}
                                row={i}
                                col={j}
                                game={game}
                                dispatchClick={dispatchClick}
                            />
                        );
                    });
                })}
            </div>
    );
}

export default Board;
