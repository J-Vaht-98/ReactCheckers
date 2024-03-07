import { random } from "lodash";
import {
  AIMoveEngineInterface,
  AIPlayerInterface,
  MoveInterface,
} from "../types/game.types";
export default class AIMoveEngine implements AIMoveEngineInterface {
  /**
   *
   * @param {The AI player this engine finds moves for} AIPlayer
   * @param {Can range from 0 to 5 with 0 being random moves} difficulty
   */
  difficulty: string;
  player: AIPlayerInterface;
  availableMoves: MoveInterface[];
  constructor(AIPlayer: AIPlayerInterface, difficulty = "random") {
    this.difficulty = difficulty;
    this.player = AIPlayer;
    this.availableMoves = this.player.availableMoves;
  }
  update(player: AIPlayerInterface) {
    this.player = player;
    this.availableMoves = this.player.availableMoves;
  }
  getMove() {
    if (Object.keys(this.availableMoves).length !== 0) {
      let move = null;
      if (this.difficulty === "random") {
        move = this.getRandomMove();
      }
      return move;
    }
    return null;
  }
  getRandomMove() {
    const keys = Object.keys(this.availableMoves);
    const N = keys.length - 1;
    let r = random(0, N);
    const key = keys[r];
    //@ts-ignore
    const moves = this.availableMoves[key]; //array of moves
    r = random(0, moves.length - 1);
    return moves[r];
  }
}
