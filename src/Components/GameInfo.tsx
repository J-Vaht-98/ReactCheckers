import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { GameSettings } from "../Pages/Play/Play";
import { GameInterface, RGBAString } from "../types/game.types";

function ScoreBar({ N, emoji = `✖` }: { N: number; emoji?: string }) {
  const getDots = (N: number) => {
    let str = "  ";
    for (let i = 0; i < N; i++) str += " " + emoji;
    return str;
  };
  const score = getDots(N);

  return <>{score}</>;
}
function PlayerScore({
  playerScore,
  playerName,
  color,
}: {
  playerScore: number;
  playerName: string;
  color: RGBAString;
}) {
  return (
    <>
      <Typography
        sx={{
          m: 1,
        }}
      >
        {playerName}
      </Typography>
      <Typography sx={{ color: color }}>
        <ScoreBar N={playerScore} />
      </Typography>
    </>
  );
}
function WinBanner({ winner }: { winner: string }) {
  return (
    <>
      <Typography
        sx={{
          m: 1,
        }}
        component="h1"
      >
        {winner} wins!
      </Typography>
      <Button
        sx={{
          mt: 1,
        }}
        variant="contained"
        color="primary"
        //@ts-ignore
        onClick={() => (window.location = "/")}
      >
        New game
      </Button>
    </>
  );
}

function GameInfo({
  game,
  dispatch,
}: {
  game: GameInterface;
  dispatch: Function;
}) {
  const colors = useContext(GameSettings)?.style.buttons.colors;
  if (!game) return <></>;
  const playerNames = ["Player 1", "Player 2"];
  const playerScores = game.players.map((player) => player.score);

  return (
    <Box
      sx={{
        display: "grid",
        width: "90%",
        maxWidth: "640px",
        gridAutoFlow: "row",
      }}
    >
      {!game.winner && (
        <>
          {playerNames.map((name, i) => (
            <PlayerScore
              key={`plr-score-${i}`}
              color={colors[i]}
              playerName={name}
              playerScore={playerScores[i]}
            />
          ))}
        </>
      )}
      {game.winner && <WinBanner winner={""} />}
    </Box>
  );
}

export default GameInfo;
