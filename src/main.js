import ReactDOM from 'react-dom';
import React from 'react';

function Header() {
    return <h1>Try to solve this puzzle:</h1>;
}

function Equation(props) {
    return <h2>{props.a} {props.sign} {props.b} = </h2>;
}

function Result(props) {
    if (props.msgFlag === true) {
        return <h1>Congrats!</h1>;
    }
    else if (props.msgFlag === false) {
        return <h1>Try again!</h1>;
    }
    else return <div id="noTextResult"/>;
}

class Puzzle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            a: 0,
            b: 0,
            sign: '+',
            answer: '', 
            solved: undefined
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setPuzzle = this.setPuzzle.bind(this);
        this.assert = this.assert.bind(this);
        this.newPuzzle = this.newPuzzle.bind(this);
    }

    componentDidMount() {
        let puzzle = new RandPuzzle();
        puzzle.genRandPuzzle(this.setPuzzle);
    }

    newPuzzle() {
        this.setState({
            solved: undefined,
            answer: ''
        });
        let puzzle = new RandPuzzle();
        puzzle.genRandPuzzle(this.setPuzzle);
    }

    setPuzzle(params) { 
        this.setState({
            a: params.aUnit + params.aDozen,
            b: params.bUnit + params.bDozen,
            sign: params.sign
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Equation a={this.state.a} b={this.state.b} sign={this.state.sign}/>
                    <input id="answer" onChange={this.handleChange} value={this.state.answer} readOnly={this.state.solved}/>
                    <button>Check</button>
                </form>
                <Result msgFlag={this.state.solved}/>
                <button onClick={this.newPuzzle}>Go to next puzzle</button>
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
        if (state.sign === '+')
            return (Number(state.answer) == state.a + state.b);
        else
            return (Number(state.answer) == state.a - state.b);
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="game">
                <Header />
                <Puzzle />
            </div>
        );
    }
}

function genRandDigit(start = 1, end = 9) {
    //data correction
    start = (start < 0) ? 0 : start;
    end = (end < start) ? start : end;
    
    //ceil here is used for equal chance at getting any number inbetween
    let modifier = Math.ceil(Math.random() * (end - start + 1)); // [1; end - start + 1]
    return start + modifier - 1; //[start; end]
}

class RandPuzzle {

    constructor() {
        this.genRandPuzzle = this.genRandPuzzle.bind(this);
        this.add = this.add.bind(this);
        this.subtractNoJump = this.subtractNoJump.bind(this);
        this.subtractWithJump = this.subtractWithJump.bind(this);
    }
  
    genRandPuzzle(updater) {
        let puzzle;
        switch(genRandDigit(1, 3)) {
            case 1:
                puzzle = this.add;
                break;
            case 2:
                puzzle = this.subtractNoJump;
                break;
            case 3:
                puzzle = this.subtractWithJump;
                break;
            default:
                puzzle = this.add;
                break;
        }
        puzzle(updater);
        return;
    }
    
    add(updater) {
        let params = {
            aUnit: genRandDigit(), 
            bUnit: 0, 
            aDozen: genRandDigit(1, 7), 
            bDozen: 0,
            sign: '+'
        }
        params.bUnit = genRandDigit(10 - params.aUnit, 9);
        params.bDozen = 10 * genRandDigit(1, 8 - params.aDozen);
        params.aDozen = 10 * params.aDozen;
        
        updater(params);
        return;
    }
    
    subtractNoJump(updater) {
        let params = {
            aUnit: genRandDigit(0, 9), 
            bUnit: 0, 
            aDozen: 10 * genRandDigit(1, 9), 
            bDozen: 0,
            sign: '-'
        }
        params.bUnit = genRandDigit(0, params.aUnit);
    
        updater(params);
        return;
    }
    
    subtractWithJump(updater) {
        let params = {
            aUnit: genRandDigit(0, 8), 
            bUnit: 0, 
            aDozen: 10 * genRandDigit(1, 9), 
            bDozen: 0,
            sign: '-'
        }
        params.bUnit = genRandDigit(params.aUnit + 1, 9);
    
        updater(params);
        return;
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);