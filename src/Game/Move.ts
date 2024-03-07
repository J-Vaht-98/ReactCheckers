type posObj = { row: number; col: number };
type posArr = [number, number];
export default class Move {
  from: undefined | posObj;
  to: undefined | posObj;
  take: undefined | posObj;
  constructor(from?: posArr, to?: posArr, take?: undefined | posArr) {
    if (!from && !to) {
      this.from = undefined;
      this.to = undefined;
      this.take = undefined;
    } else {
      if (from)
        this.from = {
          row: from[0],
          col: from[1],
        };
      if (to)
        this.to = {
          row: to[0],
          col: to[1],
        };
      if (take && take.length > 0) {
        this.take = {
          row: take[0],
          col: take[1],
        };
      }
    }
  }
  setFrom(from: posArr) {
    this.from = {
      row: from[0],
      col: from[1],
    };
  }
  setTo(to: posArr) {
    if (this.from && this.from.row === to[0] && this.from.col === to[1])
      this.to = undefined;
    else {
      this.to = {
        row: to[0],
        col: to[1],
      };
    }
  }
  getFrom() {
    return this.from;
  }
  getTo() {
    return this.to;
  }
}
