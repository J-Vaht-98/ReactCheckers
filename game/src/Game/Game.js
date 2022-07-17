import { act } from "react-dom/test-utils";

class Game {
    constructor(board) {
        this.playerScores = [0, 0];
        this.board = board;
        this.activePlayer = 1;
        this.opponentPlayer = 2;
        this.takenPiece = [];
        this.moveFrom = [];
        this.moveTo = [];
        this.movedPath = [];
        this.gainedExtraMove = false;

        this.isWinner = false;
        this.moveHistory = [];
        this.moveNr = this.moveHistory.length;
        this.availableMoves = [];
    }
    makeMove() {
        const from = this.moveFrom;
        const to = this.moveTo;
        const movedButton = this.board[from[0]][from[1]];
        
        if(this.isWinner) return false;
        if (from.length === 0 || to.length === 0) return false;
        
        //moveTo === moveFrom ?
        if (from[0] === to[0] && from[1] === to[1]) return false;
        
        //moveFrom is a button
        if (this.board[from[0]][from[1]] === 0) return false;
        
        //moveTo is an empty square
        if (this.board[to[0]][to[1]]) return false;
        
        //check if move is in available moves
        let isAvailable = false;
        this.availableMoves.forEach((move) => {
            if (move[0] === to[0] && move[1] === to[1]) isAvailable = true;
        });
        
        if (!isAvailable) return false;
        
        //check if move is diagonal or taking a piece
        const k = (to[0] - from[0]) / Math.abs(to[1] - from[1]);
        // --> y=kx + b;  Math.abs because the horizontal direction doesnt matter
        // k is -1 for player 1 and 1 for player 2
        
        //Check if direction is correct (only applies for regular button)
        if (movedButton === 1 && this.activePlayer === 1 && k !== -1)
            return false;
        if (movedButton === 2 && this.activePlayer === 2 && k !== 1)
            return false;
            
        //Check that player is moving their own button
        if (this.activePlayer !== Math.abs(movedButton)) return false;
        
        //Check for kings
        let isKinged = 1; 
        if (this.activePlayer === 1 && movedButton === 1 && to[0] === 0) {
            isKinged = -1;
        }
        if (this.activePlayer === 2 && movedButton === 2 && to[0] === 7) {
            isKinged = -1;
        }
        //Get jumped over pieced
        this.movedPath = this.calculateMovedPath();
        
        //Move piece
        //Multiply with -1 or 1 depending on if the button is now a king
        this.board[to[0]][to[1]] = this.board[from[0]][from[1]] * isKinged;
        this.board[from[0]][from[1]] = 0;

        //Remove the taken piece
        
        for(let i = 0; i < this.movedPath.length;i++){
            
            const square = [this.movedPath[i][0],this.movedPath[i][1]];
            if (
                Math.abs(this.board[square[0]][square[1]]) ===
                this.opponentPlayer
            ) {
                this.board[square[0]][square[1]] = 0;
                this.playerScores[this.activePlayer - 1]++
                this.gainedExtraMove = true;
                break; // only take 1 piece per jump
            }else{
                //for kings, because the path might be > 0 in length but not take anything
                this.gainedExtraMove = false; 
            }
        }
        if(this.movedPath.length === 0) this.gainedExtraMove = false;
            
        if(!this.gainedExtraMove) this.toggleActivePlayer();
        
        this.pushToMoveHistory(from, to);
        this.clearMove();
        this.checkForWin();
        return true;
    }
    init(){
        console.log("Initializing new game")
        this.playerScores = [0, 0];
        this.board = [
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
        this.takenPiece = [];
        this.moveFrom = [];
        this.moveTo = [];
        this.movedPath = [];
        this.gainedExtraMove = false;

        this.isWinner = false;
        this.moveHistory = [];
        this.moveNr = this.moveHistory.length;
        this.availableMoves = [];
    }
    checkForWin() {
        //Check if either player has no buttons left
        let player1Win = true
        let player2Win = true
        this.board.forEach(row =>{
            row.forEach(square => {
                square = Math.abs(square)
                if(square === 1) player2Win = false
                if(square === 2) player1Win = false
            })
        })
        if(player1Win) this.isWinner = 1
        else if(player2Win) this.isWinner = 2
        
    }
    calculateMovedPath() {
        //Gets the moved path aka if any pieces were jumped over
        //Excludes the start and stop squares
        // Returns an array of jumped over squares, or an empty one if none were jumped
        const startX = this.moveFrom[1];
        const startY = this.moveFrom[0];
        const stopX = this.moveTo[1];
        const stopY = this.moveTo[0];

        let vertDirection = stopY - startY;
        let horDirection = stopX - startX;

        let path = [];
        if (vertDirection > 0 && horDirection > 0) {
            //down right on screen
            //vertDirection and horDirection are equal because you can only move diagonally

            vertDirection--;
            horDirection--; // this excludes the starting square

            //set the while loop to >= instead of > to include stop square
            while (vertDirection > 0 || horDirection > 0) {
                path.push([stopY - vertDirection, stopX - horDirection]);
                vertDirection--;
                horDirection--;
            }
        } else if (vertDirection > 0 && horDirection < 0) {
            //down left on screen
            vertDirection--;
            horDirection++;
            while (vertDirection > 0 || horDirection < 0) {
                path.push([stopY - vertDirection, stopX - horDirection]);
                horDirection++;
                vertDirection--;
            }
        } else if (vertDirection < 0 && horDirection > 0) {
            //up right on screen
            vertDirection++;
            horDirection--;
            while (vertDirection < 0 || horDirection > 0) {
                path.push([stopY - vertDirection, stopX - horDirection]);
                horDirection--;
                vertDirection++;
            }
        } else if (vertDirection < 0 && horDirection < 0) {
            //up left on screen
            vertDirection++;
            horDirection++;
            while (vertDirection < 0 || horDirection < 0) {
                path.push([stopY - vertDirection, stopX - horDirection]);
                horDirection++;
                vertDirection++;
            }
        }
        return path;
    }
    getTakenPiece() {
        if (this.movedPath.length === 0) this.takenPiece = [];
        else {
            this.movedPath.forEach((square) => {
                if (
                    Math.abs(this.board[square[0]][square[1]]) ===
                    Math.abs(this.opponentPlayer)
                ) {
                    this.takenPiece = [];
                }
            });
        }
        this.takenPiece = [];
    }
    setMove(move) {
        const targetValue = this.board[move[0]][move[1]];
        if (this.activePlayer === Math.abs(targetValue)) {
            this.availableMoves = [];
            this.moveFrom = move;
            this.getAvailableMoves();
        } else if (targetValue === 0 && this.moveFrom.length > 0) {
            this.moveTo = move;
            this.makeMove();
        }else{
            this.moveFrom = []
            this.moveTo = []
        }
    }
    toggleActivePlayer() {
        this.gainedExtraMove = false
        this.activePlayer === 1
            ? (this.activePlayer = 2)
            : (this.activePlayer = 1);
        this.opponentPlayer === 2
            ? (this.opponentPlayer = 1)
            : (this.opponentPlayer = 2);
    }
    getAvailableMoves() {
        const button = this.board[this.moveFrom[0]][this.moveFrom[1]];
        const isKing = button < 0;

        const board = this.board;
        const move = this.moveFrom;
        /**
         * TODO:
         *  [0,0] and [7,7] squares dont show up ever --- styles problem not related to this function
         *  Shouldnt be able to jump over more than 1 button
         *  If a button is detected in some direction, and the square after it in 
         *  the same direction is empty, then its a valid move.
         *  Mandatory takes
         *  refactor code because the valid move finding for player 1 and 2 is copy pasted
         */
            
        const player = this.activePlayer
        const opponent = this.opponentPlayer
        const row = move[0];
        const col = move[1];
        
        if(isKing || player === 1){
            let x = 1; //depth
            let upLeft = null ,upLeftBtn = null
            if(row - x >= 0 && col - x >= 0){
                upLeft = [row - x, col - x]
                upLeftBtn = Math.abs(board[row - x][col - x])
            }
            let upRight = null, upRightBtn=null
            if(row - x >= 0 && col + x < 8 ){
                upRight = [row - x, col + x]
                upRightBtn = Math.abs(board[row - x][col + x])
            }
            x = 2;
            let moreUpLeft = null, moreUpLeftBtn = null
            if(row - x >= 0 && col - x >= 0){
                moreUpLeft = [row - x, col - x]
                moreUpLeftBtn = board[row - x][col - x]
            }
            let moreUpRight = null, moreUpRightBtn = null
            if( row - x >= 0 && col + x < 8 ){
                moreUpRight = [row - x, col + x]
                moreUpRightBtn = board[row -x][col + x]
            }
            
            if(upLeft && upLeftBtn === 0 ) this.availableMoves.push(upLeft);
            else if(upLeft && moreUpLeft && upLeftBtn === opponent && moreUpLeftBtn === 0){
                this.availableMoves.push(moreUpLeft)
            }
            if(upRight && upRightBtn === 0) this.availableMoves.push(upRight);
            else if(upRight && moreUpRight && upRightBtn === opponent && moreUpRightBtn === 0){
                this.availableMoves.push(moreUpRight)
            }
        }
        if(isKing || player === 2){
            let x = 1; //depth
            let upLeft = null ,upLeftBtn = null
            if(row + x <8 && col - x >= 0){
                upLeft = [row + x, col - x]
                upLeftBtn = Math.abs(board[row + x][col - x])
            }
            let upRight = null, upRightBtn=null
            if(row + x<8 && col + x < 8 ){
                upRight = [row + x, col + x]
                upRightBtn = Math.abs(board[row + x][col + x])
            }
            x = 2;
            let moreUpLeft = null, moreUpLeftBtn = null
            if(row + x < 8 && col - x >= 0){
                moreUpLeft = [row + x, col - x]
                moreUpLeftBtn = board[row + x][col - x]
            }
            let moreUpRight = null, moreUpRightBtn = null
            if( row + x < 8 && col + x < 8 ){
                moreUpRight = [row + x, col + x]
                moreUpRightBtn = board[row +x][col + x]
            }
            
            if(upLeft && upLeftBtn === 0 ) this.availableMoves.push(upLeft);
            else if(upLeft && moreUpLeft && upLeftBtn === opponent && moreUpLeftBtn === 0){
                this.availableMoves.push(moreUpLeft)
            }
            if(upRight && upRightBtn === 0) this.availableMoves.push(upRight);
            else if(upRight && moreUpRight && upRightBtn === opponent && moreUpRightBtn === 0){
                this.availableMoves.push(moreUpRight)
            }
        }
                      
  
    }
    undo() {
        const move = this.moveHistory.pop();
        const to = move.to;
        const from = move.from;
        this.makeMove((to = to), (from = from));
    }
    pushToMoveHistory(from, to) {
        this.moveHistory.push({ from: from, to: to });
    }
    clearMove() {
        this.moveFrom = [];
        this.moveTo = [];
        this.availableMoves = [];
        this.movedPath = [];
    }
    forfeit(){
        this.isWinner = this.opponentPlayer
    }
}

export default Game;
