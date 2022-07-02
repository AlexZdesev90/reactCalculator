import React from 'react';
import { ACTIONS } from './App.js';

const Operation = ({oper, dispatch}) => {
  return (
    <button onClick={() => dispatch({ type: ACTIONS.SELECT_OPERATION, payload: { oper } })}>
          {oper}
      </button>
  )
}

export default Operation;
