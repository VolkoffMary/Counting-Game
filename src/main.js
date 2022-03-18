import ReactDOM from 'react-dom';
import React from 'react';

function Header() {
    return <h1>Try to solve this puzzle:</h1>;
}

function Equation(props) {
    return <h2>{props.a} {props.sign} {props.b} = </h2>;
}

function Navigation(props) {
    return (
        <form onSubmit={genRandPuzzle(props.updater)}>
            <button>Go to next puzzle</button>
        </form>
    );
} 

class Puzzle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {  a: props.a,
                        b: props.b,
                        sign: props.sign,
                        answer: '', 
                        solved: false };
                
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.assert = this.assert.bind(this);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Equation a={this.state.a} b={this.state.b} sign={this.state.sign}/>
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

        this.state = {
            a: 0,
            b: 0,
            sign: '+'
        }
    }

    setPuzzle = params => { 
        this.setState({
            a: params.aUnit + params.aDozen,
            b: params.bUnit + params.bDozen,
            sign: params.sign
        });
    }

    render() {

        return (
            <div className="game">
                <Header />
                <Puzzle state={this.state}/>
                <Navigation updater={this.setPuzzle}/>
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

function genRandPuzzle(updater) {
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
            puzzle = add;
            break;
    }
    puzzle(updater);
    return;
}

function add(updater) {
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

function subtractNoJump(updater) {
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

function subtractWithJump(updater) {
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


ReactDOM.render(
    <Game />,
    document.getElementById('root')
);