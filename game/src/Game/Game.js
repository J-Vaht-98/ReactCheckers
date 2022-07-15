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
        
        //Get jumped over pieced
        this.movedPath = this.calculateMovedPath();
        console.log(this.movedPath)
        //Check for kings
        let isKinged = 1; 
        if (this.activePlayer === 1 && movedButton === 1 && to[0] === 0) {
            isKinged = -1;
        }
        if (this.activePlayer === 2 && movedButton === 2 && to[0] === 7) {
            isKinged = -1;
        }

        //Move piece
        //Multiply with -1 or 1 depending on if the button is now a king
        this.board[to[0]][to[1]] = this.board[from[0]][from[1]] * isKinged;
        this.board[from[0]][from[1]] = 0;

        //Remove the taken piece
        if (this.movedPath.length >= 1) {
            this.movedPath.forEach((square) => {
                if (
                    Math.abs(this.board[square[0]][square[1]]) ===
                    this.opponentPlayer
                ) {
                    this.board[square[0]][square[1]] = 0;
                    this.playerScores[this.activePlayer - 1]++
                    this.gainedExtraMove = true;
                }
            });
        } else {
            this.toggleActivePlayer();
        }
        this.pushToMoveHistory(from, to);
        this.clearMove();
        this.checkForWin();
        return true;
    }
    init(){
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
        let i, j;
        let moves = [];
        if (isKing) {
            /**
             * TODO:
             *  [0,0] and [7,7] squares dont show up ever
             *  Shouldnt be able to jump over more than 1 button
             *  If a button is detected in some direction, and the square after it in 
             *  the same direction is empty, then its a valid move.
             */
            for (i = 0; i < 8; i++)
                for (j = 0; j < 8; j++) {
                    let k = (i - move[0]) / (j - move[1]);
                    if (
                        (k === 1 || k === -1) &&
                        move[0] !== i &&
                        move[1] !== j
                        && board[i][j] === 0
                    ) {
                        this.availableMoves.push([i, j]);
                    }
                }
        }
        if (this.activePlayer === 1) {
            let i = move[0];
            let j = move[1];
            let upLeft = i - 1 >= 0 && j - 1 >= 0 ? board[i - 1][j - 1] : null;
            let moreUpLeft = i - 2 >= 0 && j - 2 >= 0 ? board[i - 2][j - 2] : null;
            let moreUpRight = i - 2 >= 0 && j + 2 <= 8 ? board[i - 2][j + 2] : null;
            let upRight = i - 1 >= 0 && j + 1 <= 8 ? board[i - 1][j + 1] : null;

            if (upLeft === 2 && moreUpLeft === 0)
                this.availableMoves.push([i - 2, j - 2]);
            if (upRight == 2 && moreUpRight === 0)
                this.availableMoves.push([i - 2, j + 2]);
            if (upLeft === 0) this.availableMoves.push([i - 1, j - 1]);
            if (upRight === 0) this.availableMoves.push([i - 1, j + 1]);
        } else if (this.activePlayer === 2) {
            let i = move[0];
            let j = move[1];
            let downLeft = i + 1 <= 7 && j - 1 >= 0 ? board[i + 1][j - 1] : null;
            let downRight = i + 1 <= 7 && j + 1 <= 7 ? board[i + 1][j + 1] : null;
            let moreDownLeft = i + 2 <= 7 && j - 2 >= 0 ? board[i + 2][j - 2] : null;
            let moreDownRight = i + 2 <= 7 && j + 2 <= 7 ? board[i + 2][j + 2] : null;
            if(downLeft === 0) this.availableMoves.push([i+1,j-1])
            if(downRight === 0) this.availableMoves.push([i+1,j+1])
            if(downLeft === 1 && moreDownLeft === 0) this.availableMoves.push([i+2,j-2])
            if(downRight === 1 && moreDownRight === 0) this.availableMoves.push([i+2,j+2])
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
}

export default Game;
