
function add() {
    //create new numbers for this equation
    let aUnit, bUnit, aDozen, bDozen, answer;
    aUnit = genRandDigit();
    aDozen = 10 * genRandDigit(1, 7);
    bUnit = genRandDigit(10 - aUnit, 9);
    bDozen = 10 * genRandDigit(1, 8 - aDozen);

    let repeatPuzzle;
    do { 
        repeatPuzzle = false;
        answer = prompt((aUnit + aDozen) + ' + ' + (bUnit + bDozen) + ' = ?\nWrite your answer:', '');
        if (aUnit + bUnit + aDozen + bDozen == answer)
            alert('Good job! :)');
        else {
            repeatPuzzle = confirm('Not quite! try again?');
        }
    } while (repeatPuzzle);

}

function subtractNoJump() {
    //create new numbers for this equation
    let aUnit, bUnit, aDozen, answer;
    aUnit = genRandDigit(0, 9);
    aDozen = 10 * genRandDigit(1, 9);
    bUnit = genRandDigit(0, aUnit);

    let repeatPuzzle;
    do { 
        repeatPuzzle = false;
        answer = prompt((aUnit + aDozen) + ' - ' + (bUnit) + ' = ?\nWrite your answer:', '');
        if (aUnit - bUnit + aDozen == answer)
            alert('Good job! :)');
        else {
            repeatPuzzle = confirm('Not quite! try again?');
        }
    } while (repeatPuzzle);
}


function subtractWithJump() {
    //create new numbers for this equation
    let aUnit, bUnit, aDozen, answer;
    aUnit = genRandDigit(0, 8);
    aDozen = 10 * genRandDigit(1, 9);
    bUnit = genRandDigit(aUnit + 1, 9);

    let repeatPuzzle;
    do { 
        repeatPuzzle = false;
        answer = prompt((aUnit + aDozen) + ' - ' + (bUnit) + ' = ?\nWrite your answer:', '');
        if (aUnit - bUnit + aDozen == answer)
            alert('Good job! :)');
        else {
            repeatPuzzle = confirm('Not quite! try again?');
        }
    } while (repeatPuzzle);
}

function genRandDigit(start = 1, end = 9) {
    //data correction
    start = (start < 0) ? 0 : start;
    end = (end < start) ? start : end;
    
    //ceil here is used for equal chance at getting any number inbetween
    let modifier = Math.ceil(Math.random() * (end - start + 1)); // [1; end - start + 1]
    return start + modifier - 1; //[start; end]
}

function genRandPuzzle() {
    let puzzle;
    switch(genRandDigit(1, 3)) {
        case 1:
            puzzle = add;
            break;
        case 2:
            puzzle = subtractNoJump;
            break;
        case 3:
            puzzle = subtractWithJump;
            break;
        default:
            puzzle = function() { alert('Something is wrong, tell Mary to test properly :)'); };
            break;
    }
    return puzzle;
}

function main() {
    let repeatPuzzle, puzzle;
    do { 
        repeatPuzzle = false;
        puzzle = genRandPuzzle();
        puzzle();
        repeatPuzzle = confirm('Do you want another puzzle?');
    } while (repeatPuzzle);
}

main();