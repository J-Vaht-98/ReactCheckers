import Board from "./Components/Board";
import "./App.css";
import { useContext, useEffect, useReducer, useState } from "react";
import GameInfo from "./Components/GameInfo";
import cloneDeep from "lodash/cloneDeep";
import { GameSettings } from "./Pages/Play/Play";

const actionElementClicked = (game, payload) => {
    // console.log('action element clicked')
    // return cloneDeep(game)
    
    if (game.winner !== false) {
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
const makeNewGame = (game) => {
    game.init();
    return cloneDeep(game);
};
const handleUndo = (game) => {
    game.undo();
    return cloneDeep(game);
};
const handleRedo = (game) => {
    game.redo();
    return cloneDeep(game);
};
const handleAIChoosingMove = (game, payload) => {
    game.setMove(payload.row, payload.col);
    return cloneDeep(game);
};
const handleAIMove = (game, payload) => {
    return cloneDeep(game);
};
function reducer(state, action) {
    switch (action.type) {
        case "buttonClicked":
            return actionElementClicked(state, action.payload);
        case "squareClicked":
            return actionElementClicked(state, action.payload);
        case "newGame":
            return makeNewGame(state);
        case "move":
            return cloneDeep(state);
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
    useEffect(()=>{
        
        document.addEventListener('pieceSelected',handlePieceSelect)
        document.addEventListener('squareSelected',handleSquareSelect)
        
        return ()=>{
            //clean up the listeners on unmount
            document.removeEventListener('pieceSelected',handlePieceSelect)
            document.removeEventListener('squareSelected',handleSquareSelect)
        }
    })
    
    return (
        <>  
            <Board game={state} dispatchClick={dispatch} />
            {/* <GameInfo game={state} dispatch={dispatch} /> */}
        </>
    );
}

export default App;
