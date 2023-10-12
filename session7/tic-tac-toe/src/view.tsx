import * as React from 'react';
import { Game } from './model'
import { Action } from './reducer'
import './View.css';

const Message = ({status: {winState, inTurn, stalemate}}: {status: Game}) => {
  if (winState)
    return <p>{winState.winner} won!</p>
  else if (stalemate)
    return <p>Stalemate!</p>
  else    
    return <p>Your turn, {inTurn}</p>
}        

const Board = ({game, dispatch}: { game: Game, dispatch: (_: Action) => void }) =>
  <table>
      <tbody>
          {game.board.map((row, x) =>
          <tr key={x}>{row.map ( (tile, y) => 
              <td key={x+''+y}
                  className={tile || 'blank'}
                  onClick= {() => dispatch({type: 'make-move', move: { x, y, player: game.inTurn } })}/>)
              }</tr>
          )}
      </tbody>
  </table>

const View = (state: Game, dispatch: (_:Action) => void) => 
  <div> 
    <h1>Tic-tac-toe</h1>
      <Message status = {state} />
      <Board game = {state} dispatch = {dispatch} />
    <button id = 'reset' onClick = {() => dispatch({type: 'reset'})}>
        Reset
    </button>
  </div>

export default View