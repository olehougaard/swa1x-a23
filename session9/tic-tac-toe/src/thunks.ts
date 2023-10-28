import { Game, Move, otherPlayer, Player } from "./model";
import { Dispatch, GetState, lobbySlice, gameSlice } from "./store"
import { NavigateFunction } from 'react-router'
import * as api from "./api";

type Thunk = (dispatch: Dispatch, getState: GetState) => Promise<void>

export function initThunk(dispatch: Dispatch, _: GetState) {
    api.readGamesList()
        .then(lobbySlice.actions.init)
        .then(dispatch)
        .catch(console.error)
}

export function leaveGameThunk(navigate: NavigateFunction) {
    return async function (dispatch: Dispatch, _: GetState) {
        navigate("/")
        dispatch(gameSlice.actions.leaveGame())
        const games = await api.readGamesList()
        dispatch(lobbySlice.actions.init(games))
    }
}

export async function gamesListenerThunk(dispatch: Dispatch, getState: GetState) {
    const ws = new WebSocket('ws://localhost:9090/publish')
    ws.onmessage = ({data}) => {
        const newGame: Game = JSON.parse(data)
        const games = getState().lobby
        dispatch(lobbySlice.actions.init([...games, newGame]))
    }    
    ws.onopen = () => {
        ws.send(JSON.stringify({type: 'subscribe', key: 'new_game'}))
    }    
}    

function waitForOtherPlayer(game: Game, dispatch: Dispatch, getState: GetState, navigate: NavigateFunction) {
    const ws = new WebSocket('ws://localhost:9090/publish')
    ws.onmessage = ({data}) => {
        const newGame: Game = JSON.parse(data)
        const player = getState().game.player;
        dispatch(gameSlice.actions.setGame({player, game: newGame}))
        waitForMove(game.gameNumber, player, dispatch, getState)
        navigate("/playing")
    }
    ws.onopen = () => {
        ws.send(JSON.stringify({type: 'subscribe', key: 'game_' + game.gameNumber}))
    }
}

export function newGameThunk(navigate: NavigateFunction, name?: string) {
    return async function(dispatch: Dispatch, getState: GetState) {
        const game = await api.createGame(name)
        dispatch(gameSlice.actions.newGame({player: 'X', game}))
        waitForOtherPlayer(game, dispatch, getState, navigate)
        navigate('/waiting')
    }
}

type MoveMessage = 
    { type: 'move', move: Move, inTurn: Player, winState: { winner: Player, row?: any }, stalemate: boolean }
  | { type: 'conceded'} & Game

function waitForMove(gameNumber: number, expectedPlayer: Player, dispatch: Dispatch, getState: GetState) {
    const ws = new WebSocket('ws://localhost:9090/publish')
    ws.onmessage = ({data}) => {
        const message: MoveMessage = JSON.parse(data)
        if (message.type === 'move') {
            const { move, inTurn, winState, stalemate } = message
            if (inTurn === expectedPlayer)
                dispatch(gameSlice.actions.makeMove({ move, inTurn, winState, stalemate }))
        } else {
            const game = message
            const player = getState().game.player;
            dispatch(gameSlice.actions.setGame({player, game}))
        }
    }
    ws.onopen = () => {
        ws.send(JSON.stringify({type: 'subscribe', key: 'move_' + gameNumber}))
    }
}


export function joinGameThunk(gameNumber: number, navigate: NavigateFunction): Thunk {
    return async function(dispatch: Dispatch, getState: GetState) {
        const game: Game = await api.joinGame(gameNumber)
        dispatch(gameSlice.actions.setGame({player: 'O', game}))
        waitForMove(game.gameNumber, 'O', dispatch, getState)
        navigate('/playing')
    }
}

export function makeMoveThunk(x: number, y: number): Thunk {
    return async function(dispatch: Dispatch, getState: GetState) {
        const state = getState()
        const {mode, game, player} = state.game
        if (mode === 'playing') {
            const payload = await api.createMove(game.gameNumber, {x, y, player})
            dispatch(gameSlice.actions.makeMove(payload))
        }
    }
}

export async function concedeThunk(dispatch: Dispatch, getState: GetState) {
    const state = getState()
    const {mode, player, game: {gameNumber}} = state.game
    if (mode === 'playing') {
        const game = await api.concede(gameNumber, otherPlayer(player))
        dispatch(gameSlice.actions.setGame({player, game}))
    }
}
