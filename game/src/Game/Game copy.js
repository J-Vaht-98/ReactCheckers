import * as utils from './Utils' 
import './AIplayer'
import AIPlayer from './AIplayer';
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
        this.availableMoves = [];
        this.forcedMoves = this.calculateForcedMoves()
        
        this.isWinner = false;
        this.moveHistory = [];
        this.moveNr = this.moveHistory.length;
    }
    hasMoveFrom(){
        return this.moveFrom.length > 0
    }
    hasForcedMoves(){
        return this.forcedMoves.length > 0
    }
    setMove(row,col){
        if(this.isWinner) return false
        const clickedElement = Math.abs(this.board[row][col])
        const hasMoveFrom = this.hasMoveFrom()
        const hasForcedMoves = this.hasForcedMoves()
        //clicked square ?
        if(clickedElement === 0 && hasMoveFrom){
            this.makeMove(this.moveFrom,[row,col])
        }
        //clicked button ?
        else if(clickedElement === this.activePlayer){
            if(!hasForcedMoves){
                if(!hasMoveFrom){
                    this.moveFrom = [row,col]
                    this.availableMoves = this.calculateMoves()
                }
                else if(hasMoveFrom && this.moveFrom[0] === row && this.moveFrom[1] === col){
                    this.moveFrom = [];
                    this.availableMoves = [];
                }
                else if(hasMoveFrom && clickedElement === this.activePlayer){
                    this.moveFrom = [row,col]
                    this.availableMoves = this.calculateMoves()
                }
            }
            else{
                //check if clicked button is in forced moves
                const isInForced = this.isBtnInForcedMoves(row,col) //returns an index of the forcedMoves array or false
                if(isInForced && !hasMoveFrom){
                    this.moveFrom = [row,col]
                    //get the to square values
                    let vals = []
                    this.forcedMoves.forEach(move=>{
                        if(move.from[0] === row && move.from[1] === col){
                            vals.push(move.to)
                        }
                    })
                    this.availableMoves = vals
                }
                else if(isInForced && row === this.moveFrom[0] && col === this.moveFrom[1]){
                    this.moveFrom = []
                    this.availableMoves = []
                }
                else if(isInForced && hasMoveFrom && clickedElement === this.activePlayer){
                    this.moveFrom = [row,col]
                    //get the to square values
                    let vals = []
                    this.forcedMoves.forEach(move=>{
                        if(move.from[0] === row && move.from[1] === col){
                            vals.push(move.to)
                        }
                    })
                    this.availableMoves = vals
                }
            }
        }
    }
    isBtnInForcedMoves(row,col){
        let indices = []
        for(let i in this.forcedMoves){
            const moveFrom = this.forcedMoves[i].from
            if(row === moveFrom[0] && col === moveFrom[1])
                indices.push(i)
        }
        return indices.length > 0
    }
    makeMove(from,to){
        if(this.isWinner) return false
        const fromRow = from[0]
        const fromCol = from[1]
        const toRow = to[0]
        const toCol = to[1]
        const button = this.board[fromRow][fromCol]
        /**
         * Stuff like moving on top of a button, moving to a white square
         * is handled in the square component via click handlers
         * so in case of issues look in there
         **/
        const isInAvailableMoves = ()=>{
            for(let i in this.availableMoves){
                const move = this.availableMoves[i]
                if(move[0] === toRow && move[1] === toCol)
                return true
            }
            return false
        }
        if(!isInAvailableMoves()) return false
        this.dispatchMoveEvent(from,to);
        
        this.board[toRow][toCol] = this.board[fromRow][fromCol]
        this.board[fromRow][fromCol] = 0
        
        const movedPath = this.calculateMovedPath(from,[toRow,toCol]);
        let wasTake = false
        movedPath.forEach(square =>{
            if(Math.abs(this.board[square[0]][square[1]]) === this.opponentPlayer){
                wasTake = true
                this.board[square[0]][square[1]] = 0
            }
        })
        
        
        //check for king
        if(toRow === this.board.length - 1 && this.activePlayer === 2 && button > 0){
            this.board[toRow][toCol] = this.board[toRow][toCol]*-1
        }
        else if(toRow === 0 && this.activePlayer === 1 && button > 0){
            this.board[toRow][toCol] = this.board[toRow][toCol]*-1
        }
        //check for double take
        const isDoubleTake = this.calculateTakes([toRow,toCol]).length > 0
        
        //toggle the player, it gets toggled back immediately so the active player doesnt change in practice
        if(isDoubleTake && wasTake)
            this.activePlayer = this.opponentPlayer
        this.toggleActivePlayer()
        this.checkWin()
        this.clearMove()
    }
    clearMove(){
        this.availableMoves = []
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
        for(let row in board)
            for(let col in board[row]){
                row = parseInt(row)
                col = parseInt(col)
                if(!player1HasMove && Math.abs(board[row][col]) === 1){
                    if(this.calculateTakes([row,col]).length > 0 || this.calculateMoves([row,col]).length > 0){
                        player1HasMove = true
                    }
                }
                else if(!player2HasMove && Math.abs(board[row][col]) === 2){
                    if(this.calculateTakes([row,col]).length > 0 || this.calculateMoves([row,col]).length > 0){
                        player2HasMove = true
                    }
                }
            }
        if(!player1HasMove){
            this.isWinner = 2
            return true
        }
        if(!player2HasMove){
            this.isWinner = 1
            return true
        }
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
        this.board = board;
        this.activePlayer = 1;
        this.opponentPlayer = 2;
        
        this.opponentAI = new AIPlayer(board,1)
        this.moveFrom = [];
        this.movedPath = [];
        this.availableMoves = [];
        this.forcedMoves = this.calculateForcedMoves()
        
        this.isWinner = false;
        this.moveHistory = [];
        this.moveNr = this.moveHistory.length;
    }
    toggleActivePlayer() {
        if(this.activePlayer === 1){
            this.opponentPlayer = this.activePlayer
            this.activePlayer = 2
            this.forcedMoves = this.calculateForcedMoves()
            
                // this.makeAIMove()
        }
        else{
            this.opponentPlayer = this.activePlayer
            this.activePlayer = 1
            this.forcedMoves = this.calculateForcedMoves()
        }
    }
    makeAIMove(){
        
        const N = this.forcedMoves.length - 1
        let move = null;
        if(this.hasForcedMoves() && N >= 0){
            const randomMove = this.forcedMoves[0];
            let arr = []
            this.forcedMoves.forEach(move => arr.push(move.to))
            this.availableMoves = arr
            const a = this.makeMove(randomMove.from,randomMove.to)
            console.log("AI forced moves",this.forcedMoves,a)
        }
        else{
            const moves = this.getAIMoves()
            const r = utils.getRandomInt(moves.length -1)
            const randomMove = moves[r]
            this.availableMoves = this.calculateMoves(randomMove.from)
            const a = this.makeMove(randomMove.from,randomMove.to)
            console.log("AI random",moves,a)
        }
        
    }
    getAIMoves(){
        /*Picks a random move*/
        let board= this.board
        let i,j
        let AIMoves = []
        for(i = 0;i<board.length;i++){
            for(j=0;j<board[i].length;j++){
                const btn = board[i][j]
                if(btn === 2){
                    const moves = this.calculateMoves([i,j],2,1)
                    moves.forEach((move)=>{
                        AIMoves.push({from:[i,j],to:move})
                    })
                }
            }
        }
        return AIMoves
    }
    calculateTakes(from){
        //Checks if a piece can take 
        const row = from[0]
        const col = from[1]
        const player = this.activePlayer
        const isKing = this.board[row][col] < 0
        const board = this.board
        const opponent = this.opponentPlayer
        let moves = []
        if(isKing || player === 1){
            if(row - 2 >= 0 && col + 2 < 8 && Math.abs(board[row -1][col +1]) === opponent && board[row-2][col+2] === 0)
                moves.push([row-2,col+2])
            if(row - 2 >= 0 && col - 2 > 0 && Math.abs(board[row -1][col -1]) === opponent && board[row-2][col - 2] === 0)
                moves.push([row-2,col-2])
        }
        if(isKing || player === 2){
            if(row + 2 < 8 && col + 2 < 8 && Math.abs(board[row+1][col+1]) === opponent && board[row+2][col + 2] === 0)
                moves.push([row + 2,col +2])
            if(row + 2 < 8 && col - 2 >=0 && Math.abs(board[row+1][col-1]) === opponent && board[row+2][col - 2] === 0)
                moves.push([row + 2,col -2])
        }
        return moves
    }
    calculateMoves(from = null,activePlayer=null,opponentPlayer=null){
        /*Gets the empty squares you can move to */
        const board = this.board
        const player = activePlayer || this.activePlayer
        const opponent = opponentPlayer || this.opponentPlayer
        let row = this.moveFrom[0];
        let col = this.moveFrom[1];
        if(from !== null){
            row = from[0]
            col = from[1]
        }
        const isKing = board[row][col] < 0
        const moves = []
        
        if(player === 1 || isKing){
            if(row - 1 >= 0 && col - 1 >= 0 && board[row - 1][col - 1] === 0)
                moves.push([row-1,col-1])
            if(row - 1 >= 0 && col + 1 < 8 && board[row -1][col +1]=== 0)
                moves.push([row-1,col+1])
            //TODO for future: toggle wheter taking is forced
            // if(row - 2 >= 0 && col + 2 < 8 && Math.abs(board[row -1][col +1]) === opponent && board[row-2][col+2] === 0)
            //     moves.push([row-2,col+2])
            // if(row - 2 >= 0 && col - 2 > 0 && Math.abs(board[row -1][col -1]) === opponent && board[row-2][col - 2] === 0)
            //     moves.push([row-2,col-2])


        }
        if(player === 2 || isKing){
            if(row + 1 < 8 && col - 1 >= 0 && board[row+1][col-1] === 0){
                moves.push([row +1,col-1])
            }
            if(row + 1 < 8 && col + 1 < 8 && board[row + 1][col + 1] === 0)
                moves.push([row + 1,col + 1])
            // if(row + 2 < 8 && col + 2 < 8 && Math.abs(board[row+1][col+1]) === opponent && board[row+2][col + 2] === 0)
            //     moves.push([row + 2,col +2])
            // if(row + 2 < 8 && col - 2 >=0 && Math.abs(board[row+1][col-1]) === opponent && board[row+2][col - 2] === 0)
            //     moves.push([row + 2,col -2])
        }
        return moves
        
    }
    calculateForcedMoves(){
        const board = this.board
        const player = this.activePlayer
        const opponent = this.opponentPlayer
        let forcedMoves = []
        /*Iterate over each of this players buttons and check if there are takes
         *if so add them to forced moves, so you can only choose these buttons
         *on this players turn */
        let i,j
        for(let i=0; i < board.length;i++){
            for(let j=0; j<board[i].length;j++){
                const isKing = board[i][j] < 0
                if(Math.abs(board[i][j]) === player || player < 0){
                    if( isKing || player === 1){
                        if(i >= 2 && j >= 2 && Math.abs(board[i-1][j-1])=== opponent && board[i-2][j-2] === 0)
                        forcedMoves.push({from:[i,j],to:[i-2,j-2]})
                        if(i >= 2 && j <= 5 && Math.abs(board[i-1][j+1])=== opponent && board[i-2][j+2] === 0)
                        forcedMoves.push({from:[i,j],to:[i-2,j+2]})
                    }
                    if(isKing || player === 2){
                        if(i <= 5 && j <= 5 && Math.abs(board[i+1][j+1])=== opponent && board[i+2][j+2] === 0)
                            forcedMoves.push({from:[i,j],to:[i+2,j+2]})
                        if(i <= 5 && j >= 2 && Math.abs(board[i+1][j-1])===opponent && board[i+2][j-2] === 0)
                            forcedMoves.push({from:[i,j],to:[i+2,j-2]})
                    }
                }
                
            }
        }
        // this.forcedMoves = forcedMoves;
        return forcedMoves
    }
    calculateMovedPath(from,to) {
        //Gets the moved path aka if any pieces were jumped over
        //Excludes the start and stop squares
        // Returns an array of jumped over squares, or an empty one if none were jumped
        const startX = from[1];
        const startY = from[0];
        const stopX = to[1];
        const stopY = to[0];

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
}

export default Game;
