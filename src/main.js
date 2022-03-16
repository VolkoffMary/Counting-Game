import ReactDOM from 'react-dom';
import React from 'react';

function Header() {
    return <h1>Try to solve this puzzle:</h1>;
}

function Equation(props) {
    return <h2>{props.a} {props.sign} {props.b} = </h2>;
}

class Puzzle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {  a: 0,
                        b: 0,
                        sign: '+',
                        answer: '', 
                        solved: false };

        this.genRandDigit = this.genRandDigit.bind(this);
        this.genRandPuzzle = this.genRandPuzzle.bind(this);                
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.assert = this.assert.bind(this);
        this.add = this.add.bind(this);
        this.subtractNoJump = this.subtractNoJump.bind(this);
        this.subtractWithJump = this.subtractWithJump.bind(this);
    }

    componentDidMount() {
        this.genRandPuzzle();
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

    genRandDigit(start = 1, end = 9) {
        //data correction
        start = (start < 0) ? 0 : start;
        end = (end < start) ? start : end;
        
        //ceil here is used for equal chance at getting any number inbetween
        let modifier = Math.ceil(Math.random() * (end - start + 1)); // [1; end - start + 1]
        return start + modifier - 1; //[start; end]
    }

    genRandPuzzle() {
        let puzzle;
        switch(this.genRandDigit(1, 3)) {
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
        puzzle();
        return;
    }

    add() {
        let aUnit, bUnit, aDozen, bDozen, answer;
        aUnit = this.genRandDigit();
        aDozen = this.genRandDigit(1, 7);
        bUnit = this.genRandDigit(10 - aUnit, 9);
        bDozen = 10 * this.genRandDigit(1, 8 - aDozen);
        aDozen = 10 * aDozen;

        this.setState(state => ({
            a: aUnit + aDozen,
            b: bUnit + bDozen,
            sign: '+'
        }));
    }

    subtractNoJump() {
        let aUnit, bUnit, aDozen, answer;
        aUnit = this.genRandDigit(0, 9);
        aDozen = 10 * this.genRandDigit(1, 9);
        bUnit = this.genRandDigit(0, aUnit);

        this.setState(state => ({
            a: aUnit + aDozen,
            b: bUnit,
            sign: '-'
        }));
    }

    subtractWithJump() {
        let aUnit, bUnit, aDozen, answer;
        aUnit = this.genRandDigit(0, 8);
        aDozen = 10 * this.genRandDigit(1, 9);
        bUnit = this.genRandDigit(aUnit + 1, 9);

        this.setState(state => ({
            a: aUnit + aDozen,
            b: bUnit,
            sign: '-'
        }));
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