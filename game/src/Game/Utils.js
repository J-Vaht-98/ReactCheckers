export function countPlayerBtns(board,player) {
    let buttonCount = 0
    for(let i in board)
        for(let j in board[i]){
            if(Math.abs(board[i][j]) === player)
                buttonCount++
        }
    return buttonCount
}