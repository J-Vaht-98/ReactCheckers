import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { GameSettings } from "../Pages/Play/Play";

function ScoreBar({ N, emoji = `✖` }) {
    const getDots = (N) => {
        let str = "  ";
        for (let i = 0; i < N; i++) str += " " + emoji;
        return str;
    };
    const score = getDots(N);

    return <>{score}</>;
}
function PlayerScore({ playerScore, playerName,color }) {
    return (
        <>
            <Typography
             sx={{
                m:1,
            }}
             >
                {playerName}
            </Typography>
            <Typography sx={{color:color}}><ScoreBar N={playerScore} /></Typography>
        </>
    );
}
function WinBanner({ winner }) {
    return (
        <>
            <Typography
            sx={{
                m:1
            }}
            component="h1">{winner} wins!</Typography>
            <Button 
            sx={{
                mt:1
            }}
            variant="contained"
            color="primary"
            
            onClick={()=>window.location = '/play'
            }>New game</Button>
        </>
    );
}

function GameInfo({ game, dispatch }) {
    const colors = useContext(GameSettings)?.style.buttons.colors;
    if (!game) return <></>;
    const playerNames = game.nicknames || ["Player 1", "Player 2"];
    const playerScores = game.players.map((player)=>player.score)
    
    return (
        <Box
            sx={{
                display: "grid",
                width: "90%",
                maxWidth: "640px",
                gridAutoFlow: "row",
            }}>
            {!game.isWinner && (
                <>
                {playerNames.map((name,i) => 
                <PlayerScore key={`plr-score-${i}`} color={colors[i]} playerName={name} playerScore={playerScores[i]}/>)}
                </>
            )}
            {game.winner && (
                <WinBanner winner={playerNames[game.winner - 1]} />
            )}
        </Box>
    );
}

export default GameInfo;
