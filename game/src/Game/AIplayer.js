import { getRandomInt } from "./Utils";
class AIPlayer{
    constructor(board,difficulty){
        this.board = board;
        this.difficulty = difficulty;
        this.from = []
        this.to = []
        this.allMoves = []
    }
    getMove(){
        return {from:[2,2],to:[3,3]}
    }
    setAllMoves(moveArray){
        this.allMoves = moveArray
    }
}
export default AIPlayer;