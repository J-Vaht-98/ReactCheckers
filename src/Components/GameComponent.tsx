import { FC } from "react";
import { RootState, useAppSelector } from "../store";
import Board from "./Board";

interface GameComponentProps {}

const GameComponent: FC<GameComponentProps> = ({}) => {
  const activePlayer = useAppSelector((state: RootState) => {
    return state.game.players[state.game.activePlayerIndex];
  });
  const players = useAppSelector((state: RootState) => state.game.players);
  return (
    <div style={{ display: "flex", margin: "40px" }}>
      <Board />
      <div>
        {players.map((player) => (
          <div>
            <h3>Piece: {player.pieceNr}</h3>
            <span>Score: {player.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameComponent;
