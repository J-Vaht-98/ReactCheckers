import { Box, Button, TextField, Typography } from "@mui/material";
import cloneDeep from "lodash/cloneDeep";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import App from "../../App";
import BackButton from "../../Components/UI-Components/BackButton";
import MultiPlayerGame from "../../Game/MultiplayerGame";
import { GameSettings } from "../Play/Play";
const url = "http://localhost:8080";
const socket = io(url, {
  path: "/play/",
  autoConnect: false,
});

function MultiPlayer() {
  const [gameID, setGameID] = useState("");
  const [playerID, setPlayerID] = useState(socket.id);
  const [gameState, setGameState] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [options, setOptions] = useState({
    nrOfPlayers: 2,
    forcedTakes: true,
  });
  const fallBackSettings = {
    game: {
      playComputer: true,
      forcedTakes: true,
    },
    style: {
      blackSquare: "rgba(0,0,0,0.7)",
      whiteSquare: "rgba(0,0,0,0)",
      buttons: {
        colors: [
          "rgba(0,0,0,1)",
          "rgba(255,0,0,1)",
          "rgba(0,255,0,1)",
          "rgba(0,0,255,1)",
        ],
      },
    },
  };
  function handleNewGame() {
    socket.emit("newGame", options);
  }
  function handleJoinGame() {
    if (gameID) socket.emit("joinGame", gameID, options);
  }
  function handleGameID(gameID) {
    setGameID(gameID);
  }

  function handleGameState(gameState) {
    console.log("Received gameSTate " + gameState);

    if (!gameStarted) {
      setGameStarted(true);
    }
    document.dispatchEvent(
      new CustomEvent("gameStateUpdate", {
        detail: {
          gameState: gameState,
        },
      })
    );
    setGameState(cloneDeep(gameState));
  }
  useEffect(() => {
    socket.connect();
    socket.on("gameID", (gameID) => handleGameID(gameID));
    socket.on("gameState", (gameState) => handleGameState(gameState));
    socket.on("error", (errorMsg) => console.log(errorMsg));
    return () => {
      socket.off("gameID");
      socket.off("gameState");
      socket.off("error");
    };
  });
  const emitGameState = (gameState) => {
    socket.emit("gameState", gameState);
  };
  const game = gameStarted
    ? new MultiPlayerGame(
        gameState,
        socket,
        { forcedTakes: true },
        emitGameState
      )
    : undefined;

  return (
    <GameSettings.Provider value={fallBackSettings}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          margin: "0 auto",
          mt: 12,
          height: "600px",
        }}
      >
        <Button
          onClick={() => {
            handleNewGame();
          }}
        >
          New game
        </Button>
        <Typography>{gameID}</Typography>
        <Button
          onClick={() => {
            handleJoinGame();
          }}
        >
          Join Game
        </Button>
        <TextField onChange={(e) => setGameID(e.target.value)} />
        {gameStarted && <App game={game} />}
        <BackButton />
      </Box>
    </GameSettings.Provider>
  );
}

export default MultiPlayer;
