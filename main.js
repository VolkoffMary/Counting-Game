var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    return React.createElement(
        'h1',
        null,
        'Try to solve this puzzle:'
    );
}

function Equation(props) {
    return React.createElement(
        'h2',
        null,
        props.a,
        ' + ',
        props.b
    );
}

var Puzzle = function (_React$Component) {
    _inherits(Puzzle, _React$Component);

    function Puzzle(props) {
        _classCallCheck(this, Puzzle);

        var _this = _possibleConstructorReturn(this, (Puzzle.__proto__ || Object.getPrototypeOf(Puzzle)).call(this, props));

        _this.genRandDigit = _this.genRandDigit.bind(_this);
        _this.state = { aUnit: _this.genRandDigit(),
            aDozen: _this.genRandDigit(1, 7),
            bUnit: 0,
            bDozen: 0,
            sign: '+',
            answer: '',
            solved: false };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.assert = _this.assert.bind(_this);
        return _this;
    }

    _createClass(Puzzle, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.setState(function (state) {
                return {
                    bDozen: 10 * _this2.genRandDigit(1, 8 - _this2.state.aDozen),
                    bUnit: _this2.genRandDigit(10 - _this2.state.aUnit, 9),
                    aDozen: 10 * _this2.state.aDozen
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    { onSubmit: this.handleSubmit },
                    React.createElement(Equation, { a: this.state.aDozen + this.state.aUnit, b: this.state.bDozen + this.state.bUnit }),
                    React.createElement('input', { id: 'answer', onChange: this.handleChange, value: this.state.answer, readOnly: this.state.solved }),
                    React.createElement(
                        'button',
                        null,
                        'Check'
                    )
                ),
                React.createElement(
                    'h1',
                    { hidden: this.state.solved == false },
                    'Congratulation!'
                )
            );
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            this.setState({ answer: e.target.value });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            var _this3 = this;

            e.preventDefault();
            if (this.state.answer.length === 0 || Number(this.state.answer) === NaN) {
                return;
            }
            this.setState(function (state) {
                return {
                    //answer: '',
                    solved: _this3.assert(state)
                };
            });
        }
    }, {
        key: 'assert',
        value: function assert(state) {
            return Number(this.state.answer) == this.state.aDozen + this.state.aUnit + this.state.bDozen + this.state.bUnit;
        }
    }, {
        key: 'genRandDigit',
        value: function genRandDigit() {
            var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;

            //data correction
            start = start < 0 ? 0 : start;
            end = end < start ? start : end;

            //ceil here is used for equal chance at getting any number inbetween
            var modifier = Math.ceil(Math.random() * (end - start + 1)); // [1; end - start + 1]
            return start + modifier - 1; //[start; end]
        }
    }]);

    return Puzzle;
}(React.Component);

var Game = function (_React$Component2) {
    _inherits(Game, _React$Component2);

    function Game() {
        _classCallCheck(this, Game);

        return _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).apply(this, arguments));
    }

    _createClass(Game, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'game' },
                React.createElement(Header, null),
                React.createElement(Puzzle, null)
            );
        }
    }]);

    return Game;
}(React.Component);

ReactDOM.render(React.createElement(Game, null), document.getElementById('root'));