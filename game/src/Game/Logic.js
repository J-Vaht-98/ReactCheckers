import Move from "./Move";
export const parseDiagonal = (matrix, row, col, vDir, hDir) => {
    /*Parses a single diagonal*/
    let maxDepth = 2;
    let currentDepth = 1;
    const N = matrix.length;
    const button = Math.abs(matrix[row][col]);
    let i = vDir; //vertical direction
    let j = hDir; //horizontal direction
    while (
        row + i >= 0 &&
        row + i < N &&
        col + j < N &&
        col + j >= 0 &&
        currentDepth <= maxDepth
    ) {
        let currentY = row + i;
        let currentX = col + j;
        let currentEl = matrix[currentY][currentX];

        if (currentEl === 0 && currentDepth % 2 === 1) {
            return new Move([row, col], [currentY, currentX]);
        }
        if (currentEl === 0 && currentDepth % 2 === 0) {
            let lastElement = matrix[currentY - vDir][currentX - hDir];
            //Check if jumped over piece
            if (lastElement !== 0 && Math.abs(lastElement) !== button) {
                return new Move(
                    [row, col],
                    [currentY, currentX],
                    [currentY - vDir, currentX - hDir]
                );
            }
        }
        i += vDir;
        j += hDir;
        currentDepth++;
    }
    return null;
};
export const parseUpLeft = (matrix, row, col) => {
    return parseDiagonal(matrix, row, col, -1, -1);
};
export const parseUpRight = (matrix, row, col, depth = 2) => {
    return parseDiagonal(matrix, row, col, -1, 1);
};
export const parseDownLeft = (matrix, row, col) => {
    return parseDiagonal(matrix, row, col, 1, -1);
};
export const parseDownRight = (matrix, row, col) => {
    return parseDiagonal(matrix, row, col, 1, 1);
};
export const calculateMovedPath = (from, to) => {
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
};
const filterNonTakes = (moves) => {
    return moves.filter((move) => move.isTake === true);
};
