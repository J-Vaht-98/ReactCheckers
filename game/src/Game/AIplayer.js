import { parsePlayerMoves } from "./Logic";
import { countPlayerBtns, getRandomInt } from "./Utils";

class AIPlayer{
    /**
     * 
     * @param {*} board 
     * @param {*} myButton
     */
    constructor(board, myButton,activePlayer){
        this.myButton = myButton
        this.activePlayer = activePlayer
        this.myMoves = getButtonsForcedToMove(board,myButton,1)
        this.myMoveFrom = []
        this.choosingMoveDelay = 500
        this.makingMoveDelay = 500
    }
    updateMoves(availableMoves){
        this.myMoves = availableMoves
    }
    getMoveFrom(){
          return new Promise(resolve => {
            setTimeout(() => {
            const myMoves = this.myMoves
            const keys = Object.keys(myMoves)
            let N = getRandomInt(keys.length)
            const button = keys[N]
            this.myMoveFrom = button;
            resolve(button);
            }, this.choosingMoveDelay );
          });
    }
    getMoveTo(){
        return new Promise(resolve => {
            setTimeout(() => {
                const myMoves = this.myMoves
                const moveFromKey = this.myMoveFrom
                const moveTo = myMoves[moveFromKey][0].path[0]
                resolve(moveTo)
            }, this.makingMoveDelay);
          });
    }
    getMove(){
        const moveFrom = this.getMoveFrom()
        const moveTo = this.getMoveTo()
        return {from:moveFrom,to:moveTo}
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