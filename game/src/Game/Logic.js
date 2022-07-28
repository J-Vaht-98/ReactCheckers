const parseDiagonal = (matrix,row,col,vDir, hDir,opponent,depth=2)=>{
    /*Parse diagonals for a point in NxN-dimension matrix */
    /*Returns an array of the positions  parsed in order, not including the start (can be empty)*/
    
    const N = matrix.length
    let path = []
    let i = vDir
    let j = hDir
    let piecesInPath = ''
    let isTake = false
    while(row + i >= 0 && row + i < N && col + j < N && col + j >= 0 && depth > 0){
        let currentY = row + i
        let currentX = col + j
        const el = Math.abs(matrix[currentY][currentX])
        piecesInPath += el
        if(piecesInPath === opponent + '0'){
            if(path.length > 0) path = []
            isTake = true
            path.push([currentY,currentX])
        }
        if(piecesInPath === '0')
            path.push([currentY,currentX])
        i += vDir
        j += hDir
        depth--
    }
    return {
        isTake:isTake,
        path:path
    }
}
const parseUpLeft = (matrix,row,col,opponent,depth=2) =>{
    return parseDiagonal(matrix,row,col,-1,-1,opponent,depth)
 }
const parseUpRight = (matrix,row,col,opponent,depth=2) =>{
return parseDiagonal(matrix,row,col,-1,1,opponent,depth)
}
const parseDownLeft = (matrix,row,col,opponent,depth=2) =>{
return parseDiagonal(matrix,row,col,1,-1,opponent,depth)
}
const parseDownRight = (matrix,row,col,opponent,depth=2) =>{
return parseDiagonal(matrix,row,col,1,1,opponent,depth)
}
const parseButtonMoves = (matrix,row,col,opponent)=>{
    let player= matrix[row][col]
    const isKing = player < 0
    player = Math.abs(player)
    let moves = []
    
    if(isKing || player === 1)
        moves.push(parseUpLeft(matrix,row,col,opponent),parseUpRight(matrix,row,col,opponent))
    if(isKing || player === 2)
        moves.push(parseDownLeft(matrix,row,col,opponent),parseDownRight(matrix,row,col,opponent))
    const takes = filterNonTakes(moves)
    if(takes.length > 0){
        return takes
    }
    moves = moves.filter(move => move.path.length > 0)
    return moves
}
const parsePlayerMoves = (matrix,player,opponent)=>{
    /*Returns an array of buttons that have to take on this turn*/
    let forcedMoves = {}
    let moves = {}
    for(let i in matrix)
        for(let j in matrix){
            const el = Math.abs(matrix[i][j])
            if(el === player){
                i = parseInt(i)
                j = parseInt(j)
                let btnMoves = parseButtonMoves(matrix,i,j,opponent)
                
                if(btnMoves.length > 0){
                    moves[`${i}${j}`] = btnMoves
                } 
                for(let k = 0;k<btnMoves.length;k++){
                    const move = btnMoves[k]
                    if(move.isTake){
                        forcedMoves[`${i}${j}`] = btnMoves
                    }
                }
            }
        }
    if(Object.keys(forcedMoves).length > 0){
        return forcedMoves
    }
    return moves
    
    
}
const calculateMovedPath = (from,to)=>{
    //Gets the moved path aka if any pieces were jumped over
    //Excludes the start and stop squares
    // Returns an array of jumped over squares, or an empty one if none were jumped
    const startX = from[1];
    const startY = from[0];
    const stopX = to[1];
    const stopY = to[0];

    let vertDirection = stopY - startY;
    let horDirection = stopX - startX;

    let path = [];
    if (vertDirection > 0 && horDirection > 0) {
        //down right on screen
        //vertDirection and horDirection are equal because you can only move diagonally

        vertDirection--;
        horDirection--; // this excludes the starting square

        //set the while loop to >= instead of > to include stop square
        while (vertDirection > 0 || horDirection > 0) {
            path.push([stopY - vertDirection, stopX - horDirection]);
            vertDirection--;
            horDirection--;
        }
    } else if (vertDirection > 0 && horDirection < 0) {
        //down left on screen
        vertDirection--;
        horDirection++;
        while (vertDirection > 0 || horDirection < 0) {
            path.push([stopY - vertDirection, stopX - horDirection]);
            horDirection++;
            vertDirection--;
        }
    } else if (vertDirection < 0 && horDirection > 0) {
        //up right on screen
        vertDirection++;
        horDirection--;
        while (vertDirection < 0 || horDirection > 0) {
            path.push([stopY - vertDirection, stopX - horDirection]);
            horDirection--;
            vertDirection++;
        }
    } else if (vertDirection < 0 && horDirection < 0) {
        //up left on screen
        vertDirection++;
        horDirection++;
        while (vertDirection < 0 || horDirection < 0) {
            path.push([stopY - vertDirection, stopX - horDirection]);
            horDirection++;
            vertDirection++;
        }
    }
    return path;
}
const filterNonTakes = (moves)=>{
    return moves.filter( move => move.isTake === true)
}
export {parseButtonMoves,parsePlayerMoves,calculateMovedPath}

