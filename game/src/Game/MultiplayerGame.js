import Game from "./Game";
import Player from "./Player";
function mapMoveDirection(nr) {
    switch (nr) {
        case 1:
            return "up";
        case 2:
            return "down";
        case 3:
            return "right";
        case 4:
            return "left";
        default:
            throw Error(`The nr ${nr} doesnt have a move direction`);
    }
}
function buildPlayerArray(gameState,socketID){
    let arr = []
    const players = gameState.players;
    players.forEach(player => {
        if(player.id === socketID){
            //Client player
            arr.push(new Player(null, player.btn,mapMoveDirection(player.btn)))
        }
        else{
            arr.push(new RemotePlayer(null,player.btn,mapMoveDirection(player.btn)))
        }
    });
    return arr
}
class RemotePlayer extends Player{
    constructor(board, nr, direction) {
        super(board,nr,direction);
        this.socket = null;
        this.type = "remote"
    }
    //override
    beginTurn(){
        return null
    }
    setSocket(socket){
        this.socket = socket
        this.attachListeners()
    }
    attachListeners(){
    }
}
export default class MultiPlayerGame extends Game {
    constructor(gameState,socket,settings={},emitGameState) {
        if(!gameState) throw Error("MultiplayerGame has no gameState")
        if(!socket)throw Error("MultiplayerGame has no socket")
        const players = buildPlayerArray(gameState,socket.id)
        super(gameState.board,players, settings);
        this.players = players
        this.activePlayerIndex = gameState.activePlayerIndex
        this.activePlayer = this.players[this.activePlayerIndex]
        this.gameState = gameState
        this.emitGameState = emitGameState
        this.startTurn()
    }
    //Override
    emitState(){
        this.emitGameState(buildEmittableGameState(this))
    }
    
    update(gameState){
        this.board.board = gameState.board
        this.activePlayerIndex = gameState.activePlayerIndex
        this.winner = gameState.winner
        this.activePlayer = this.players[this.activePlayerIndex]
        this.players = this.initPlayers(this.players)
        this.startTurn()
    }
}
function buildEmittableGameState(Game){
    //Takes in the game object
    let gameState = Game.gameState //current gameState
    
    //update needed values
    gameState.board = Game.board.board;
    gameState.activePlayerIndex = Game.activePlayerIndex;
    gameState.winner = Game.winner;
    return gameState
}