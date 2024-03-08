import { FC } from "react";
import { RootState, useAppSelector } from "../store";
import Board from "./Board";

interface GameComponentProps {}

const GameComponent: FC<GameComponentProps> = ({}) => {
  const activePlayer = useAppSelector((state: RootState) => {
    return state.game.players[state.game.activePlayerIndex];
  });
  return (
    <div style={{ display: "flex", margin: "40px" }}>
      <Board />
      <h4>Active: {activePlayer.pieceNr}</h4>
    </div>
  );
};

export default GameComponent;
