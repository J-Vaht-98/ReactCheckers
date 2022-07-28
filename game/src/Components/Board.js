import Square from "./Square";
import "../styles/Board.css";

function Board({ game, dispatchClick }) {
    const board = game.board;
    if (game === undefined) return <></>;
    return (
        <div className="game-container">
            <div id="board">
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
        </div>
    );
}

export default Board;
