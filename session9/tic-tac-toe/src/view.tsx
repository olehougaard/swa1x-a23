import { useState, useEffect } from 'react';
import * as React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux'
import { otherPlayer } from './model';
import { State, Dispatch, gameSlice } from './store';
import { concedeThunk, initThunk, joinGameThunk, makeMoveThunk, newGameThunk, gamesListenerThunk, leaveGameThunk } from './thunks';
import { StoreType } from './store';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import './view.css';

const Board = ({enabled}: {enabled: boolean}) => {
  const gameState = useSelector((s: State) => s.game)
  const {board} = gameState.game
  const dispatch: Dispatch = useDispatch()
  return (
    <table>
      <tbody>
        { board.map((row, x) =>
            <tr key={x}>{ row.map((tile, y) => {
              if (tile)
                return <td key = {x + '' + y} className = { tile }/>
              else if (enabled)
                return <td key = {x + '' + y} className = {'blank'} onClick = {() => dispatch(makeMoveThunk(x, y))}/>
              else
              return <td key = {x + '' + y} className = {'inert'}/>
            })
            }</tr>
        )}
      </tbody>
    </table>
  )
}

const Lobby = () => {
  useEffect(() => {
    document.title = 'Tic-tac-toe - Lobby'
  })

  const [ name, setName ] = useState('Name')
  const games = useSelector((s: State) => s.lobby)
  const dispatch: Dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div>
      <h1>Lobby</h1>
      {
        games.map(({gameNumber, gameName}) => 
          <div key={gameNumber}>
            {gameName}
            <button className = 'join' onClick = {() => dispatch(joinGameThunk(gameNumber, navigate))}>
                Join
            </button>
          </div>)
      }
      <input type='text' onChange={e => setName(e.target.value)} value={name}/>
      <button id = 'new' onClick={() => dispatch(newGameThunk(navigate, name))}>
          New game
      </button>
    </div>
  )
}

const WaitingForGame = () => {
  useEffect(() => {
    document.title = 'Tic-tac-toe - Waiting for other player...'
  })
  return <div>
    <h1>Waiting for other player...</h1>
  </div>
}

const Active = () => {
  const {player} = useSelector((s: State) => s.game)
  const dispatch: Dispatch = useDispatch()
  return <div>
    <h2>Your turn, { player }</h2>
    <Board enabled = {true}/>
    <button onClick = {() => dispatch(concedeThunk)}>Concede game</button>
  </div>
}

const WaitingForTurn = () => {
  const {player} = useSelector((s: State) => s.game)
  return <div>
    <h2>Waiting for { otherPlayer(player) }</h2>
    <Board enabled = {false}/>
  </div>
}

const GameOver = () => {
  const {game} = useSelector((s: State) => s.game)
  useEffect(() => {
    document.title = `Tic-tac-toe - ${game.gameName} complete`
  })
  const dispatch: Dispatch = useDispatch()
  const navigate = useNavigate();
  return <div>
    <h1>{game.gameName} complete</h1>
    <h2>{game.stalemate? 'Stalemate' : game.winState.winner + ' won'}</h2>
    <Board enabled = {false}/>
    <button onClick = {() => dispatch(leaveGameThunk(navigate))}>Return to lobby</button>
  </div>
}

const Playing = () => {
  const {game, player} = useSelector((s: State) => s.game)
  useEffect(() => {
    document.title = `Tic-tac-toe - Playing ${game.gameName}`
  })
  return <div>
    <h1>Playing {game.gameName}</h1>
    {game.inTurn === player? <Active/> : <WaitingForTurn/>}
  </div>
}

const GamePage = () => {
  const {game} = useSelector((s: State) => s.game)
  if (game.winState || game.stalemate)
    return <GameOver/>
  else
    return <Playing/>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Lobby/>
  },
  {
    path: "waiting",
    element: <WaitingForGame/>
  },
  {
    path: "playing",
    element: <GamePage/>
  },
])

export const View = ({store}: {store: StoreType}) => {
  useEffect(() => {
    store.dispatch(initThunk)
    store.dispatch(gamesListenerThunk)
  }, [])
  return <Provider store={store}>
      <RouterProvider router={router}/>
  </Provider>
}
