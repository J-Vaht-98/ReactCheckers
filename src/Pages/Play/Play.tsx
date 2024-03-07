import CssBaseline from "@mui/material/CssBaseline";
import { createContext, useState } from "react";
import StyledButton from "../../Components/UI-Components/StyledButton";
import { defaultSettings } from "../../Constants";
import AIPlayer from "../../Game/AIplayer";
import Player from "../../Game/Player";
import PageContainer from "../PageContainer";
import Settings, {
  getGameSettingsFromLocalStorage,
} from "../Settings/Settings";

export const GameSettings = createContext(defaultSettings);

function Play() {
  const gameState = [
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
  ];

  const [gameStarted, setGameStarted] = useState(false);
  const settings = getGameSettingsFromLocalStorage() ?? defaultSettings;
  const handleNewGame = () => {
    setGameStarted(true);
  };
  const getPlayers = () => {
    if (settings.game.playComputer === true)
      return [new Player(null, 1, "up"), new AIPlayer(null, 2, "down")];
    else return [new Player(null, 1, "up"), new Player(null, 2, "down")];
  };
  return (
    <>
      <GameSettings.Provider value={settings}>
        <CssBaseline />
        <PageContainer>
          <StyledButton onClick={() => handleNewGame()}>
            Play single player
          </StyledButton>
          <Settings />
        </PageContainer>
      </GameSettings.Provider>
    </>
  );
}

export default Play;
