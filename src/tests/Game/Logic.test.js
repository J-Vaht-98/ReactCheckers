/*Test the game logic*/
import { parseButtonMoves, parsePlayerMoves } from "../../Game/Logic";
test("Player button move parsing test", () => {
    //Testing if player moving up on screen has moves
    let matrix = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    let res = parseButtonMoves(matrix, 5, 1, 2); //parse up right
    let expectedRes = [
        { isTake: false, path: [[4, 0]] },
        { isTake: false, path: [[4, 2]] },
    ];
    expect(res).toEqual(expectedRes);

    //Check if found moves go out of bounds
    matrix = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    res = parseButtonMoves(matrix, 6, 0, 2);

    expectedRes = [{ isTake: false, path: [[5, 1]] }];
    expect(res).toEqual(expectedRes);

    //Check if can move on top of button
    matrix = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    res = parseButtonMoves(matrix, 6, 2, 2);

    expectedRes = [];
    expect(res).toEqual(expectedRes);

    //Check if can take
    matrix = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    res = parseButtonMoves(matrix, 6, 2, 2);

    expectedRes = [{ isTake: true, path: [[4, 4]] }];
    expect(res).toEqual(expectedRes);

    //Check if can take multiple
    matrix = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 0, 2, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    res = parseButtonMoves(matrix, 6, 2, 2);

    expectedRes = [
        { isTake: true, path: [[4, 0]] },
        { isTake: true, path: [[4, 4]] },
    ];
    expect(res).toEqual(expectedRes);

    //Check if can take if blocked by own button
    matrix = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 2, 0, 2, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    res = parseButtonMoves(matrix, 6, 2, 2);

    expectedRes = [{ isTake: true, path: [[4, 0]] }];
    expect(res).toEqual(expectedRes);

    //Check if king can move in any direction
    matrix = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, -1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    res = parseButtonMoves(matrix, 5, 3, 2);

    expectedRes = [
        { isTake: false, path: [[4, 2]] },
        { isTake: false, path: [[6, 4]] },
    ];
    expect(res).toEqual(expectedRes);

    //Check if king can take in all directions
    matrix = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 2, 0, 0, 0],
        [0, 0, 0, -1, 0, 0, 0, 0],
        [0, 0, 2, 0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    res = parseButtonMoves(matrix, 5, 3, 2);

    expectedRes = [
        { isTake: true, path: [[3, 1]] },
        { isTake: true, path: [[3, 5]] },
        { isTake: true, path: [[7, 1]] },
        { isTake: true, path: [[7, 5]] },
    ];
    expect(res).toEqual(expectedRes);
    //Check if downward moving player has moves
    matrix = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 2, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    res = parseButtonMoves(matrix, 5, 3, 1);

    expectedRes = [
        { isTake: false, path: [[6, 2]] },
        { isTake: false, path: [[6, 4]] },
    ];
    expect(res).toEqual(expectedRes);

    matrix = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 2, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    res = parseButtonMoves(matrix, 5, 3, 1);

    expectedRes = [{ isTake: true, path: [[7, 5]] }];
    expect(res).toEqual(expectedRes);
});
test("Calculating all of the players moves", () => {
    let m, res, expectedRes;

    //Test for forced moves
    m = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 0, 0],
        [1, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    res = parsePlayerMoves(m, 1, 2); //pos=[5,2]
    expectedRes = {
        52: [{ isTake: true, path: [[3, 4]] }],
    };
    expect(res).toEqual(expectedRes);

    //Test for forced moves
    m = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 0, 0, 0],
        [0, 1, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    res = parsePlayerMoves(m, 1, 2); //pos=[5,3]
    expectedRes = {
        53: [{ isTake: true, path: [[3, 5]] }],
    };
    expect(res).toEqual(expectedRes);
    
    //Can take two separate pieces if available
    m = [
        [0, 0, 0, 0, 0, 0, 0, 0], //0
        [0, 0, 0, 0, 0, 0, 0, 0], //1
        [0, 0, 0, 0, 0, 0, 0, 0], //2
        [0, 0, 0, 0, 0, 0, 0, 0], //3
        [0, 0, 2, 0, 2, 0, 0, 0], //4
        [0, 1, 0, 1, 0, 0, 0, 0], //5
        [0, 0, 0, 0, 0, 0, 0, 0], //6
        [0, 0, 0, 0, 0, 0, 0, 0], //7
    //   0  1  2  3  4  5  6  7
    ];
    res = parsePlayerMoves(m, 1, 2); //pos=[5,3]
    expectedRes = {
        51: [{ isTake: true, path: [[3, 3]] }],
        53: [
            { isTake: true, path: [[3, 1]] },
            { isTake: true, path: [[3, 5]] }
        ],
    };
    expect(res).toEqual(expectedRes);
    
    //Returns empty array if no moves available
       m = [
        [2, 0, 2, 0, 2, 0, 0, 0], //0
        [0, 1, 0, 1, 0, 0, 0, 0], //1
        [0, 0, 0, 0, 0, 0, 0, 0], //2
        [0, 0, 0, 0, 0, 0, 0, 0], //3
        [0, 0, 0, 0, 0, 0, 0, 0], //4
        [0, 0, 0, 0, 0, 0, 0, 0], //5
        [0, 0, 0, 0, 0, 0, 0, 0], //6
        [0, 0, 0, 0, 0, 0, 0, 0], //7
    //   0  1  2  3  4  5  6  7
    ];
    res = parsePlayerMoves(m, 1, 2); //pos=[5,3]
    expectedRes = {
        
    };
    expect(res).toEqual(expectedRes);
});
