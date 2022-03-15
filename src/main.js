/*
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
}*/

function Header() {
    return <h1>Try to solve this puzzle:</h1>;
}

function Equation(props) {
    return <h2>{props.a} + {props.b}</h2>;
}

class Puzzle extends React.Component{
    constructor(props) {
        super(props);
        this.genRandDigit = this.genRandDigit.bind(this);
        this.state = {  aUnit: this.genRandDigit(),
                        aDozen: this.genRandDigit(1, 7),
                        bUnit: 0,
                        bDozen: 0,
                        sign: '+',
                        answer: '', 
                        solved: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.assert = this.assert.bind(this);
    }

    componentDidMount() {
        this.setState(state => ({
            bDozen: 10 * this.genRandDigit(1, 8 - this.state.aDozen),
            bUnit: this.genRandDigit(10 - this.state.aUnit, 9),
            aDozen: 10 * this.state.aDozen
        }));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Equation a={this.state.aDozen + this.state.aUnit} b={this.state.bDozen + this.state.bUnit}/>
                    <input id="answer" onChange={this.handleChange} value={this.state.answer} readOnly={this.state.solved}/>
                    <button>Check</button>
                </form>
                <h1 hidden={this.state.solved == false}>Congratulation!</h1>
            </div>
        );
    }

    handleChange(e) {
        this.setState({ answer: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.answer.length === 0 || Number(this.state.answer) === NaN) {
          return;
        }
        this.setState(state => ({
            //answer: '',
            solved: this.assert(state)
        }));
    }

    assert(state) {
        return (Number(this.state.answer) == this.state.aDozen + this.state.aUnit + this.state.bDozen + this.state.bUnit);
    }

    genRandDigit(start = 1, end = 9) {
        //data correction
        start = (start < 0) ? 0 : start;
        end = (end < start) ? start : end;
        
        //ceil here is used for equal chance at getting any number inbetween
        let modifier = Math.ceil(Math.random() * (end - start + 1)); // [1; end - start + 1]
        return start + modifier - 1; //[start; end]
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <Header />
                <Puzzle />
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
