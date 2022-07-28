import { parsePlayerMoves } from "./Logic";
import { countPlayerBtns, getRandomInt } from "./Utils";
class AIPlayer{
    constructor(game,difficulty){
        this.game = game;
        this.myButton = 2;
        this.myOpponent = 1;
        this.myTurn = game.getActivePlayer() === this.myButton
        this.btnPositions = getButtonPositions(this.game.board, this.myButton,this.myOpponent)
        this.btnsForcedToMove = getButtonsForcedToMove(this.game.board,this.myButton)
        console.log(this)
        
    }
    getMove(){
        return {from:[2,2],to:[3,3]}
    }
    setAllMoves(moveArray){
        this.allMoves = moveArray
    }
}
const getButtonsForcedToMove = (board,button,opponent)=>{
    return parsePlayerMoves(board,button,opponent)
}
const getButtonPositions  = (board,button)=>{
    let arr = []
    for(const i in board)
        for(const j in board){
            const el = board[i][j]
            if(el === button)
                arr.push(`${i}${j}`)
        }
    return arr;
}
export default AIPlayer;