import Move from "./Move";
import Button from "./Button"

export default class Player {
    constructor(game,nr, moveDirection) {
        if(game){
            this.game = game
            this.game.board.directionMap[nr] = moveDirection
            this.board = game.board.board
            this.forcedTakes = game.settings.forcedTakes
        }
        this.loser = false
        this.score = 0
        if (nr === 0) {
            throw Error(`Player nr cant equal empty square 0`);
        }
        this.nr = nr;
        const moveDirections = ["up", "down", "left", "right"]; //move direction for player(on screen)
        if (!moveDirections.includes(moveDirection))
            throw Error(
                `Invalid move direction '${moveDirection}'. 'movedirection should be one of ${moveDirections}`
            );
        this.moveDirection = moveDirection; //the direction the player should move
        this.availableMoves = {};

    }
    getButtonPositions() {
        let btns = [];
        const board = this.board;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (Math.abs(board[i][j]) === this.nr){
                    btns.push(new Button(this, i, j,board[i][j] < 0));
                }
                    
            }
        }
        return btns;
    }
    beginTurn() {
        //Get the available moves
        const board = this.board;
        this.getMoves()
        if(Object.keys(this.availableMoves).length === 0)
            this.loser = true
    }
    getMoves(){
        const playerButtons = this.getButtonPositions();
        
        this.availableMoves = {}
        let takes = {}
        let allMoves = {}
        playerButtons.forEach((button) => {
            let moves = button.getMoves()
            if(moves.length > 0){
                const key = `${button.row}${button.col}`
                allMoves[key] = moves
                const btnTakes =  moves.filter(move =>{ return move.hasOwnProperty('take')})
                if(btnTakes.length > 0){
                    takes[key] = btnTakes
                }
            }
        });
        if(this.forcedTakes){
            if(Object.keys(takes).length > 0){
                this.availableMoves = takes
                return takes
            }
        }
        this.availableMoves = allMoves
        return allMoves
    }
    endTurn(){
    }
    clearMove(){
        this.move = new Move()
    }
    setGame(game){
        this.game = game
        this.game.board.directionMap[this.nr] = this.moveDirection
        this.board = game.board.board
        this.forcedTakes = game.settings.forcedTakes
    }
}

