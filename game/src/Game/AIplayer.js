import Player from "./Player";
import AIMoveEngine from "./AIMoveEngine";
export default class AIPlayer extends Player{
    constructor(game,nr, moveDirection){
        super(game,nr,moveDirection)
        this.type = "AI"
        this.engine = new AIMoveEngine(this)
        this.selectPieceTimeOut = 500 
        this.selecSquareTimeOut = this.selectPieceTimeOut + 500
    }
    
    beginTurn(){
        super.beginTurn() //sets the available moves
        if(!this.loser){
            this.engine.update(this)
            const move =  this.engine.getMove()
            const piece = [move.from.row,move.from.col]
            const square = [move.to.row,move.to.col]        
            setTimeout(()=>this.emitPieceSelect(piece),this.selectPieceTimeOut)
            setTimeout(()=>this.emitSquareSelect(square),this.selecSquareTimeOut)
        }
    }
    emitPieceSelect(pos){
        const ev = new CustomEvent('pieceSelected',{detail:{
            pos:pos
        }})
        document.dispatchEvent(ev)
    }
    emitSquareSelect(pos){
        const ev = new CustomEvent('squareSelected',{detail:{
            pos:pos
        }})
        document.dispatchEvent(ev)
    }
}