import { makeMove, Move, Player, Game, createGame } from './model'

export type Action = 
    { type: 'make-move', move: Move } 
  | { type: 'reset' }

export function reduce(state: Game, action: Action) {
    switch (action.type) {
        case 'make-move': {
            const {move} = action
            return makeMove(state, move)
        }
        case 'reset':
            return createGame()
        default:
            return state
    }
}
