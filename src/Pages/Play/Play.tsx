import { createContext } from "react";
import GameComponent from "../../Components/GameComponent";
import { defaultSettings } from "../../Constants";
import { RootState, useAppSelector } from "../../store";
import StartMenu from "./StartMenu";
export const GameSettings = createContext(defaultSettings);

function Play() {
  const gameStarted = useAppSelector((state: RootState) => {
    return state.game.started;
  });
  return gameStarted ? <GameComponent /> : <StartMenu />;
}

export default Play;
