import Game from "../../Game/Game";
import App from "../../App";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createContext, useState } from "react";
import Settings from "../Settings";

//Used if no settings are found in localstorage

export const GameSettings = createContext();
const fallBackSettings = {
    game:{
        playComputer: true,
    },
    style:{
        blackSquare: 'rgba(0,0,0,0.7)',
        whiteSquare: 'rgba(0,0,0,0)',
        buttons: {
            colors: [ 'rgba(0,0,0,1)','rgba(255,0,0,1)'],
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
    const defaultSettings = JSON.parse(window.localStorage.getItem('checkersTheme')) || fallBackSettings
    
    const [settings, setSettings] = useState(defaultSettings);
    const [gameStarted, setGameStarted] = useState(false);
    
    const handleNewGame = () =>{
        setGameStarted(true)
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
                        <App game={new Game(gameState, settings.game)} />
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
