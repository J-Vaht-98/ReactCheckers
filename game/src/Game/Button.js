import { parseDownLeft,parseUpLeft,parseDownRight,parseUpRight } from "./Logic";
export default class Button {
    constructor(player, row, col, king = false) {
        this.row = row;
        this.col = col;
        this.direction = player.moveDirection;
        this.board = player.board
        this.isKing = king;
    }
    getMoves() {
        const board = this.board
        let moves = []
        if (this.isKing) {
            moves = [
                parseUpLeft(board,this.row,this.col),
                parseUpRight(board,this.row,this.col),
                parseDownLeft(board,this.row,this.col),
                parseDownRight(board,this.row,this.col)
            ]
        } else if (this.direction === "up") {
            moves = [
                parseUpLeft(board,this.row,this.col),
                parseUpRight(board,this.row,this.col)
            ]
        } else if(this.direction === "down"){
            moves = [
                parseDownLeft(board,this.row,this.col),
                parseDownRight(board,this.row,this.col)
            ]
        } else if(this.direction === "left"){
            moves = [
                parseDownLeft(board,this.row,this.col),
                parseUpLeft(board,this.row,this.col)
            ]
        } else if(this.direction === "right"){
            moves = [
                parseDownRight(board,this.row,this.col),
                parseUpRight(board,this.row,this.col)
            ]
        }
        moves = moves.filter(move=>{
            return move !== null
        })
        return moves;
    }
}