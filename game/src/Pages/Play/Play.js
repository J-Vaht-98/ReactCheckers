import Game from "../../Game/Game";
import App from "../../App";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Settings from './Components/Settings';
import { useState } from "react";

function Play() {
    const gameState = [
        [2,0,2,0,2,0,2,0],
        [0,2,0,2,0,2,0,2],
        [2,0,2,0,2,0,2,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1],
      ]
      const gameState2 = [ //this just a dummy gamestate for debugging
        // [0,0,0,0,0,0,0,0],
        [2,0,0,0,0,0,0,0],
        [0,1,0,0,0,0,0,0],
        [0,0,1,0,0,0,0,0],
        [0,0,0,1,0,0,0,0],
        [0,0,1,0,0,0,0,0],
        [0,0,0,1,0,1,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
      ]

    const [gameStarted, setGameStarted] = useState(false)
    const [playComputer,setPlayComputer] = useState(true)
    const settings = {
      game:{
        playComputer:playComputer
      }
    }
    return (
      <>
        <CssBaseline />
        {gameStarted ?
      <Box 
      sx={{
        boxSizing:'content-box',
        marginTop: 2,
        display: "flex",
        flexDirection:'column',
        alignItems:'center',
      }}
      component="main" maxWidth="s">
        <App game={new Game(gameState,settings.game)}/> 
      </Box>
        :
        <Container component="main" maxWidth="xs">
          <Box
          maxWidth='xs'
          sx={{
            mt:22,
            gap:4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
          >
            <Button
              variant="contained"
              sx={{
                mt:1
              }}
              onClick={()=>setGameStarted(true)}
              >Play single player</Button>
            <Settings setPlayComputer={setPlayComputer} />
        </Box>
        </Container>
        }
    </>
    );
  }
    

export default Play;
