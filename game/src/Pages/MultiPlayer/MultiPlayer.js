import React, { useState, useEffect } from 'react';
import {io} from 'socket.io-client';
import {Box,TextField, Button, Container, Typography} from '@mui/material'
import App from '../../App';
import { GameSettings } from '../Play/Play';
import cloneDeep from "lodash/cloneDeep";
import MultiPlayerGame from '../../Game/MultiplayerGame';
const url = 'http://localhost:8080';
const socket = io(url,{
  path:'/play/',
  autoConnect:false
})


function MultiPlayer() {
  const [gameID,setGameID] = useState('')
  const [playerID,setPlayerID] = useState(socket.id)
  const [gameState,setGameState] = useState({})
  const [gameStarted,setGameStarted] = useState(false)
  const [options,setOptions] = useState({
    nrOfPlayers:2,
    forcedTakes:true,
  })
  const [text,setText] = useState('aa')
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
  function handleNewGame(){
    socket.emit('newGame',options);
  }
  function handleJoinGame(){
    if(gameID)
      socket.emit('joinGame',gameID,options)
  }
  function handleGameID(gameID){
    setGameID(gameID)
  }
  
  function handleGameState(gameState){
    console.log("Received gameSTate " + gameState)
    
    if(!gameStarted){
      setGameStarted(true)
    }
    document.dispatchEvent(new CustomEvent("gameStateUpdate",{detail:{
      gameState:gameState
    }}))
    setGameState(cloneDeep(gameState))
  }
  useEffect(()=>{
    socket.connect()
    socket.on('gameID',gameID => handleGameID(gameID))
    socket.on('gameState',gameState => handleGameState(gameState))
    socket.on('error', errorMsg=>console.log(errorMsg))
    socket.on('textChange',text => setText(text))
    return ()=>{
      socket.off('gameID')
      socket.off('gameState')
      socket.off('error')
      socket.off('textChange')
    }
  })
  const emitGameState = (gameState)=>{
    socket.emit("gameState",gameState)
  }
  const game = gameStarted ? new MultiPlayerGame(gameState,socket,{forcedTakes:true},emitGameState): undefined
  
  return ( 
    <GameSettings.Provider value={fallBackSettings}>
    
    <Box
      sx={{
        display:'flex',
        flexDirection:'column',
        width:'300px',
        margin:'0 auto',
        mt:12,
        height:'600px'
      }}
    >
      <Button
       onClick={()=>{handleNewGame()}}
      >New game</Button>
      <Typography>{gameID}</Typography>
      <Button
       onClick={()=>{handleJoinGame()}}
      >Join Game</Button>
      <Button
      onClick={()=>{
        socket.emit("gameState",gameState)
      }}>GS</Button>
      <TextField onChange={(e)=>setGameID(e.target.value)} />
      {gameStarted && <App game={game} />}
      <textarea
        onChange={(e)=>{
          setText(e.target.value)
          socket.emit("textChanged",gameID,e.target.value)
        }}
        value={text}
      >
      
      </textarea>
    </Box>
    </GameSettings.Provider>
   );
}

export default MultiPlayer;