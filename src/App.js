import './App.css';
import { useReducer } from 'react';
import DigitButton from './DigitButton';
import Operation from './ButtonOperation';

export const ACTIONS = {
  ADD_DIGIT: "ADD-DIGIT",
  SELECT_OPERATION: "SELECT-OPERATION",
  CLEAR: "CLEAR",
  DELETE_LAST: "DELETE-LAST",
  EQUALS: "EQUALS",
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state, current: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "." && state.current.includes(".")) {
        return state;
      }
      if (payload.digit === "0" && state.current === "0") {
        return state;
      }
      return {
        ...state, current: `${state.current || ""}${payload.digit}`,
      }
    case ACTIONS.CLEAR:
      return {}
  
    case ACTIONS.SELECT_OPERATION:
      if (state.current == null && state.prev == null) {
        return state;
      }
      if (state.current == null) {
        return {
          ...state, operation: payload.oper,
        }
      }
      if (state.prev == null) {
        return {
          ...state,
          prev: state.current,
          current: null,
          operation: payload.oper,
        }
      }
      return {
        ...state,
        prev: evalF(state),
        current: null,
        operation: payload.oper,
      }
    case ACTIONS.DELETE_LAST:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          current: null,
        }
      }
      if (state.current === null) {
        return state;
      }
      if (state.current.length === 1) {
        return { ...state, current: null }
      }
      return {
        ...state, current: state.current.slice(0, -1)
      }
    case ACTIONS.EQUALS:
      if (state.prev === null || state.operation === null || state.current === null) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        prev: null,
        operation: null,
        current: evalF(state),
      }
  }
}

const evalF = ({ prev, current, operation }) => {
 const p = parseFloat(prev);
 const c = parseFloat(current);
//  if(isNaN(p) || isNaN(c)) return ""
  let res = "";
  switch (operation) {
    case "+":
      res = p + c;
      break
    case "-":
      res =  p - c;
      break
    case "*":
      res = p * c;
      break
    case "/":
      res = p / c;
      break
  }
  return res.toString();
}


function App() {
  const [{ prev, current, operation }, dispatch] = useReducer(reducer, {});
  console.log(prev, current, operation)
  return (
    <div className="App">
 <div className="output">
        <div className="prev">{prev}{operation}</div>
        <div className="curr">{current}</div>
 </div>
      <button className="width_two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <Operation oper={"/"} dispatch={dispatch}/>
      <Operation oper={"*"} dispatch={dispatch}/>
      <DigitButton digit={"1"} dispatch={dispatch}/>
      <DigitButton digit={"2"} dispatch={dispatch}/>
      <DigitButton digit={"3"} dispatch={dispatch}/>
      <Operation oper={"+"} dispatch={dispatch}/>
      <DigitButton digit={"4"} dispatch={dispatch}/>
      <DigitButton digit={"5"} dispatch={dispatch}/>
      <DigitButton digit={"6"} dispatch={dispatch}/>
      <Operation oper={"-"} dispatch={dispatch}/>
      <DigitButton digit={"7"} dispatch={dispatch}/>
      <DigitButton digit={"8"} dispatch={dispatch}/>
      <DigitButton digit={"9"} dispatch={dispatch}/>
      <button onClick={() => dispatch({type: ACTIONS.DELETE_LAST})}>DEL</button>
      <DigitButton digit={"."} dispatch={dispatch}/>
      <DigitButton digit={"0"} dispatch={dispatch}/>
      <button className="width_three" onClick={() => dispatch({type: ACTIONS.EQUALS})}>=</button>
      <div className="author">author: ZDESEV</div>
    </div>
  );
}

export default App;
