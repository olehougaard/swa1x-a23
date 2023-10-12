import * as React from 'react';
import { useReducer, useContext, createContext, useEffect } from 'react'
import { createGame, Game } from './model'
import { reduce, Action } from './reducer'
import './View.css';

const Message = () => {
  const { game }: { game: Game } = useContext(AppContext)
  
  const message = ({winState, inTurn, stalemate}: Game) => {
    if (winState)
      return `${winState.winner} won!`
    else if (stalemate)
      return 'Stalemate!'
    else    
      return `Your turn, ${inTurn}`
  }  

  useEffect(() => {document.title = message(game)})

  return <h2>{message(game)}</h2>
}        

const Board = () => {
  const { game, dispatch }: { game: Game, dispatch: (_: Action) => void } = useContext(AppContext)
  return <table>
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
}

const AppContext = createContext(null)

const App = () => {
  const [game, dispatch] = useReducer(reduce, createGame())
  return <AppContext.Provider value = {{ game, dispatch }}>
    <div> 
      <h1>Tic-tac-toe</h1>
        <Message/>
        <Board/>
      <button id = 'reset' onClick = {() => dispatch({type: 'reset'})}>
          Reset
      </button>
    </div>
  </AppContext.Provider>
}

export default () => <App/>
