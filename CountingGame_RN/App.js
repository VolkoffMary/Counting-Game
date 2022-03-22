import React, { useState } from "react";
import { Button, TextInput, Text, View } from "react-native";

function Equation(props) {
  return <Text>{props.a} {props.sign} {props.b} = </Text>;
}

function Result(props) {
  if (props.msgFlag === true) {
      return <Text>Congrats!</Text>;
  }
  else if (props.msgFlag === false) {
      return <Text>Try again!</Text>;
  }
  else return <></>;
}

function assert(puzzle, answer) {
  if (puzzle.sign === '+')
  return (Number(answer) == puzzle.a + puzzle.b);
else
  return (Number(answer) == puzzle.a - puzzle.b);
}

const Puzzle = () => {
  const [answer, setAnswer] = useState("");
  const [puzzle, setPuzzle] = useState(genRandPuzzle())
  const [solved, setSolved] = useState(undefined);

  return (
          <View>
            <Equation a={puzzle.a} b={puzzle.b} sign={puzzle.sign}/>
            <TextInput id="answer" onChangeText={newText => setAnswer(newText)} defaultValue={answer} readOnly={solved === true}/>
            <Button onPress={() => setSolved(assert(puzzle, answer))} title={"Check"}/>
            <Result msgFlag={solved}/>
            <Button onPress={() => {setPuzzle(genRandPuzzle()), setSolved(undefined), setAnswer("")}} title={"Go to next puzzle"}/>
          </View>
  );
};

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
              puzzle = add;
              break;
      }
      let p = puzzle();
      let result ={
        a: p.aDozen + p.aUnit,
        b: p.bDozen + p.bUnit,
        sign: p.sign
      }
      return result;
}
  
function add() {
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
      
      return params;
}
  
function subtractNoJump() {
      let params = {
          aUnit: genRandDigit(0, 9), 
          bUnit: 0, 
          aDozen: 10 * genRandDigit(1, 9), 
          bDozen: 0,
          sign: '-'
      }
      params.bUnit = genRandDigit(0, params.aUnit);
  
      return params;
  }
  
function subtractWithJump() {
      let params = {
          aUnit: genRandDigit(0, 8), 
          bUnit: 0, 
          aDozen: 10 * genRandDigit(1, 9), 
          bDozen: 0,
          sign: '-'
      }
      params.bUnit = genRandDigit(params.aUnit + 1, 9);
  
      return params;
}

export default function App() {
  return (
    <View>
      <Text>Try to solve this puzzle:</Text>
      <Puzzle />
    </View>
  );
}