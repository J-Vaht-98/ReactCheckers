import Game from "../../Game/Game";
import App from "../../App";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createContext, useState } from "react";
import Settings from "../Settings";
import Player from "../../Game/Player";
import AIPlayer from "../../Game/AIplayer";
//Used if no settings are found in localstorage

export const GameSettings = createContext();
const fallBackSettings = {
    game:{
        playComputer: true,
        forcedTakes : true,
    },
    style:{
        blackSquare: 'rgba(0,0,0,0.7)',
        whiteSquare: 'rgba(0,0,0,0)',
        buttons: {
            colors: [ 'rgba(0,0,0,1)','rgba(255,0,0,1)','rgba(0,255,0,1)','rgba(0,0,255,1)'],
        },
    }
}
function PageContainer(props) {
    return (
        <Container sx={{
            minWidth:400,
        }} component="main" maxWidth="xs">
            <Box
                maxWidth="xs"
                sx={{
                    mt: 22,
                    gap: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                }}>
                {props.children}
            </Box>
        </Container>
    );
}

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
    const gameState2 = [
        //this just a dummy gamestate for debugging
        // [0,0,0,0,0,0,0,0],
        [2, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const defaultSettings = fallBackSettings
    
    const [settings, setSettings] = useState(defaultSettings);
    const [gameStarted, setGameStarted] = useState(false);
    
    const handleNewGame = () =>{
        setGameStarted(true)
    }
    const getPlayers = ()=>{
        console.log(settings)
        if(settings.game.playComputer===true)
            return [new Player(null,1,"up"),new AIPlayer(null,2,"down")]
        else
            return [new Player(null,1,"up"),new Player(null,2,"down")]
    }
    return (
        <>
            <GameSettings.Provider value={settings}>
                <CssBaseline />
                {gameStarted ? (
                    <Box
                        sx={{
                            boxSizing: "content-box", //prevent the board divs from overflowing borders
                            marginTop: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                        component="main"
                        maxWidth="s">
                        <App game={new Game(gameState,getPlayers(),settings.game)} />
                    </Box>
                ) : (
                    <PageContainer>
                        <Button
                            variant="contained"
                            sx={{
                                mt: 1,
                            }}
                            onClick={() => handleNewGame()}>
                            Play single player
                        </Button>
                        <Settings state={settings} defaultState={defaultSettings} setState={setSettings}/>
                    </PageContainer>
                )}
            </GameSettings.Provider>
        </>
    );
}

export default Play;
