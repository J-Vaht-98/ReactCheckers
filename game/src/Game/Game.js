import * as utils from './Utils' 
import './AIplayer'
import AIPlayer from './AIplayer';
import {parsePlayerMoves,calculateMovedPath, parseButtonMoves} from './Logic'
class Game{
    /**
     * 
     * @param {
     *  2DArray} board - the game state, to which the game initializes to

     */
    constructor(board) {
        this.playerScores = [0, 0];
        this.board = board;
        this.activePlayer = 1;
        this.opponentPlayer = 2;
        
        this.opponentAI = new AIPlayer(board,1)
        this.moveFrom = [];
        this.movedPath = [];
        this.availableMoves = parsePlayerMoves(this.board,this.activePlayer,this.opponentPlayer)
        this.possibleSquares = []
        
        this.isWinner = false;
        this.stateHistory = [this];
        this.moveNr = this.stateHistory.length;
    }
    hasMoveFrom(){
        return this.moveFrom.length > 0
    }
    setMove(row,col){
        if(this.isWinner) return false
        const clickedElement = Math.abs(this.board[row][col])
        const hasMoveFrom = this.hasMoveFrom()
        const isMoveableBtn = Object.keys(this.availableMoves).includes(`${row}${col}`)
        if(isMoveableBtn && !hasMoveFrom){
            this.moveFrom = `${row}${col}`
            this.possibleSquares = parseButtonMoves(this.board,row,col,this.opponentPlayer)
        }
        else if(clickedElement === 0 && hasMoveFrom){
            this.makeMove(this.moveFrom,`${row}${col}`)
        }
        else if(row == this.moveFrom[0] && col==this.moveFrom[1]){
            this.moveFrom = []
        }
        else if(clickedElement === this.activePlayer && hasMoveFrom){
            this.moveFrom = `${row}${col}`
            this.possibleSquares = parseButtonMoves(this.board,row,col,this.opponentPlayer)
        }
            
    }
    isInAvailableMoves(from,to){
        const moves = this.availableMoves[from]
        if(moves === undefined){
            return false
        }
        for(const move of Object.values(moves)){
            if(move.path[0][0] == to[0] && move.path[0][1] == to[1]){
                return true
            }
        }
        return false
        
    }
    pushToStateHistory(){
        const state = {
            board:this.board,
            activePlayer:this.activePlayer,
            opponentPlayer:this.opponentPlayer,
            availableMoves:this.availableMoves,
            isWinner:this.isWinner,
        }
        this.moveNr = this.stateHistory.push(JSON.stringify(state))
    }
    setNewState(state){
            this.board = state.board
            this.activePlayer = state.activePlayer
            this.opponentPlayer = state.opponentPlayer
            this.availableMoves = state.availableMoves
            this.isWinner = this.isWinner
    }
    undo(){
        return
        if(this.stateHistory.length >= 1 && this.moveNr > 1){
            this.moveNr--
            const state = JSON.parse(this.stateHistory[this.moveNr])
            this.setNewState(state)
        }
    }
    redo(){
        return
        if(this.moveNr < this.stateHistory.length){
            const state = JSON.parse(this.stateHistory[++this.moveNr])
            this.setNewState(state)
        }
    }
    makeMove(from,to){
        if(this.isWinner) return false
        const fromRow = from[0]
        const fromCol = from[1]
        const toRow = parseInt(to[0])
        const toCol = parseInt(to[1])
        const button = this.board[fromRow][fromCol]
       
        
        if(!this.isInAvailableMoves(from,to)) return false
        
        
        this.pushToStateHistory(this.board);
        this.board[toRow][toCol] = this.board[fromRow][fromCol]
        this.board[fromRow][fromCol] = 0
        
        const movedPath = calculateMovedPath(from,[toRow,toCol]);
        let wasTake = false
        movedPath.forEach(square =>{
            if(Math.abs(this.board[square[0]][square[1]]) === this.opponentPlayer){
                wasTake = true
                this.board[square[0]][square[1]] = 0
            }
        })
        
        
        //check for king
        if(toRow == this.board.length - 1 && this.activePlayer === 2 && button > 0){
            this.board[toRow][toCol] = this.board[toRow][toCol]*-1
        }
        else if(toRow == 0 && this.activePlayer === 1 && button > 0){
            this.board[toRow][toCol] = this.board[toRow][toCol]*-1
        }
        
        let isDoubleTake = false
        if(wasTake){
            this.playerScores[this.activePlayer-1]++
            //check for double take
            isDoubleTake = parseButtonMoves(this.board,toRow,toCol,this.opponentPlayer).filter(move => move.isTake === true).length > 0
        }
        this.checkWin()
        this.clearMove()
        if(isDoubleTake){
            this.availableMoves = parsePlayerMoves(this.board,this.activePlayer,this.opponentPlayer)
        }else{
            this.toggleActivePlayer()
        }
        
    }
    clearMove(){
        this.availableMoves = []
        this.possibleSquares = []
        this.moveFrom = []
    }
    checkWin(){
        /**
         * It is a win if:
         *      there is a forfeit
         *      there is no buttons left for a player
         *      there are buttons left but they cant move for one player
         */
        //count player buttons
        let player1Btns = utils.countPlayerBtns(this.board,1)
        let player2Btns = utils.countPlayerBtns(this.board,2)
        if(player1Btns === 0){
            this.isWinner = 2
            return true
        }
        if(player2Btns === 0){
            this.isWinner = 1
            return true
        }
        //check if each player has a move
        let player1HasMove = false
        let player2HasMove = false
        const board = this.board
        // for(let row in board)
        //     for(let col in board[row]){
        //         row = parseInt(row)
        //         col = parseInt(col)
        //         if(!player1HasMove && Math.abs(board[row][col]) === 1){
        //             if(this.calculateTakes([row,col]).length > 0 || this.calculateMoves([row,col]).length > 0){
        //                 player1HasMove = true
        //             }
        //         }
        //         else if(!player2HasMove && Math.abs(board[row][col]) === 2){
        //             if(this.calculateTakes([row,col]).length > 0 || this.calculateMoves([row,col]).length > 0){
        //                 player2HasMove = true
        //             }
        //         }
        //     }
        // if(!player1HasMove){
        //     this.isWinner = 2
        //     return true
        // }
        // if(!player2HasMove){
        //     this.isWinner = 1
        //     return true
        // }
    }
    forfeit(){
        this.isWinner = this.opponentPlayer
    }
    dispatchMoveEvent(from,to){
        const ev = new CustomEvent('move',{
            bubbles:false,
            cancelable:true,
            detail:{
            from:from,
            to:to
        }})
        window.dispatchEvent(ev)
    }
    init(board){
        this.playerScores = [0, 0];
        this.board =[
            [2,0,2,0,2,0,2,0],
            [0,2,0,2,0,2,0,2],
            [2,0,2,0,2,0,2,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1],
          ]
        this.activePlayer = 1;
        this.opponentPlayer = 2;
        
        this.opponentAI = new AIPlayer(board,1)
        this.moveFrom = [];
        this.movedPath = [];
        this.availableMoves = parsePlayerMoves(this.board,1,2)
        this.possibleSquares = [];
        
        this.isWinner = false;
        this.stateHistory = [];
        this.moveNr = this.stateHistory.length;
    }
    toggleActivePlayer() {
        if(this.activePlayer === 1){
            this.opponentPlayer = this.activePlayer
            this.activePlayer = 2
            this.availableMoves = parsePlayerMoves(this.board,2,1)
        }
        else{
            this.opponentPlayer = this.activePlayer
            this.activePlayer = 1
            this.availableMoves = parsePlayerMoves(this.board,1,2)
        }
    }
}

export default Game;
