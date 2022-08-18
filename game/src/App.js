import Board from "./Components/Board";
import "./App.css";
import { useContext, useEffect, useReducer, useState } from "react";
import GameInfo from "./Components/GameInfo";
import cloneDeep from "lodash/cloneDeep";

function actionElementClicked(game, payload){
    if (game.winner > 0) {
        return game;
    }
    const row = payload?.row;
    const col = payload?.col;
    if(game.selectedPiece){
        const selectedRow = parseInt(game.selectedPiece[0])
        const selectedCol = parseInt(game.selectedPiece[1])
        const selectedEl = Math.abs(game.board.board[row][col])
        if(selectedCol === col && selectedRow === row){
            game.clearMove()
            return cloneDeep(game)
        }
        if(selectedEl === game.activePlayer.nr){
            game.clearMove()
            game.setSelectedPiece([row,col])
            return cloneDeep(game)
        }
                
        
        game.makeMove([row,col])
        return cloneDeep(game)
    }
    game.setSelectedPiece([row,col])
    return cloneDeep(game);
};
function actionGameStateUpdate(game,payload){
    game.update(payload)
    return cloneDeep(game)
}


function reducer(state, action) {
    switch (action.type) {
        case "buttonClicked":
            return actionElementClicked(state, action.payload);
        case "squareClicked":
            return actionElementClicked(state, action.payload);
        case "gameStateUpdate":
            return actionGameStateUpdate(state,action.payload);
        default:
            throw new Error(
                "Reducer action type is not defined: " + action.type
            );
    }
}

function App({ game }) {

    const [state, dispatch] = useReducer(reducer, game);
    const handleSquareSelect = (e)=>{
            dispatch({type:'squareClicked',payload:{row:e.detail.pos[0],col:e.detail.pos[1]}})
    }
    const handlePieceSelect =(e)=>{
        dispatch({type:'buttonClicked',payload:{row:e.detail.pos[0],col:e.detail.pos[1]}})
    }
    const handleGameStateUpdate = (e)=>{
        dispatch({type:'gameStateUpdate',payload:e.detail.gameState})
    }
    useEffect(()=>{
        
        document.addEventListener('pieceSelected',handlePieceSelect)
        document.addEventListener('squareSelected',handleSquareSelect)
        document.addEventListener('gameStateUpdate',handleGameStateUpdate)
        return ()=>{
            //clean up the listeners on unmount
            document.removeEventListener('pieceSelected',handlePieceSelect)
            document.removeEventListener('squareSelected',handleSquareSelect)
            document.removeEventListener('gameStateUpdate',handleGameStateUpdate)
        }
    })
    
    return (
        <>  
            <Board game={state} dispatchClick={dispatch} />
            <GameInfo game={state} dispatch={dispatch} />
        </>
    );
}

export default App;
