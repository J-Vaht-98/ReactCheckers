import Player from "./Player"
import Board from "./Board"
import AIPlayer from "./AIplayer"
import Button from "./Button";
let gameState = [
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 0, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
];
let gameState2 = [
    [0,0,0,0,0,0,0,0],
    [0,-3,0,2,0,3,0,0],
    [1,0,0,0,0,0,0,0],
    [0,0,0,3,0,2,0,0],
    [0,0,0,0,1,0,0,0],
    [0,1,0,2,0,2,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
]
// gameState = [
//     [0,0,0,0,2,0,2,0,2,0,0,0],
//     [0,0,0,2,0,2,0,2,0,0,0,0],
//     [0,0,0,0,2,0,2,0,2,0,0,0],
//     [0,3,0,0,0,0,0,0,0,4,0,4],
//     [3,0,3,0,0,0,0,0,0,0,4,0],
//     [0,3,0,0,0,0,0,0,0,4,0,4],
//     [3,0,3,0,0,0,0,0,0,0,4,0],
//     [0,3,0,0,0,0,0,0,0,4,0,4],
//     [3,0,3,0,0,0,0,0,0,0,4,0],
//     [0,0,0,1,0,1,0,1,0,0,0,0],
//     [0,0,0,0,1,0,1,0,1,0,0,0],
//     [0,0,0,1,0,1,0,1,0,0,0,0],
// ];

// const players = [new Player(1,'up'),new Player(2,'down')]

class Game{/**
 * 
 * @param {State of the initial board} boardState 
 * @param {Array of player objects} players 
 */
    constructor(boardState,players){
        console.log('new game')
        this.settings = {
            forcedMoves:true
        }
        this.board = new Board(boardState)
        this.players = this.initPlayers(players)
        
        console.log(players)
        this.activePlayerIndex = 0
        this.activePlayer = this.players[this.activePlayerIndex]
        this.startTurn()
        this.winner = false;
    }
    initPlayers(players){
        let arr = []
        players.forEach(player =>{
            player.setGame(this)
            arr.push(player)
        })
        return arr
    }
    changeActivePlayer(){
        if(!this.winner){
        this.checkPlayerButtons()
        this.clearMove()
        this.setIndex()
        this.activePlayer = this.players[this.activePlayerIndex]
        if(this.activePlayer.loser === true){
            this.changeActivePlayer() //skip players who have already lost (no buttons left)
        }
        this.startTurn()
        
        }else{
            this.clearMove()
        }
    }
    setIndex(){
        const currentPlayerIndex = this.activePlayerIndex
        const nextPlayerIndex = currentPlayerIndex + 1 > this.players.length - 1 ? 0 : currentPlayerIndex + 1
        this.activePlayerIndex = nextPlayerIndex
    }
    startTurn(){
        this.availableMoves = []
        this.activePlayer.beginTurn()
        this.availableMoves = this.activePlayer.availableMoves;
        this.selectedPiece = null;
        this.selectedPieceMoves = null;
    }
    setSelectedPiece([row,col]){
        //sets the selected piece and moves for that piece
        const key = `${row}${col}`
        if(this.availableMoves[key]){
            this.selectedPiece = key
            this.selectedPieceMoves = this.availableMoves[`${row}${col}`]
        }
    }
    makeMove([row,col]){
        if(this.selectedPieceMoves){
            for( let i=0;i<this.selectedPieceMoves.length;i++){
                const square = this.selectedPieceMoves[i].to
                if(row === square.row && col === square.col){
                    this.board.makeMove(this.selectedPieceMoves[i],this.activePlayer)
                    const isDoubleTake = this.checkDoubleTake(this.selectedPieceMoves[i],row,col)
                    if(!isDoubleTake) this.changeActivePlayer()
                    else this.startTurn()
                    break
                }
            }
        }
    }
    clearMove(){
        this.selectedPiece = null
        this.selectedPieceMoves = null
    }
    checkPlayerButtons(){
        const board = this.board.board
        let nrs = this.players.map(player => {if(!player.loser) return player.nr})
        nrs = nrs.filter(nr => nr !== undefined)
        if(nrs.length === 1){
            this.winner = this.players[nrs[0] - 1].nr
        }
        const btns = this.players.map(player =>{ if(!player.loser) return 0})
        for(let i = 0; i < board.length;i++){
            for(let j = 0; j < board.length ; j++){
                const el = Math.abs(board[i][j])
                if(nrs.includes(el)){
                    btns[el-1]++
                }
            }
        }
        btns.forEach((nrOfButtons,i) =>{
            if(nrOfButtons === 0){
                this.players[i].loser = true
                console.log("Player", i + 1, "loses")
            }
        })
    }
    checkDoubleTake(move,row,col){
        //check if button has double take
        //if there wasnt a take it cant be a double take 
        if(!move.hasOwnProperty('take')) return false
        const isKing = this.board.board[row][col] < 0
        const btn = new Button(this.activePlayer,row,col,isKing)
        const moves = btn.getMoves()
        for(let i in moves){
            if(moves[i].hasOwnProperty('take'))
                return true
        }
        return false
    }
}
export default Game;
