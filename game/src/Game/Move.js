export default class Move {
    constructor(from, to, take = []) {
        if(!from && !to){
            this.from = undefined
            this.to = undefined
            this.take = undefined
        }
        else{
            this.from = {
                row: from[0],
                col: from[1],
            };
            this.to = {
                row: to[0],
                col: to[1],
            };
            if (take.length > 0) {
                this.take = {
                    row: take[0],
                    col: take[1],
                };
            }
        }
    }
    setFrom(from){
        this.from = {
            row: from[0],
            col: from[1],
        };
    }
    setTo(to){
        if(this.from.row === to[0] && this.from.col === to[1])
            this.to = undefined
        else{
            this.to = {
                row: to[0],
                col: to[1],
            };
        }
    }
    getFrom(){
        return this.from
    }
    getTo(){
        return this.to
    }
}