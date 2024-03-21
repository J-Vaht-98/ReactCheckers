import { FC } from "react";
import { useAppSelector } from "../store";
import "../styles/Board.css";
import Square from "./Square";

interface BoardProps {
  // game: GameInterface;
  // board: number[][];
  // dispatchClick: () => {};
  // move: any;
  // setMove: any;
}

const Board: FC<BoardProps> = () => {
  const board = useAppSelector((state) => {
    return state.game.board;
  });
  return (
    <div className="board">
      {board.map((row, i) => {
        return row.map((square, j) => {
          return <Square key={`${i}${j}`} row={i} col={j} />;
        });
      })}
    </div>
  );
};

export default Board;
